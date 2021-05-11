import { LitElement, html } from 'https://cdn.skypack.dev/lit-element@2.3.1';
import { parseForm } from "../../utils/form-util";
import request from "../../service/connection-service";
import { store } from "../../state/store/store";
import { actions } from "../../state/reducer/searchEmployee";
class SeachEmployee extends LitElement {
  static get properties() {
  return {
    title: {type: String, attribute: false, reflect: true}
  }
}
  constructor() {
    super();
    store.subscribe(this._refresh)
    
  }

  _handleEmployeeSearch =  () => {
    const firstname = this.shadowRoot.querySelector('input[name=firstname]').value;
    const lastname = this.shadowRoot.querySelector('input[name=lastname]').value;
    if (firstname !== undefined && firstname !== null && firstname !== '' || 
        lastname !== undefined && lastname !== null && lastname !== '' ) {
        let form = this.shadowRoot.querySelector("form");
        let body = parseForm(form);  
         
        request('POST', '/person/search', body)
          .then(r => {
            let results = r;
            store.dispatch(actions.fill(results)) 
            document.dispatchEvent(new CustomEvent('provideResults', { detail: results }))
          })
          .catch(_ => alert(`error: ${_}`));
    } else {
      alert("Vul voornaam en/of achternaam")
    }
  }

  _refresh = async () => {
    history.replaceState(store.getState(), document.title, window.location)
    await this.requestUpdate();
  }

  async _handleSegmentToggle(title, isOpen) {
    if (isOpen) {
      store.dispatch(actions.close({title: title}))
    } else {
      store.dispatch(actions.open({title: title}))
    }
  }

  render() {
    const state = store.getState().searchEmployee;
    const segments = state.segments; //todo move out of component

    return html`
            <form>
              <form-segment 
              .title="${this.title}"
              .show="${segments.zoekMedewerker.open}" 
              @toggle="${_ => this._handleSegmentToggle("zoekMedewerker", segments.zoekMedewerker.open)}">
                <form-item .name="${"firstname"}" .label="${"Voornaam"}" .value="${segments.firstname}"></form-item>
                <form-item .name="${"lastname"}" .label="${"Achternaam"}">Achternaam</form-item>
                <div>
                  <sig-button @keydown="${e => e.key === 'Enter' && this._handleEmployeeSearch()}" @click="${this._handleEmployeeSearch}">Zoek</sig-button>
                </div>
              </form-segment>
            </form>
    `
  }
}

window.customElements.define('search-employee', SeachEmployee)
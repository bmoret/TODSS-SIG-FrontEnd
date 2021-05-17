import { LitElement, html } from 'lit-element';
import { parseForm } from "../../utils/form-util";
import request from "../../service/connection-service";
import { store } from "../../state/store/store";
import { actions } from "../../state/reducer/searchEmployee";
class SeachEmployee extends LitElement {
  static get properties() {
  return {
    title: {type: String, attribute: false, reflect: true},
    results: {type: Array, attribute: false, reflect: true},
  }
}
  constructor() {
    super();
    this.title = "";
    this.results = [];
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

  _search = (e) => {
    request('POST', '/person/search', {name: e.detail})
      .then(r => {
        let results = r;
        store.dispatch(actions.fill(results))
        document.dispatchEvent(new CustomEvent('provideResults', { detail: results }))
      })
      .catch(_ => alert(`Er ging iets mis tijdens medewerkers zoeken`));
  }

  render() {
    const state = store.getState().searchEmployee;
    const segments = state.segments;

    return html`
            <form>
              <page-segment 
              .title="${this.title}"
              .show="${segments.zoekMedewerker.open}" 
              @toggle="${_ => this._handleSegmentToggle("zoekMedewerker", segments.zoekMedewerker.open)}">
                <form-item .name="${"firstname"}" .label="${"Voornaam"}" .value="${segments.firstname}"></form-item>
                <form-item .name="${"lastname"}" .label="${"Achternaam"}">Achternaam</form-item>
                <div>
                  <sig-button @keydown="${e => e.key === 'Enter' && this._handleEmployeeSearch()}" @click="${this._handleEmployeeSearch}">Zoek</sig-button>
                </div>
              </page-segment>
              
              <search-bar .placeholder="${"Medewerker naam..."}" @search="${this._search}"></search-bar>
              <search-results></search-results>
            </form>
    `
  }
}

window.customElements.define('search-employee', SeachEmployee)
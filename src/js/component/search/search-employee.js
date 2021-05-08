import { LitElement, html } from 'https://cdn.skypack.dev/lit-element@2.3.1';
import { parseForm } from "../../utils/form-util";
import request from "../../service/connection-service";
import { store } from "../../state/store/store";
import { actions } from "../../state/reducer/searchEmployee";
class SeachEmployee extends LitElement {
  static get properties() {
    return {
      results: {type: Object, attribute: false, reflect: true},
    }
  }

  constructor() {
    super();
    this.results = {};
    store.subscribe(this._refresh)
  }

  _handleEmployeeSearch =  () => {
    const firstname = this.shadowRoot.querySelector('input[name=firstname]').value;
    const lastname = this.shadowRoot.querySelector('input[name=lastname]').value;
    console.log(`firstname: ${firstname}, lastname: ${lastname}`);
    if (firstname !== undefined && firstname !== null && firstname !== '' || 
        lastname !== undefined && lastname !== null && lastname !== '' ) {
        let form = this.shadowRoot.querySelector("form");
        let body = parseForm(form);
            
          let results = [{
            "id":"1",
            "firstname":"tom",
            "lastname":"dfkjslkg",
            "expertise":"all", 
            "role":"MANAGER",
            "branch":"VIANEN"
          },
          {
            "id":"2",
            "firstname":"elas",
            "lastname":"belas",
            "expertise":"all", 
            "role":"MEDEWERKER",
            "branch":"VIANEN"
          },
          {
            "id":"3",
            "firstname":"jow",
            "lastname":"pow",
            "expertise":"all", 
            "role":"MANAGER",
            "branch":"CLOWNTOWN"
          },
          {
            "id":"4",
            "firstname":"kwal",
            "lastname":"bal",
            "expertise":"all", 
            "role":"MANAGER",
            "branch":"BABABOEEY"
          }];
          
         
        request('POST', '/person/search', body)
          .then(r => {r.forEach(result => results.push(result))})
          .catch(_ => alert(`error: ${_}`));
        store.dispatch(actions.fill(results)) 
        //kan weg loopt nu ook via state
        document.dispatchEvent(new CustomEvent('provideResults', { detail: results }))
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
              .title="${"Medewerkers zoeken"}"
              .show="${segments.zoek.open}" 
              @toggle="${_ => this._handleSegmentToggle("zoek", segments.zoek.open)}">
                <form-item .name="${"firstname"}" .label="${"Voornaam"}"></form-item>
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
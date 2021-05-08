import { LitElement, html } from 'https://cdn.skypack.dev/lit-element@2.3.1';
import {parseForm, isValidForm} from "../../utils/form-util";
import request from "../../service/connection-service";
class SeachEmployee extends LitElement {
  constructor() {
    super();
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
        document.dispatchEvent(new CustomEvent('provideResults', { detail: results }))
    } else {
      alert("Vul voornaam en/of achternaam")
    }
  }

  render() {
    return html`
            <form>
              <form-segment .title="${"Medewerkers zoeken"}">
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
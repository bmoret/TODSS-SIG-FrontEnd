import {LitElement, html, css} from 'lit-element';
import {Router} from "@vaadin/router";
import {parseForm} from "../../utils/form-util";
import {request} from "../../service/connection-service";
import { store } from "../../state/store/store";

const branchTypes = [{name: "Vianen", value: "VIANEN"}, {name: "Best", value: "BEST"}, {
  name: "Groningen",
  value: "GRONINGEN"
},
  {name: "Rotterdam", value: "ROTTERDAM"}, {name: "Amsterdam", value: "AMSTERDAM"},
  {name: "Deventer", value: "DEVENTER"}, {name: "Maastricht", value: "MAASTRICHT"}]

const roleTypes = [{name: "Manager", value: "MANAGER"}, {name: "Employee", value: "EMPLOYEE"},
  {name: "Secretary", value: "SECRETARY"}]

class ModifyEmployeeScreen extends LitElement {
  static get styles() {
    return css`
      centered-layout div {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }
        
      sig-button {
        margin: 15px 10px;
      }

    `;
  }

    static get properties() {
      return {
        results: {type: Array, attribute: false, reflect: true},
        person: {type: Object, attribute: false, reflect: true},
        supervisor: {type: String, attribute: false, reflect: true},
        managers: {type: Object, attribute: false, refelct: true}
      }
    }

  constructor() {
    super();
    this.results = [];
    this.person = {};
    this.supervisor = {};
    this.managers = {};
  }

  _handleCancel = () => {
    window.location.href = "/";
  }
    connectedCallback() {
      super.connectedCallback()
      document.addEventListener('provideResults', this._provideResults);
      this._load()
    }

    _load = () => {
        request('GET', `/person/${this.location.params.id}`)
            .then(r => {
                this.person = r
                if (r.supervisor) {
                    this.results.push({
                        value: r.supervisor.personId,
                        name: r.supervisor.personName.split(", ")[1] + " " + r.supervisor.personName.split(", ")[0]
                    })
                }

            })
            .then(_ => this.loading = false)
            .catch(_ => {
                this.loading = true;
            })

    }

    _handleCancel = () => {
        window.location.href = "/";
    }

  _handleSave = () => {
    let form = this.shadowRoot.querySelector("form");
    let body = parseForm(form);
    console.log(this.location.params.id)

    request('PUT', '/person/' + this.location.params.id, body)
      .then(r => r)
      .then(_ => Router.go('/'))
      .catch(_ => alert("Er was een error tijdens het aanmaken van de sessie!"));
  }

  _selectPerson = (e) => {
    const person = e.detail;
    const supervisorComponent = this.shadowRoot.querySelector("#supervisor");
    supervisorComponent.items = [
      {name: `${person.firstname} ${person.lastname}`, value: person.id},
      {name: 'Geen', value: ""}
    ]
  }

  render() {
    console.log(this.person)
    return html`
        <cim-top-bar></cim-top-bar>
        <centered-layout>
          <h1>Medewerker Aanpassen: ${this.person.firstname+" "+this.person.lastname}</h1>
            <form>
                <page-segment .title="${"Persoonsgegevens"}" >
                    <form-item .name="${"firstname"}" .label="${"Voornaam"}" .value="${this.person.firstname}">Voornaam</form-item>
                    <form-item .name="${"lastname"}" .label="${"Achternaam"}" .value="${this.person.lastname}">Achternaam</form-item>
                    <form-item .name="${"email"}" .label="${"Email"}" .value="${this.person.email}">E-mail</form-item>
                </page-segment>
                <page-segment .title="${"Werkgegevens"}" >
                    <form-item .name="${"expertise"}" .label="${"Expertise"}" .value="${this.person.expertise}">Expertise</form-item>
                    <form-date-picker .name="${"employedSince"}" .label="${"Werkzaam sinds"}" .value="${this.person.employedSince}">Werkzaam sinds</form-date-picker>
                    <form-dropdown-item .name="${"branch"}" .label="${"Filiaal"}" .items="${branchTypes}"
                        .selected="${this.person.branch}">Branch</form-dropdown-item>
                    <form-dropdown-item .name="${"role"}" .label="${"Rol"}"
                                        .items="${ roleTypes}"
                                        .selected="${this.person.role}"
                    >Rol</form-dropdown-item>
                      <form-dropdown-item .items="${this.results}" .selected="${this.person.supervisor? this.person.supervisor.personId : ""}" .name="${"supervisorId"}" .label="${"Supervisor"}"></form-dropdown-item>
                    <search-employee .title="${"Supervisor zoeken"}"></search-employee>
                </page-segment>
            </form>
          <div>
            <sig-button @click="${this._handleCancel}">Annuleren</sig-button>
            <sig-button @click="${this._handleSave}">Opslaan</sig-button>
          </div>
        </centered-layout>
      `
  }
}

window.customElements.define('modify-employee-page', ModifyEmployeeScreen)
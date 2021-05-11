import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';
import {parseForm} from "../../utils/form-util";
import request from "../../service/connection-service";
import {Router} from "@vaadin/router";
import { store } from "../../state/store/store";

const branchTypes = [ {name: "Vianen", value: "VIANEN"}, {name : "Best", value : "BEST"}, {name : "Groningen", value : "GRONINGEN"},
    {name : "Rotterdam", value : "ROTTERDAM"}, {name : "Amsterdam", value : "AMSTERDAM"},
    {name : "Deventer", value : "DEVENTER"}, {name : "Maastricht", value : "MAASTRICHT"} ]

const roleTypes =   [ {name: "Manager", value : "MANAGER"}, {name : "Employee", value : "EMPLOYEE"},
    {name : "Secretary", value : "SECRETARY"} ]

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
      }
    }

    constructor() {
        super();
        this.results = [];
    }

    connectedCallback() {
      super.connectedCallback()
      document.addEventListener('provideResults', this._provideResults);
    }

    _handleCancel = () => {
        window.location.href = "/";
    }

    _handleSave = () => {
        let form = this.shadowRoot.querySelector("form");
        let body = parseForm(form);

        request('PUT', '/person/' + id, body)
            .then(r => r)
            .then(_ => Router.go('/'))
            .catch(_ => alert("Er was een error tijdens het aanmaken van de sessie!"));
    }

    _provideResults = () => {
      const state = store.getState().searchEmployee;
      let results = state.segments.results;
      this.results = [];
      results.forEach(
        element => {        
        this.results.push({ value: element.id, name: element.firstname+" "+element.lastname })
      });
    }

    render() {
        return  html`
        <cim-top-bar></cim-top-bar>
        <centered-layout>
          <h1>Medewerker Aanpassen : [naam medewerker]</h1>
            <form>
                <form-segment .title="${"Persoonsgegevens"}" >
                    <form-item .name="${"firstname"}" .label="${"Voornaam"}">Voornaam</form-item>
                    <form-item .name="${"lastname"}" .label="${"Achternaam"}">Achternaam</form-item>
                    <form-item .name="${"email"}" .label="${"Email"}">E-mail</form-item>
                </form-segment>
                <form-segment .title="${"Werkgegevens"}" >
                    <form-item .name="${"expertise"}" .label="${"Expertise"}">Expertise</form-item>
                    <form-date-picker .name="${"employedSince"}" .label="${"Werkzaam sinds"}">Werkzaam sinds</form-date-picker>
                    <form-dropdown-item .name="${"branch"}" .label="${"Filiaal"}" .items="${branchTypes}"
                    >Branch</form-dropdown-item>
                    <form-dropdown-item .name="${"role"}" .label="${"Rol"}"
                                        .items="${ roleTypes   
                                        }"
                    >Rol</form-dropdown-item>
                    ${this.results.length > 0 ? html`
                      <form-dropdown-item .items="${this.results}" .name="${"supervisorId"}" .label="${"Supervisor"}"></form-dropdown-item>
                    ` : html `
                      <form-dropdown-item .name="${"supervisorId"}" .label="${"Supervisor"}"></form-dropdown-item>           
                    `} 
                    <search-employee .title="${"Supervisor zoeken"}"></search-employee>
                </form-segment>
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
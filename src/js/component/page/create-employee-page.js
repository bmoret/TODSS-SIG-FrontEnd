import { LitElement, html, css } from 'lit-element';
import {Router} from "@vaadin/router";

import {parseForm} from "../../utils/form-util";
import request from "../../service/connection-service";

const branchTypes = [ {name: "Vianen", value: "VIANEN"}, {name : "Best", value : "BEST"}, {name : "Groningen", value : "GRONINGEN"},
    {name : "Rotterdam", value : "ROTTERDAM"}, {name : "Amsterdam", value : "AMSTERDAM"},
    {name : "Deventer", value : "DEVENTER"}, {name : "Maastricht", value : "MAASTRICHT"} ]

const roleTypes =   [ {name: "Manager", value : "MANAGER"}, {name : "Employee", value : "EMPLOYEE"},
    {name : "Secretary", value : "SECRETARY"} ]

class CreateEmployeePage extends LitElement {
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

    constructor() {
        super();
    }

    _handleCancel = () => {
        window.location.href = "/";
    }

    _handleSave = () => {
        let form = this.shadowRoot.querySelector("form");
        let body = parseForm(form);

        request('POST', '/person', body)
            .then(r => r)
            .then(_ => Router.go('/'))
            .catch(_ => alert("Er was een error tijdens het aanmaken van de sessie!"));
    }

    render() {
        return  html`
        <cim-top-bar></cim-top-bar>
        <centered-layout>
          <h1>Medewerker Aanmaken</h1>
            <form>
                <form-segment .title="${"Persoonsgegevens"}" >
                    <form-item .name="${"firstname"}" .label="${"Voornaam"}">Voornaam</form-item>
                    <form-item .name="${"lastname"}" .label="${"Achternaam"}">Achternaam</form-item>
                    <form-item .name="${"email"}" .label="${"Email"}">E-mail</form-item>
                </form-segment>
                <form-segment .title="${"Werkgegevens"}" >
                    <form-item .name="${"expertise"}" .label="${"Expertise"}">Expertise</form-item>
                    <form-date-picker .name="${"employedSince"}" .label="${"Werkzaam sinds"}">Werkzaam sinds</form-date-picker>
                    <form-dropdown-item .name="${"branch"}" .label="${"Filiaal"}"
                        .items="${branchTypes}"
                    >Branch</form-dropdown-item>
                    <form-dropdown-item .name="${"role"}" .label="${"Rol"}"
                        .items="${roleTypes}"
                    >Rol</form-dropdown-item>
                    <form-dropdown-item .name="${"supervisorId"}" .label="${"Supervisor"}"
                    >Supervisor</form-dropdown-item>
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

window.customElements.define('create-employee-page', CreateEmployeePage)
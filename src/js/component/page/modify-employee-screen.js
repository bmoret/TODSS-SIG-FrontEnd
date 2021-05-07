import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';
import {parseForm} from "../../utils/form-data-parser";
import request from "../../service/connection-service";

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

    constructor() {
        super();
    }

    _handleCancel = () => {
        window.location.href = "/";
    }

    _handleSave = () => {
        let form = this.shadowRoot.querySelector("form");
        let formData = parseForm(form);
        new request('PUT', "/person/9", formData).then(r => console.log("yee"))
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
                    <form-dropdown-item .name="${"branch"}" .label="${"Filiaal"}"
                                        .items="${
                                                {"VIANEN": "Vianen", "BEST": "Best", "GRONINGEN": "Groningen", "ROTTERDAM": "Rotterdam",
                                                    "AMSTERDAM": "Amsterdam", "DEVENTER": "Deventer", "MAASTRICHT": "Maastricht"}
                                        }"
                    >Branch</form-dropdown-item>
                    <form-dropdown-item .name="${"role"}" .label="${"Rol"}"
                                        .items="${
                                                {"MANAGER": "Manager", "EMPLOYEE": "Employee", "SECRETARY": "Secretary"}
                                        }"
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

window.customElements.define('modify-employee-page', ModifyEmployeeScreen)
import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';
import {jsonParseForm} from "../../utils/form-data-parser";
import request from "../../service/connection-service";

class CreateEmployeeScreen extends LitElement {
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
        jsonParseForm(form);
        new request('POST', "/person", form).then(r => console.log("yee"))
    }

    render() {
        return  html`
        <cim-top-bar></cim-top-bar>
        <centered-layout>
          <h1>Medewerker Aanmaken</h1>
            <form>
                <form-segment .title="${"Personalia"}" >
            <form-item .name="${"firstName"}" .label="${"Voornaam"}">Voornaam</form-item>
            <form-item .name="${"lastName"}" .label="${"Achternaam"}">Achternaam</form-item>
            <form-item .name="${"email"}" .label="${"Email"}">E-mail</form-item>
            <form-item .name="${"workingSince"}" .label="${"Werkzaam sinds"}">Werkzaam sinds</form-item>
            <form-dropdown-item .name="${"expertise"}" .label="${"Expertise"}"
            .items="${
            {"id1": "expertise1", "id2": "expertise2"}
        }"
            >Expertise</form-dropdown-item>
            <form-dropdown-item .name="${"branch"}" .label="${"Branch"}"
                      .items="${
                              {"id1": "branch1", "id2": "branch2"}
                      }"
              >Branch</form-dropdown-item>
            <form-dropdown-item .name="${"role"}" .label="${"Rol"}"
                      .items="${
                              {"id1": "rol1", "id2": "rol2"}
                      }"
              >Rol</form-dropdown-item>
              <form-dropdown-item .name="${"supervisor"}" .label="${"Supervisor"}"
                      .items="${
                              {"id1": "supervisor1", "id2": "supervisor2"}
                      }"
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

window.customElements.define('create-employee-page', CreateEmployeeScreen)
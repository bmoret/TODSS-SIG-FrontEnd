import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';

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
    }

    _handleSave = () => {
    }

    render() {
        return  html`
        <cim-header></cim-header>
        <centered-layout>
          <h1>Medewerker Aanmaken</h1>
          <form-segment .title="${"Personalia"}" >
            <form-item>Voornaam</form-item>
            <form-item>Achternaam</form-item>
            <form-item>E-mail</form-item>
            <form-item>Werkzaam sinds</form-item>
            <form-dropdown-item
            .items="${
            {"id1": "expertise1", "id2": "expertise2"}
        }"
            >Expertise</form-dropdown-item>
            <form-dropdown-item
                      .items="${
                              {"id1": "branch1", "id2": "branch2"}
                      }"
              >Branch</form-dropdown-item>
            <form-dropdown-item
                      .items="${
                              {"id1": "rol1", "id2": "rol2"}
                      }"
              >Rol</form-dropdown-item>
              <form-dropdown-item
                      .items="${
                              {"id1": "supervisor1", "id2": "supervisor2"}
                      }"
              >Supervisor</form-dropdown-item>
          </form-segment>
          <div>
            <sig-button @click="${this._handleCancel}">Annuleren</sig-button>
            <sig-button @click="${this._handleSave}">Opslaan</sig-button>
          </div>
        </centered-layout>
      `
    }
}

window.customElements.define('create-employee-screen', CreateEmployeeScreen)
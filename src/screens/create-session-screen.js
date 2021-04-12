import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';

class CreateSessionScreen extends LitElement {
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
    }
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
          <h1>Sessie aanmaken</h1>
          <form-segment 
            .title="${"Inhoud"}" 
          >
            <form-item>Onderwerp</form-item>
            <form-item>Omschrijving</form-item>
          </form-segment>
          <form-segment 
            .title="${"Soort"}" 
          >
            <form-item>Type (dropdown, to be implemented)</form-item>
            <form-item>Platform</form-item>
            <form-item>Join Url</form-item>
          </form-segment>
          <form-segment
             .title="${"Tijdsindeling"}" 
          >
            <form-item>Verwachtte duur (Time, to be implemented)</form-item>
          </form-segment>
          <div>
            <sig-button @click="${this._handleCancel}">Annuleren</sig-button>
            <sig-button @click="${this._handleSave}">Opslaan</sig-button>
          </div>
        </centered-layout>
      `
  }
}

window.customElements.define('create-session-screen', CreateSessionScreen)
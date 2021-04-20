import { LitElement, html, css } from 'lit-element';

class CreateSessionPage extends LitElement {
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
      
      h1 {
        margin-top: 0;
      }
    `;
  }

  static get properties() {
    return {
      sessionType: {type: String, attribute: false, reflect: true}
    }
  }

  constructor() {
    super();
    this.sessionType = "PHYSICAL_SESSION_REQUEST";
  }

  _handleCancel = () => {

  }

  _handleSave = () => {

  }

  _handleSessionType = (e) => {
    this.sessionType = e.detail;
  }

  render() {
    return  html`
        <app-root>
          <cim-top-bar slot="header"></cim-top-bar>
          <centered-layout slot="body">
            <h1>Sessie aanmaken</h1>
            <form-segment .title="${"Inhoud"}" >
              <form-item>Onderwerp</form-item>
              <form-item>Omschrijving</form-item>
              <form-dropdown-item
                .items="${ //get api call
                  {"id1": "sig1", "id2": "sig2"} 
                }"
              >Special Interest Group</form-dropdown-item>
              <form-radio-item>Contact persoon</form-radio-item>
            </form-segment>
            <form-segment .title="${"Soort"}" >
            <form-dropdown-item
              .items="${
                {
                  "PHYSICAL_SESSION_REQUEST": "Fysiek", 
                  "ONLINE_SESSION_REQUEST": "Online", 
                  "TEAMS_ONLINE_SESSION_REQUEST": "Teams"
                }
              }"
              @change="${this._handleSessionType}"
              >Type</form-dropdown-item>
              ${this.sessionType === "PHYSICAL_SESSION_REQUEST"?
                html`
                  <form-item>Adres</form-item>
                `:html`
                  <form-item>Platform</form-item>
                  <form-item .editable="${this.sessionType !== "TEAMS_ONLINE_SESSION_REQUEST"}" >Join Url</form-item>
                `
              }
            </form-segment>
            <form-segment .title="${"Tijdsindeling"}">
              <form-time-item>Verwachtte duur</form-time-item>
            </form-segment>
            <div>
              <sig-button @click="${this._handleCancel}">Annuleren</sig-button>
              <sig-button @click="${this._handleSave}">Opslaan</sig-button>
            </div>
            </centered-layout>
          </app-root>
      `
  }
}

window.customElements.define('create-session-page', CreateSessionPage)
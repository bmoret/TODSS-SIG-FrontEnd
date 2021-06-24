import {LitElement, html, css} from 'lit-element';
import {Router} from "@vaadin/router";
import {ADMIN, EMPLOYEE, MANAGER, ORGANISER, SECRETARY} from "../../utils/user-roles";
import {request} from "../../service/connection-service";
import {store} from "../../state/store/store";

class SessionsOverviewPage extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      
      centered-layout  {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
        
      sig-button apply-button {
        margin: 15px 10px;
      }
      
      centered-layout > h1 {
        text-align:center;
      }
      
      main h1 {
        margin-top: 0;
      }
      
      .filter-buttons {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom: 20px;
      }
      
      button {
        padding: 10px;
        margin: 10px;
        font-size: 20px;
        border: 0px;
        border-radius: 4px;
      }
      
      main button[selected=true] {
        background-color: var(--cim-color-button-focused);
        -webkit-box-shadow: var(--cim-shadow-button-default);
             -moz-box-shadow: var(--cim-shadow-button-default);
                  box-shadow: var(--cim-shadow-button-default);
      }
      
      main button:hover {
        cursor: pointer;
        background-color: var(--cim-color-button-focused);
        -webkit-box-shadow: var(--cim-shadow-button-default);
             -moz-box-shadow: var(--cim-shadow-button-default);
                  box-shadow: var(--cim-shadow-button-default);
      }
      
      sig-button {
        margin-left: 10px;
      }
      
      .header { 
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .header > *:nth-child(2) {
         margin-left: auto;
      }
    `;
  }

  static get properties() {
    return {
      loading: {type: Boolean, attribute: false, reflect: true},
      message: {type: String, attribute: false, reflect: true},
      futureSessions: {type: Array, attribute: false, reflect: true},
      pastSessions: {type: Array, attribute: false, reflect: true},
      showPast: {type: Boolean, attribute: false, reflect: true}
    }
  }

  constructor() {
    super();
    this.loading = false;
    document.title = "Sessie"
    this.message = "Loading..."
    this.futureSessions = [];
    this.pastSessions = [];
    this.showPast = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this._load()
  }

  _load = async () => {
    request('GET', `/sessions/future/${this.location.params.id}`)
      .then(r => this.futureSessions = r)
      .then(_ => this.loading = false)
      .catch(_ => {
        this.loading = true;
        this.message = "Error, Kan de sessie niet laden"
      })
    request('GET', `/sessions/history/${this.location.params.id}`)
      .then(r => this.pastSessions = r)
      .then(_ => this.loading = false)
      .catch(_ => {
        this.loading = true;
        this.message = "Error, Kan de sessie niet laden"
      })
  }

  _handleShowPast = () => {
    this.showPast = true;
  }

  _handleHidePast = () => {
    this.showPast = false;
  }

  render() {
    const state = store.getState().user;
    const role = state.role;

    return html`
       <app-root>
          <cim-top-bar slot="header"></cim-top-bar>
          <centered-layout slot="body">
          ${this.loading ? html`<h1 id="load-info">${this.message}</h1>` : html`
            <main>
                <div class="header">
                    <h1>Kennissessies</h1>
                    <sig-button @click="${_ => Router.go(`/person/${this.location.params.id}`)}">Terug</sig-button>
                </div>
                <div class="filter-buttons">
                    <button selected="${this.showPast}" @click="${_ => this._handleShowPast()}">Historisch</button>
                    <button selected="${!this.showPast}" @click="${_ => this._handleHidePast()}">Aankomend</button>
                </div>
                <compacted-sessions 
                  .futureSessions="${this.futureSessions}" 
                  .pastSessions="${this.pastSessions}"
                  .showPast="${this.showPast}"
              ></compacted-sessions>
            </main>
            `}
          </centered-layout>
        </app-root>
      `
  }
}

window.customElements.define('sessions-overview-page', SessionsOverviewPage)
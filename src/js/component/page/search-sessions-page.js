import {LitElement, html, css} from 'lit-element';
import {request} from "../../service/connection-service";

class SearchSessionsPage extends LitElement {
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
      
      main div {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-bottom: 20px;
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
      
      .filter-buttons {
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
      }
      
      @media screen and (min-width: 330) {
        .filter-buttons {
          flex-direction: row;
        }
      }
      
      @media screen and (max-width: 330px) {
        .filter-buttons {
          flex-direction: column;
        }
      }
      
      button {
        padding: 10px;
        margin: 0 10px 10px 10px;
        font-size: 20px;
        border: 0px;
        border-radius: 4px;
      }
      
      main button[selected=true],
      main button:hover {
        background-color: var(--cim-color-button-focused);
        -webkit-box-shadow: var(--cim-shadow-button-default);
             -moz-box-shadow: var(--cim-shadow-button-default);
                  box-shadow: var(--cim-shadow-button-default);
      }
      
      main button:hover {
        cursor: pointer;
      }
    `;
  }

  static get properties() {
    return {
      loading: {type: Boolean, attribute: false, reflect: true},
      loading1: {type: Boolean, attribute: false, reflect: true},
      loading2: {type: Boolean, attribute: false, reflect: true},
      message: {type: String, attribute: false, reflect: true},
      futureSessions: {type: Array, attribute: false, reflect: true},
      pastSessions: {type: Array, attribute: false, reflect: true},
      showPast: {type: Boolean, attribute: false, reflect: true}
    }
  }

  constructor() {
    super();
    this.loading = true;
    this.loading1 = true;
    this.loading2 = true;
    this.message = "Loading..."
    this.futureSessions = [];
    this.pastSessions = [];
    this.showPast = false;
    document.title = "Sessies"
  }

  connectedCallback() {
    super.connectedCallback();
    this._load()
  }

  update(x) {
    super.update(x);
    if (!this.loading1 && !this.loading2) this.loading = false
  }

  _load = async () => {
    request('GET', `/sessions/future`)
      .then(r => {
        this.futureSessions = r
        if (r.length === undefined) this.futureSessions = []
      })
      .then(_ => this.loading1 = false)
    request('GET', `/sessions/history`)
        .then(r => {
          this.pastSessions = r
          if (r.length === undefined) this.pastSessions = []
        } )
        .then(_ => this.loading2 = false)
  }

  _handleShowPast = () => {
    this.showPast = true;
  }

  _handleHidePast = () => {
    this.showPast = false;
  }

  render() {
    return html`
       <app-root>
          <cim-top-bar slot="header"></cim-top-bar>
          <centered-layout slot="body">
          ${this.loading ? html`<h1 id="load-info">${this.message}</h1>` : html`
            <main>
              <div class="header">
                    <h1>Kennissessies</h1>
                    <sig-button @click="${_ => history.back()}">Terug</sig-button>
                </div>
                <div class="filter-buttons">
                    <button selected="${this.showPast}" @click="${_ => this._handleShowPast()}">Historisch</button>
                    <button selected="${!this.showPast}" @click="${_ => this._handleHidePast()}">Aankomend</button>
                </div>
              <compacted-sessions 
                .futureSessions="${this.futureSessions}" 
                .pastSessions="${this.pastSessions}"
                .showPast="${this.showPast}"
                .pastSortType="${1}"></compacted-sessions>
            </main>
            `}
          </centered-layout>
        </app-root>
      `
  }
}

window.customElements.define('search-sessions-page', SearchSessionsPage)
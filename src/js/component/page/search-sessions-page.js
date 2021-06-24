import {LitElement, html, css} from 'lit-element';
import {request} from "../../service/connection-service";
import {store} from "../../state/store/store";

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
    request('GET', `/sessions/future`)
      .then(r => {
        // if (!r || Object.keys(r).length === 0) throw ""
        this.futureSessions = r
      })
      .then(_ => this.loading = false)
      .catch(_ => {
        this.loading = true;
        this.message = "Error, Kan de sessie niet laden"
      })
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
              <h1>Sessies</h1>
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

window.customElements.define('search-sessions-page', SearchSessionsPage)
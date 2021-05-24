import {LitElement, html, css} from 'lit-element';
import {Router} from "@vaadin/router";
import {MANAGER, SECRETARY} from "../../utils/user-roles";
import {request} from "../../service/connection-service";
import {store} from "../../state/store/store";

class ViewSessionPage extends LitElement {
  static get styles() {
    return css`
      centered-layout  {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
        
      sig-button {
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
      }
    `;
  }

  static get properties() {
    return {
      loading: {type: Boolean, attribute: false, reflect: true},
      message: {type: String, attribute: false, reflect: true},
      session: {type: Object, attribute: false, reflect: true},
    }
  }

  constructor() {
    super();
    this.loading = false;
    document.title = "Sessie"
    this.message = "Loading..."
  }

  connectedCallback() {
    super.connectedCallback();
    this._load()
  }

  _load = async () => {
    request('GET', `/sessions/${this.location.params.id}`)
      .then(r => this.session = r)
      .then(_ => this.loading = false)
      .catch(_ => {
        this.loading = true;
        this.message = "Error, Kan de sessie niet laden"
      })
  }

  _handleEdit = () => {
    Router.go(`/session/${this.location.params.id}/edit`)
  }

  _handleRequestPlanning = () => {
    if (confirm("Sessie laten inplannen.\nWeet je het zeker?")) {
      request('PUT', `/sessions/${this.location.params.id}/request`)
        .then(r => {
          this.session = r;
          alert("Plannen aangevraagd");
        })
        .catch(_ => alert("Kon plannen niet aanvragen"));
    }
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
              <h1>Sessie</h1>
              <session-view .session="${this.session}"></session-view>
              ${this.session.state === "TO_BE_PLANNED" && role === SECRETARY?
                html`
                  <page-segment .title="${"Inplannen"}" .show="${true}" >
                      <secretary-session-planner></secretary-session-planner>
                  </page-segment>
                  ` : ''
                }
               <div>
                  <sig-button @click="${() => this._handleEdit()}">Aanpassen</sig-button>
                  ${this.session.state === "DRAFT" && role === MANAGER? 
                  html`<sig-button @click="${() => this._handleRequestPlanning()}">Inplannen aanvragen</sig-button>` :
                  ''
                  }
               </div>
            </main>
            `}
          </centered-layout>
        </app-root>
      `
  }
}

window.customElements.define('view-session-page', ViewSessionPage)
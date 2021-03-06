import {LitElement, html, css} from 'lit-element';
import {request} from "../../service/connection-service";
import {Router} from "@vaadin/router";

class ViewEmployeePage extends LitElement {
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
      employee: {type: Object, attribute: false, reflect: true}
    }
  }

  constructor() {
    super();
    this.loading = true;
    document.title = "Sessie";
    this.message = "Loading...";
    //employee filler weg te halen na fix
    this.employee = {};
  }

  connectedCallback() {
    super.connectedCallback();
    this._load();
  }

  _load = async () => {
    request('GET', `/person/${this.location.params.id}`)
      .then(r => {
        console.log(r)
        if (r.email === undefined) throw "";
        this.employee = r
        this.loading = false;
      })
        .catch(_ => this.message = "Er ging iets mis tijdens het laden.")
  }

  _handleEdit = () => {
    Router.go(`modify-employee/${this.location.params.id}`)
  }

  _handleViewSessions = () => {
    Router.go(`/person/${this.location.params.id}/sessions`)
  }

  render() {
    return html`
       <app-root>
          <cim-top-bar slot="header"></cim-top-bar>
          <centered-layout slot="body">
          ${this.loading ? html`<h1 id="load-info">${this.message}</h1>` : html`
            <main>
              <employee-view .employee="${this.employee}"></employee-view>
               <div>
                 <sig-button @click="${() => this._handleEdit()}">Aanpassen</sig-button>
                 <sig-button @click="${() => this._handleViewSessions()}">Sessies weergeven</sig-button>
               </div>
            </main>
            `}
          </centered-layout>
        </app-root>
      `
  }
}

window.customElements.define('view-employee-page', ViewEmployeePage)
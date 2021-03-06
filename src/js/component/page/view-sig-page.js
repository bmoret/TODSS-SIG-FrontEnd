import {LitElement, html, css} from 'lit-element';
import {request} from "../../service/connection-service";
import {Router} from "@vaadin/router";

class ViewSpecialInterestGroupPage extends LitElement {
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
      specialInterestGroup: {type: Object, attribute: false, reflect: true}
    }
  }

  constructor() {
    super();
    this.loading = true;
    this.employee = {};
    this.specialInterestGroup = "Loading...";
    document.title = "SIG";
  }

  connectedCallback() {
    super.connectedCallback();
    this._load();
  }

  _load = async () => {
    request('GET', `/sig/${this.location.params.id}`)
      .then(r => {
        if (r.id === undefined) throw "";
        if (r)
        this.specialInterestGroup = r
      })
        .then(_ => this.loading = false)
        .catch(_ => this.message = "Er ging iets mis tijdens het laden.")
  }

  _handleEdit = () => {
    Router.go(`modify-sig/${this.location.params.id}`)
  }

  render() {
    return html`
       <app-root>
          <cim-top-bar slot="header"></cim-top-bar>
          <centered-layout slot="body">
          ${this.loading ? html`<h1 id="load-info">${this.message}</h1>` : html`
            <main>
              <h1>Special Interest Group</h1>
              <sig-view .sig="${this.specialInterestGroup}"></sig-view>
               <div>
                <sig-button @click="${() => this._handleEdit()}">Aanpassen</sig-button>
               </div>
            </main>
            `}
          </centered-layout>
        </app-root>
      `
  }
}

window.customElements.define('view-sig-page', ViewSpecialInterestGroupPage)
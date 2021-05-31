import {LitElement, html, css} from 'lit-element';

class SessionAttendancesPage extends LitElement {
  static get styles() {
    return css`
      centered-layout  {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      
      centered-layout > h1 {
        text-align:center;
      }
    `;
  }

  static get properties() {
    return {
      loading: {type: Boolean, attribute: false, reflect: true},
      message: {type: String, attribute: false, reflect: true},
      attendances: {type: Array, attribute: false, reflect: true},
    }
  }

  constructor() {
    super();
    this.loading = false;
    this.attendances = [];
    document.title = "Aanmeldingen"
    this.message = "Loading..."
  }

  connectedCallback() {
    super.connectedCallback();
    this._load()
  }

  _load = async () => {
    // request('GET', `/sessions/${this.location.params.id}/attendances`)
    //   .then(r => this.attendances = r)
    //   .then(_ => this.loading = false)
    //   .catch(_ => {
    //     this.loading = true;
    //     this.message = "Error, Kan de sessie niet laden"
    //   })
  }

  render() {
    return html`
       <app-root>
          <cim-top-bar slot="header"></cim-top-bar>
          <centered-layout slot="body">
          ${this.loading ? html`<h1 id="load-info">${this.message}</h1>` : html`
            <main>
              <h1>Sessie</h1>
              <sessie-attendances .attendees="${this.attendances}"></sessie-attendances>
            </main>
          `}
          </centered-layout>
        </app-root>
      `
  }
}

window.customElements.define('session-attendances-page', SessionAttendancesPage)
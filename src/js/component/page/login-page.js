import {LitElement, html, css} from 'lit-element';
import {Router} from "@vaadin/router/dist/vaadin-router";

class LoginPage extends LitElement {
  static get styles() {
    return css`
      div {
        max-width: 800px;
        margin: auto;
      }
      
      @media screen and (max-width: 1040px) {
        cim-logo-backdrop {
          display: none;
        }
      }
    `;
  }

  static get properties() {
    return {
      redirected: {type: Boolean, attribute: false, reflect: false},
    }
  }

  constructor() {
    super();
    this.redirected = false;
    document.title = "Login"
  }

  connectedCallback() {
    super.connectedCallback();
    const params = new URLSearchParams(window.location.search)
    this.redirected = params.get('redirected') || false;
  }


  _handleLoggedIn = () => {
    this.redirected? history.back() : Router.go("/")
  }

  render() {
    return html`
      <app-root>
        <cim-top-bar slot="header"></cim-top-bar>
        <main slot="body">
           <centered-layout>
              <div>
                <h1>Inloggen</h1>
                <cim-logo-backdrop></cim-logo-backdrop>
                <login-form  @loggedIn="${this._handleLoggedIn}"></login-form>
              </div>
           </centered-layout>
        </main>
      </app-root>
    `
  }
}
window.customElements.define('login-page', LoginPage)
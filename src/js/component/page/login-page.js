import {LitElement, html, css} from 'lit-element';
import {Router} from "@vaadin/router/dist/vaadin-router";

class LoginPage extends LitElement {
  static get styles() {
    return css`
      div {
        max-width: 800px;
        margin: auto;
      }
      
      img {
        position: absolute;
        top: 0;
        right: 0;
        opacity: 0.3;
        height: 60%;
        width: 100%;
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
                <img src="/dist/assets/image/app-logo.svg"">
                <login-form  @loggedIn="${this._handleLoggedIn}"></login-form>
              </div>
           </centered-layout>
        </main>
      </app-root>
    `
  }
}
window.customElements.define('login-page', LoginPage)
import {LitElement, html, css} from 'lit-element';
import {Router} from "@vaadin/router/dist/vaadin-router";

class RegisterPage extends LitElement {
  static get styles() {
    return css`
      div {
        max-width: 800px;
        margin: auto;
      }
    `;
  }

  constructor() {
    super();
    document.title = "Registreren"
  }

  _handleRegistered = () => {
    Router.go("/login")
  }

  render() {
    return html`
      <app-root>
        <cim-top-bar slot="header"></cim-top-bar>
        <main slot="body">
           <centered-layout>
              <div>
                <h1>Account registreren</h1>
                <register-form  @registered="${this._handleRegistered}"></register-form>
              </div>
           </centered-layout>
        </main>
      </app-root>
    `
  }
}
window.customElements.define('register-page', RegisterPage)
import { LitElement, html, css } from 'lit-element';
import {store} from "../../state/store/store";
import { actions } from "../../state/reducer/user";
import {Router} from "@vaadin/router";

class LoginLogout extends LitElement {
  static get properties() {
    return {
      isLoggedIn: {type: Boolean, attribute: false, reflect: false},
    }
  }

  constructor() {
    super();
    this.isLoggedIn = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.isLoggedIn = store.getState().user.isLoggedIn;
  }

  _goToLogin = () => {
    Router.go("/login");
  }

  _logout = () => {
    store.dispatch(actions.logout({}));
    Router.go("/login");
  }

  render() {
    return html`
      ${this.isLoggedIn? html`<sig-button @click="${this._logout}">Uitloggen</sig-button>` 
      : html`<sig-button @click="${this._goToLogin}">Inloggen</sig-button>`}
    `
  }
}

window.customElements.define('login-logout', LoginLogout);
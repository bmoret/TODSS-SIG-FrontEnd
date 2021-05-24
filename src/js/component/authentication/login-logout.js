import { LitElement, html, css } from 'lit-element';
import {store} from "../../state/store/store";
import { actions } from "../../state/reducer/user";
import {Router} from "@vaadin/router";

class LoginLogout extends LitElement {
  static get styles() { return css`
        `
  }


  _goToLogin = () => {
    Router.go("/login");
  }

  _logout = () => {
    store.dispatch(actions.logout({}));
    Router.go("/login");
  }

  render() {
    const state = store.getState().user;

    return html`
      ${state.isLoggedIn? html`<sig-button @click="${this._logout}">Uitloggen</sig-button>` 
      : html`<sig-button @click="${this._goToLogin}">Inloggen</sig-button>`}
    `
  }
}

window.customElements.define('login-logout', LoginLogout);
import { LitElement, html } from 'lit-element';
import request from "../../../service/connection-service";
import { storeAccessToken } from "../../../service/authorization-service";
import {isValidForm, parseForm} from "../../../utils/form-util";
import {actions} from "../../../state/reducer/user";

class LoginForm extends LitElement {
  _handleLogin = () => {
    let form = this.shadowRoot.querySelector("form");
    if (!isValidForm(form)) return;
    request('POST', '/login', parseForm(form))
      .then(r => storeAccessToken(r.getHeader("Authorization")) && r)
      .then(r => this._updateUserState(r.body /* todo: user info uit request halen*/))
      .then(_ => this._emitLoginEvent())
      .catch(_ => alert("Er ging iets fout tijdens het inloggen"));
  }

  _updateUserState = (user) => {
    actions.setState({
      isLoggedIn: true,
      role: user.role,
      username:user.username
    })
  }

  _emitLoginEvent = () => {
    let event = new CustomEvent('loggedIn', { bubbles: true, composed: true });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <form>
        <form-item .name="${"username"}" .label="${"Gebruikersnaam"}"></form-item>
        <form-item .name="${"password"}" .label="${"password"}"></form-item>
        <div>
            <sig-button @keydown="${e => e.key === 'Enter' && this._handleLogin()}" @click="${this._handleLogin}">Inloggen</sig-button>
        </div>
      </form>
    `
  }
}

window.customElements.define('login-form', LoginForm)
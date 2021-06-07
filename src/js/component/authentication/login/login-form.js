import {LitElement, html, css} from 'lit-element';
import {fetchFullRequest} from "../../../service/connection-service";
import { storeAccessToken, storeRefreshToken } from "../../../service/authorization-service";
import {isValidForm, parseForm} from "../../../utils/form-util";
import {actions} from "../../../state/reducer/user";
import {store} from "../../../state/store/store";
import {Router} from "@vaadin/router";

class LoginForm extends LitElement {
  static get styles() { return css`
    .button__container {
      display: flex;
      flex-direction: row-reverse;
    }
    
    sig-button {
      margin:5px
    }
    `
  }

  _handleLogin = () => {
    let form = this.shadowRoot.querySelector("form");
    if (!isValidForm(form)) return;
    fetchFullRequest('POST', '/login', parseForm(form))
      .then(r => {
        storeAccessToken(r.headers.get("Access-Token"));
        storeRefreshToken(r.headers.get("Refresh-Token"));
        this._updateUserState(r)
      })
      .then(_ => this._emitLoginEvent())
      .catch(_ => alert("Er ging iets fout tijdens het inloggen"));
  }

  _updateUserState = (request) => {
    const headers = request.headers
    store.dispatch(actions.setState({
      isLoggedIn: true,
      role: headers.get("User-Role"),
      username: headers.get("User-Username"),
      id: headers.get("User-Id"),
      personId: headers.get("Person-Id")
    }));
  }

  _emitLoginEvent = () => {
    let event = new CustomEvent('loggedIn', { bubbles: true, composed: true });
    this.dispatchEvent(event);
  }

  _handleEnter = (e) => {
    return e.key === 'Enter' && this._handleLogin()
  }

  _goToRegister = () => {
    Router.go("/register")
  }

  render() {
    return html`
      <form>
        <form-item .name="${"username"}" .label="${"Gebruikersnaam"}" @keydown="${e => this._handleEnter(e)}"></form-item>
        <form-item .name="${"password"}" .label="${"password"}" .type="${"password"}" @keydown="${e => this._handleEnter(e)}"></form-item>
        <div class="button__container">
            <sig-button @click="${this._handleLogin}">Inloggen</sig-button>
            <sig-button @click="${this._goToRegister}">Maak een account</sig-button>
        </div>
      </form>
    `
  }
}

window.customElements.define('login-form', LoginForm)
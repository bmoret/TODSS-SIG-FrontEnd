import {LitElement, html, css} from 'lit-element';
import {request} from "../../../service/connection-service";
import {isValidForm, parseForm} from "../../../utils/form-util";
import {Router} from "@vaadin/router";

const branchTypes = [ {name: "Vianen", value: "VIANEN"}, {name : "Best", value : "BEST"}, {name : "Groningen", value : "GRONINGEN"},
  {name : "Rotterdam", value : "ROTTERDAM"}, {name : "Amsterdam", value : "AMSTERDAM"},
  {name : "Deventer", value : "DEVENTER"}, {name : "Maastricht", value : "MAASTRICHT"} ]

const roleTypes =   [ {name: "Manager", value : "MANAGER"}, {name : "Employee", value : "EMPLOYEE"},
  {name : "Secretary", value : "SECRETARY"} ]

class RegisterForm extends LitElement {
  static get styles() {
    return css`
      .button__container {
        display: flex;
        flex-direction: row-reverse;
      }
      
      sig-button {
        margin:5px
      }
    `;
  }

  _handleRegister = () => {
    let form = this.shadowRoot.querySelector("form");
    if (!isValidForm(form)) return;
    request('POST', '/register', parseForm(form))
      .then(_ => this._emitRegisterEvent())
      .catch(_ => alert("Er ging iets fout tijdens het registreren"));
  }

  _emitRegisterEvent = () => {
    let event = new CustomEvent('registered', { bubbles: true, composed: true });
    this.dispatchEvent(event);
  }

  _goToLogin = () => {
    Router.go("/login")
  }

  render() {
    return html`
      <form>
          <page-segment .title="${"Account"}">
            <form-item .name="${"username"}" .label="${"Gebruikersnaam"}"></form-item>
            <form-item .name="${"password"}" .label="${"password"}" .type="${"password"}"></form-item>
          </page-segment>
          <page-segment .title="${"Persoonsgegevens"}" >
              <form-item .name="${"firstname"}" .label="${"Voornaam"}">Voornaam</form-item>
              <form-item .name="${"lastname"}" .label="${"Achternaam"}">Achternaam</form-item>
              <form-item .name="${"email"}" .label="${"Email"}">E-mail</form-item>
          </page-segment>
          <page-segment .title="${"Werkgegevens"}" >
              <form-item .name="${"expertise"}" .label="${"Expertise"}">Expertise</form-item>
              <form-date-picker .name="${"employedSince"}" .label="${"Werkzaam sinds"}">Werkzaam sinds</form-date-picker>
              <form-dropdown-item .name="${"branch"}" .label="${"Filiaal"}"
                  .items="${branchTypes}"
              >Branch</form-dropdown-item>
              <form-dropdown-item .name="${"role"}" .label="${"Rol"}"
                  .items="${roleTypes}"
              >Rol</form-dropdown-item>
              <form-dropdown-item .name="${"supervisorId"}" .label="${"Supervisor"}"
              >Supervisor</form-dropdown-item>
          </page-segment>
          <div class="button__container">
             <sig-button @keydown="${e => e.key === 'Enter' && this._handleLogin()}" @click="${this._handleRegister}">Registreren</sig-button>
             <sig-button @click="${this._goToLogin}">Al een account?</sig-button>
          </div>
      </form>
    `
  }
}

window.customElements.define('register-form', RegisterForm)
import { LitElement, html, css } from 'lit-element';
import {Router} from "@vaadin/router/dist/vaadin-router";
import {store} from "../../state/store/store";

class UserAccountIcon extends LitElement {
  static get styles() { return css`
    button {
      display: block;
      height: calc(var(--cim-top-bar-height) / 1.2);
      width: calc(var(--cim-top-bar-height) / 1.2);
      background-color: transparent;
      outline: none;
      border: none;
      border-radius: 40px;
      cursor: pointer;
      white-space: nowrap;
    }
  
    button:hover,
    button:focus {
      background-color: rgba(0, 0, 0, 0.1);
    }
  
    img {
      height: 60%;
    }
    `
  }
  static get properties() {
    return {
      personId: {type: String, attribute: false, reflect: true},
    }
  }

  constructor() {
    super();
    this.personId = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.personId = store.getState().user.personId;
  }

  _handleClick = () => Router.go("/person/" + this.personId);

  render() {
    const state = store.getState().user;

    return state.isLoggedIn && state.personId !== undefined?  html`
          <button @click="${this._handleClick}">
            <img src="/dist/assets/icon/person-white.svg" alt="account">
          </button>
        `
      :'';
  }
}

window.customElements.define('user-account-icon', UserAccountIcon);
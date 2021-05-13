import { LitElement, html, css } from 'lit-element';
import {Router} from "@vaadin/router";
import {store} from "../../state/store/store";

class PageLinkButtons extends LitElement {
  static get styles() {
    return css`
        :host {
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: stretch;
        }
        
       @media screen and (min-width: 1040px) {
          :host {
            flex-wrap: wrap;
            flex-direction: row;
          }
            
          sig-full-size-button {
            flex-grow: 1;
            width: 33%;
            height: 50%;
          }
         
          sig-full-size-button:first-child:nth-last-child(1),
          sig-full-size-button:first-child:nth-last-child(2),
          sig-full-size-button:first-child:nth-last-child(2) ~ sig-full-size-button,
          sig-full-size-button:first-child:nth-last-child(3),
          sig-full-size-button:first-child:nth-last-child(3) ~ sig-full-size-button {
            height: 100%;
          }
          
          sig-full-size-button:first-child:nth-last-child(4),
          sig-full-size-button:first-child:nth-last-child(4) ~ sig-full-size-button {
            width: 50%;
            height: 50%;
          }
        }
        
       @media screen and (max-width: 1040px) {
          :host {
            flex-direction: column;
          }
          
          sig-full-size-button {
            flex-grow: 1;
            min-height: 20%;
            width: 100%;
            height: 20%;
          }
       }
         
    `
  }

  _handleLink = (link) => {
    Router.go(link)
  }

  render() {
    const state = store.getState().user;
    const role = state.role;
    // rollen ["USER", "ORGANISER", "SECRETARY", "MANAGER"]
    return html`
            ${["ORGANISER", "MANAGER"].includes(role)? html`<sig-full-size-button @click="${_ =>this._handleLink("/create-session")}">Sessie aanmaken</sig-full-size-button>` : ''}
            ${["MANAGER"].includes(role)? html`<sig-full-size-button @click="${_ =>this._handleLink("/create-session")}">Sessie aanmaken</sig-full-size-button>` : ''}
    `
  }
}

window.customElements.define('page-link-buttons', PageLinkButtons);
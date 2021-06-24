import { LitElement, html, css } from 'lit-element';
import {Router} from "@vaadin/router";
import {store} from "../../state/store/store";
import {MANAGER, SECRETARY, ORGANISER, EMPLOYEE, GUEST, ADMIN} from "../../utils/user-roles";

class PageLinkButtons extends LitElement {
  static get styles() {
    return css`
        
        nav {
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: stretch;
        }
        
        p {
          width: 90%;
          text-align: center;
          padding :0;
          margin: auto;
          font-weight: bold;
          color: #404040;
        }
        
        img {
          width: auto;
          height: auto;
        }
        
        sig-full-size-button {
            flex-grow: 1;
        }
        
       @media screen and (min-width: 1040px) {
          nav {
            flex-wrap: wrap;
            flex-direction: row;
          }
          
          p {
            font-size: 3em;
          }
          
          img {
            max-width: 70%;
            max-height: 30%;
          }
            
          sig-full-size-button {
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
          nav {
            flex-direction: column;
          }
          
          p {
            font-size: 3em;
          }
          
          img {
            max-height: 50%;
          }
          
          sig-full-size-button {
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

    return html`
      <nav>
         ${[EMPLOYEE, ORGANISER, SECRETARY, MANAGER, GUEST, ADMIN].includes(role)?
        html`<sig-full-size-button @click="${_ =>this._handleLink("/search-sessions")}">
                  <img src="/dist/assets/icon/search-diploma-cap.svg" alt="" height="30px"/>
                  <p>Sessies</p>
              </sig-full-size-button>` : ''}
        ${[ORGANISER, SECRETARY, MANAGER, ADMIN].includes(role)? 
          html`<sig-full-size-button @click="${_ =>this._handleLink("/create-session")}">
                <img src="/dist/assets/icon/diploma-cap.svg" alt="" height="30px"/>
                <p>Sessie aanmaken</p>
            </sig-full-size-button>` : ''}
        ${[MANAGER, ADMIN].includes(role)?
          html`<sig-full-size-button @click="${_ =>this._handleLink("/create-employee")}">
              <img src="/dist/assets/icon/person.svg" alt="" height="30px"/>
              <p>Medewerker aanmaken</p>
          </sig-full-size-button>` : ''}
         ${[MANAGER, ADMIN].includes(role)?
          html`<sig-full-size-button @click="${_ =>this._handleLink("/search-employee")}">
              <img src="/dist/assets/icon/people.svg" alt="" height="30px"/>
              <p>Medewerkers zoeken</p>
          </sig-full-size-button>` : ''}
        ${[MANAGER, ADMIN].includes(role)?
          html`<sig-full-size-button @click="${_ =>{this._handleLink("/create-special-interest-group")}}">
              <img src="/dist/assets/icon/sig.svg" alt="" height="30px"/>
              <p>Special interest group maken</p>
          </sig-full-size-button>` : ''}
      </nav>
    `
  }
}

window.customElements.define('page-link-buttons', PageLinkButtons);
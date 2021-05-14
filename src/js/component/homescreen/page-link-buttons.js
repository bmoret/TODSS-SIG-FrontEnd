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
        
        p {
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
          :host {
            flex-wrap: wrap;
            flex-direction: row;
          }
          
          p {
            font-size: 3.5em;
            width: 90%;
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
          :host {
            flex-direction: column;
          }
          
          p {
            width: 80%;
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
    const SECRETARY = "SECRETARY",
      ORGANISER = "ORGANISER",
      MANAGER = "MANAGER",
      USER = "USER"
    return html`
            ${[ORGANISER, SECRETARY, MANAGER].includes(role)? 
              html`<sig-full-size-button @click="${_ =>this._handleLink("/create-session")}">
                    <img src="/dist/assets/icon/diploma-cap.svg" alt="" height="30px"/>
                    <p>Sessie aanmaken</p>
                </sig-full-size-button>` : ''}
            ${[MANAGER].includes(role)?
              html`<sig-full-size-button @click="${_ =>this._handleLink("/create-employee")}">
                  <img src="/dist/assets/icon/person.svg" alt="" height="30px"/>
                  <p>Medewerker aanmaken</p>
              </sig-full-size-button>` : ''}
             ${[MANAGER].includes(role)?
              html`<sig-full-size-button @click="${_ =>this._handleLink("/search-employee")}">
                  <img src="/dist/assets/icon/people.svg" alt="" height="30px"/>
                  <p>Medewerkers zoeken</p>
              </sig-full-size-button>` : ''}
                
            ${[USER, ORGANISER, SECRETARY, MANAGER].includes(role)?
              html`<sig-full-size-button @click="${_ =>this._handleLink("/search-sessions")}">
                    <img src="/dist/assets/icon/search-diploma-cap.svg" alt="" height="30px"/>
                    <p>Sessies, meervoud/zoeken (WIP)</p>
                </sig-full-size-button>` : ''}
               
            ${[MANAGER].includes(role)?
              html`<sig-full-size-button @click="${_ =>{/*this._handleLink("/create-session")*/}}">
                      <img src="/dist/assets/icon/statistics.svg" alt="" height="30px"/>
                      <p>Statistics (WIP)</p>
                  </sig-full-size-button>` : ''}
      `
  }
}

window.customElements.define('page-link-buttons', PageLinkButtons);
import { LitElement, html, css } from 'lit-element';
import {Router} from "@vaadin/router";

class TopBar extends LitElement {
    static get styles() {
        return css`
            header {
                display: flex;
                align-items: center;
                padding: 0;
                margin: auto;
                height: var(--cim-top-bar-height);
                width: 100%;
                background-image: var(--cim-color-gradient-header-grey);
                -webkit-box-shadow: var(--cim-shadow-default);
                   -moz-box-shadow: var(--cim-shadow-default);
                        box-shadow: var(--cim-shadow-default);
            }
            
            button {
                position: absolute;
                display: flex;
                flex-direction: row;
                cursor: pointer;
                border: none;
                background: transparent;
                margin: 0 0 0 20px;
                padding: 0;
                height: 80px;
            }
           
            img {
                height: 100%;
            }
            
            button p {
              color: var(--cim-color-primary-dark);  
              font-size: var(--cim-font-size-button);
              vertical-align: middle;
              margin: auto;
            }
            
            div {
                position: absolute;
                display: flex;
                flex direction: row;
                align-items: center;
                right: 20px;
            }
            
            div *:not(first-child) {
                margin-left: 10px;
            }
            
        `;
    }

    _goHome = () => Router.go("/")

    render() {
        return html`
            <header>
                <button aria-label="Terug naar startpagina" @click="${this._goHome}" >
                    <img src="/dist/assets/image/app-logo.svg" alt="cimsolution logo">
                    <p>Home</p>
                </button>
                <div>
                    <user-account-icon></user-account-icon>
                    <login-logout></login-logout>
                </div>
                
            </header>
        `;
    }
}

window.customElements.define('cim-top-bar', TopBar)
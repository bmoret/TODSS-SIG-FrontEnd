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
            
            login-logout {
                position: absolute;
                right: 0;
                margin-right: 20px;
            }
        `;
    }

    constructor() {
        super();
    }

    _goHome = () => {
        console.log("sss")
        Router.go("/")
    }

    render() {
        return html`
            <header>
                <button aria-label="Terug naar startpagina" @click="${this._goHome}" >
                    <img src="/dist/assets/image/app-logo.svg" alt="cimsolution logo">
                </button>
                <login-logout></login-logout>
            </header>
        `;
    }
}

window.customElements.define('cim-top-bar', TopBar)
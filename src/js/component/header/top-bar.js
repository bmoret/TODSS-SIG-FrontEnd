import { LitElement, html, css } from 'lit-element';
import {Router} from "@vaadin/router";

class TopBar extends LitElement {
    static get styles() {
        return css`
            :host {
                width: 100%;
            }
            
            header {
                position: absolute;
                padding: 0;
                margin: auto;
                Height: 80px;
                width: 100%;
                background-image: var(--cim-color-gradient-header-grey);
                -webkit-box-shadow: var(--cim-shadow-default);
                   -moz-box-shadow: var(--cim-shadow-default);
                        box-shadow: var(--cim-shadow-default);
            }
            
            img {
                display: block;
                position: absolute;
                margin-left: 20px;
                left: 0;
                height: 80px;
            }
        `;
    }

    constructor() {
        super();
    }

    _goHome = () => {
        Router.go("/")
    }

    render() {
        return html`
            <header>
                <img src="/dist/assets/image/app-logo.svg" alt="cimsolution logo" @click="${_ => this._goHome()}">
            </header>
        `;
    }
}

window.customElements.define('cim-top-bar', TopBar)
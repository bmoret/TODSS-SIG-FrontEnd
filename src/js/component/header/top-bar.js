import { LitElement, html, css } from 'lit-element';
import {Router} from "@vaadin/router";

class TopBar extends LitElement {
    static get styles() {
        return css`
            header {
                padding: 0;
                margin: auto;
                height: var(--cim-top-bar-height);
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
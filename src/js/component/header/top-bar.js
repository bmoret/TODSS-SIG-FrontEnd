import { LitElement, html, css } from 'lit-element';

class TopBar extends LitElement {
    static get styles() {
        return css`
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

    render() {
        return html`
            <header>
                <img src="/dist/assets/image/app-logo.svg" alt="cimsolution logo">
            </header>
        `;
    }
}

window.customElements.define('cim-top-bar', TopBar)
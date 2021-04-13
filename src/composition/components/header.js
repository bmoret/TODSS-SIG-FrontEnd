import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';

class Header extends LitElement {
    static get styles() {
        return css`
            header {
                position: absolute;
                padding: 0;
                margin: auto;
                Height: 80px;
                width: 100%;
                background-color: var(--cim-color-secondary-dark);
                -webkit-box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
                   -moz-box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
                        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
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
                <img src="../../assets/icons/app-logo.svg" alt="cimsolution logo">
            </header>
        `;
    }
}

window.customElements.define('cim-header', Header)
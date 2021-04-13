import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';

class Header extends LitElement {
    static get styles() {
        return css`
            div {
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
            <div>
                <img src="../assets/image/app-logo.svg" alt="cimsolution logo">
            </div>
        `;
    }
}

window.customElements.define('cim-header', Header)
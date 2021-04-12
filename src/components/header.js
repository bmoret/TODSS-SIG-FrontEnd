import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';

class Header extends LitElement {
    static get styles() {
        return css`
      div {
        padding: 0;
        margin: auto;
        Height: 80px;
        width: 100%;
        background-color: #3f3f3f;
      }
      
        img {
            width: 70px;
            height: 70px;
            position: absolute;
            left: 5px;
            top: 5px;
        }
    `;
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <div>
                <img src="../image/cimsolutions-logo.png" alt="cimsolution logo">
            </div>
        `;
    }
}

window.customElements.define('cim-header', Header)
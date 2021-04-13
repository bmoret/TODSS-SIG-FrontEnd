import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';

class CenteredLayout extends LitElement {
  static get styles() {
    return css`
      div {
        position: relative;
        padding: 0;
        margin: auto;
        box-sizing: border-box;
        width: 100%;
        max-width: 1350px;
        min-width: 250px;
        padding: 100px 15px 0 15px;
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }
}

window.customElements.define('centered-layout', CenteredLayout)
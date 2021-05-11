import { LitElement, html, css } from 'lit-element';

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
        padding: 20px 15px 0 15px;
      }
      
      ::slotted(*) {
        width: 80%;
        margin: auto;
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
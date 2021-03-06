import { LitElement, html, css } from 'lit-element';

class CenteredLayout extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
      }
      
      div {
        position: relative;
        display: block;
        padding: 20px 15px 0 15px;
        margin: auto;
        min-height: calc(100vh - var(--cim-top-bar-height));
        min-width: 250px;
        max-width: 1350px;
        width: 100%;
        overflow: visible;
        box-sizing: border-box;
        -webkit-box-shadow: var(--cim-shadow-background);
           -moz-box-shadow: var(--cim-shadow-background); 
                box-shadow: var(--cim-shadow-background);
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
import { LitElement, html, css } from 'lit-element';

class App extends LitElement {
  static get styles() {
    return css`
      :host {
        width: 100%;
        height: 100%;
        display: block;
        margin: 0;
        padding: 0;
        top: 0;
      }
      slot[name="header"]::slotted(*) {
        z-index: 9;
      }
      slot[name="body"]::slotted(*) {
        z-index: 0;
        height: 100%;
      }
    `;
  }

  render() {
    return html`
        <header>
          <slot name="header"></slot>
        </header>
        <slot name="body"></slot>
      `
  }
}

window.customElements.define('app-root', App);
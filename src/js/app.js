import { LitElement, html, css } from 'lit-element';

class App extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        margin: 0;
        padding: 0;
        top: 0;
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
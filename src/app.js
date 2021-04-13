import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';

class App extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`
        <div>
          <create-session-screen></create-session-screen>
        </div>
      `
  }
}

window.customElements.define('app-root', App);
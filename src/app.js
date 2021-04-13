import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';

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
        <div>
          <main>
            <create-session-screen></create-session-screen>
          </main>
        </div>
      `
  }
}

window.customElements.define('app-root', App);
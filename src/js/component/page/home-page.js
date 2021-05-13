import {LitElement, html, css} from 'lit-element';

class HomePage extends LitElement {
  static get styles() {
    return css`
     main {
        height: calc(100% - var(--cim-top-bar-height));
        width: 100%;
      }
    `;
  }

  constructor() {
    super();
    document.title = "Home"
  }

  render() {
    return html`
        <app-root>
          <cim-top-bar slot="header"></cim-top-bar>
          <main slot="body">
             <page-link-buttons></page-link-buttons>
          </main>
        </app-root>
      `
  }
}
window.customElements.define('home-page', HomePage)
import {LitElement, html, css} from 'lit-element';

class PageNotFoundPage extends LitElement {
  static get styles() {
    return css`
      centered-layout  {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    `;
  }

  render() {
    return html`
      <app-root>
         <cim-top-bar slot="header"></cim-top-bar>
         <centered-layout slot="body">
           <error-box
           .errorCode="${"404"}"
           .message="${"Kan de pagina niet vinden"}"></error-box>
         </centered-layout>
      </app-root>
    `
  }
}

window.customElements.define('page-not-found-page', PageNotFoundPage)
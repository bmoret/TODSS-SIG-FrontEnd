import { LitElement, html, css } from 'lit-element';

class CimLogoBackdrop extends LitElement {
  static get styles() { return css`
    img {
      position: absolute;
      top: 0;
      right: 0;
      opacity: 0.3;
      height: 60%;
      width: 100%;
    }
      `
  }

  render() {
    return html`
          <img src="/dist/assets/image/app-logo.svg"">
        `
  }
}

window.customElements.define('cim-logo-backdrop', CimLogoBackdrop);
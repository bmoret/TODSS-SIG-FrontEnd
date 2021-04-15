import { LitElement, html} from 'https://cdn.skypack.dev/lit-element@2.3.1';
import { outlet } from 'lit-element-router';

class Main extends outlet(LitElement) {
  render() {
    return html`
      <slot></slot>
    `;
  }
}

window.customElements.define('app-router', Main);
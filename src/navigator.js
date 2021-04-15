import { LitElement, html} from 'https://cdn.skypack.dev/lit-element@2.3.1';
import { navigator } from 'lit-element-router';

class Link extends navigator(LitElement) {
  static get properties() {
    return {
      href: { type: String }
    };
  }
  constructor() {
    super();
    this.href = '';
  }
  render() {
    return html`
            <a href='${this.href}' @click='${this.linkClick}'>
                <slot></slot>
            </a>
        `;
  }
  linkClick(event) {
    event.preventDefault();
    this.navigate(this.href);
  }
}

window.customElements.define('app-link', Link);
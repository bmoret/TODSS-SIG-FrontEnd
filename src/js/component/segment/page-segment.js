import { LitElement, html, css } from 'lit-element';

class PageSegment extends LitElement {
  static get styles() {
    return css`
      :host {
        display:block;
        margin-bottom: 10px;
        width: 100%
      } 

      div {
        position: relative;
        display: none;
        padding: 10px;
        overflow: hidden;
        height: min-content;
        max-width: 100%;
      }

      :host([open]) div {
        display: block;
      }
    `;
  }

  static get properties() {
    return {
      show: {type: Boolean, attribute: "open", reflect: true},
      title: {type: String, attribute: false, reflect: true},
      body: {type: Object, attribute: false, reflect: true}
    }
  }

  constructor() {
    super();
    this.show = true;
  }

  _handleToggle = () => {
    this.show = !this.show;
  }

  render() {
    return html`
      <page-segment-header .show="${this.show}" @toggle="${this._handleToggle}">
        ${this.title}
      </page-segment-header>
      <div>
        <slot></slot>
      </div>
    `;
  }
}

window.customElements.define('page-segment', PageSegment)
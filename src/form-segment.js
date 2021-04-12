import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';

class FormSegment extends LitElement {
  static get styles() {
    return css`
      :host {
        display:block;
        margin-bottom: 10px;
      } 

      div {
        display: none;
        padding: 10px;
        overflow: hidden;
      }

      :host([open]) div {
        display: block;
      }
    `;
  }

  static get properties() {
    return {
      show: {type: Boolean, attribute: "open", reflect: true}
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
      <form-segment-header .show="${this.show}" @toggle="${this._handleToggle}">
        <slot name="title"></slot>
      </form-segment-header>
      <div>
        <form-segment-body>
          <slot name="body"></slot>
        </form-segment-body>
      </div>
    `;
  }
}

window.customElements.define('form-segment', FormSegment)
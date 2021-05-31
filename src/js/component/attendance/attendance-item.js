import { LitElement, html, css } from 'lit-element';

class AttendanceItem extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
        width: 100%;
      }
    
      div {
        border-radius: 2px;
        height: 1.5em;
        max-width: 100%;
        margin: 0;
        padding: 10px;vertical-align: middle;
        -webkit-box-shadow: var(--cim-shadow-default);
           -moz-box-shadow: var(--cim-shadow-default);
                box-shadow: var(--cim-shadow-default);
      }
      
      p {
        margin: auto;
      }
    `;
  }

  static get properties() {
    return {
      name: {type: String, attribute: false, reflect: true},
    }
  }

  constructor() {
    super();
    this.name = "";
  }

  render() {
    return html`
      <div>
        <p>${this.name}</p>
      </div>
    `
  }
}

window.customElements.define('attendance-item', AttendanceItem);
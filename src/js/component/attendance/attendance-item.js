import { LitElement, html, css } from 'lit-element';

class AttendanceItem extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
        width: 100%;
        min-width: 250px;
      }
    
      div {
        display: flex;
        flex-direction: row;
        border-radius: 2px;
        max-width: 100%;
        margin: 0;
        padding: 5px;
        vertical-align: middle;
        -webkit-box-shadow: var(--cim-shadow-default);
           -moz-box-shadow: var(--cim-shadow-default);
                box-shadow: var(--cim-shadow-default);
      }
      
      button {
        display: block;
        position: relative;
        height: 2.5em;
        width: 2.5em;
        text-align: center;
        margin-right: 10px;
        border: solid 1px #999999;
        border-radius: 2px;
        padding: 0;
      }
      
      button:hover {
        border: 1px;
      }
      
      button[present=true], .present:hover {
        background-color: #bbffbb;
      }
      
      button[absent=true], .absent:hover {
        background-color: #ffbbbb;
      }
     
      img {
        max-height: 100%;
        box-sizing: border-box;
      }
     
      .cross {
        padding: 6px;
      }
      
      .checkmark {
        padding: 3.5px; 
      }
      
      p {
        margin: auto;
        margin-left: 5px;
      }
    `;
  }

  static get properties() {
    return {
      name: {type: String, attribute: false, reflect: true},
      id: {type: String, attribute: false, reflect: true},
      present: {type: Boolean, attribute: true, reflect: true}
    }
  }

  constructor() {
    super();
    this.name = "";
    this.id = "";
    this.present = false;
  }

  _handleUpdateAttendance = (newVal) => {
    this.present = newVal;
    this.dispatchEvent(new CustomEvent('updateAttendance', {
      bubbles: true,
      composed: true,
      detail: {
        name: this.name,
        id: this.id,
        present: this.present
      }
    }))
  }

  //todo disable button if present/not present

  render() {
    return html`
      <div>
        <p>${this.name}</p>
        <button class="present" present="${this.present}" @click="${_ => this._handleUpdateAttendance(true)}">
          <img class="checkmark" src="/dist/assets/icon/checkmark.svg">
        </button>
        <button class="absent" absent="${!this.present}" @click="${_ => this._handleUpdateAttendance(false)}">
          <img class="cross" src="/dist/assets/icon/cross.svg">
        </button>
      </div>
    `
  }
}

window.customElements.define('attendance-item', AttendanceItem);
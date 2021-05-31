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
        height: 2.5em;
        width: 2.5em;
        text-align: center;
        margin-right: 10px;
        border: solid 1px #999999;
        border-radius: 2px;
        padding: 0;
      }
      
      button[present=true], .present:hover {
        background-color: #bbffbb;
      }
      
      button[absent=true], .absent:hover {
        background-color: #ffbbbb;
      }
     
      .cross {
        padding: 6px;
        height: 1.5em;
      }
      
      .checkmark {
        padding: 3.5px;
        height: 1.8em;
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
      present: {type: Boolean, attribute: true, reflect: true}
    }
  }

  constructor() {
    super();
    this.name = "";
    this.present = false;
  }

  render() {
    console.log(this.present)
    console.log(this.name)
    return html`
      <div>
        <p>${this.name}</p>
        <button class="present" present="${this.present}">
          <img class="checkmark" src="/dist/assets/icon/checkmark.svg">
        </button>
        <button class="absent" absent="${!this.present}">
          <img class="cross" src="/dist/assets/icon/cross.svg">
        </button>
      </div>
    `
  }
}

window.customElements.define('attendance-item', AttendanceItem);
import { html, css } from 'lit-element';
import FormReadable from "../form-readable.js";

class FormDropdownItem extends FormReadable {
  static get styles() {
    return css`
      div{ 
        position: relative;
        display: flex;
        flex-direction: row;
        padding: 10px;
        box-sizing: border-box;
      }
      
      label {
        display: inline-block;
        max-width: 300px;
        margin: 0 10px 10px 0;
      }
      
      select {
        width: 100%;
        padding: 5px;
        margin auto;
        border: 1px solid black;
        border-radius: 2px;
        height: min-content; 
        min-height: 31px;
      }
      
      select:hover,
      select:focus {
        border: var(--cim-outline);
        outline:none !important;
      }
      
      @media screen and (min-width: 1040px) {
        label {
          min-width: 300px;
        }
        select {
          max-width: calc(100% - 300px);
        }
      }
      
      @media screen and (max-width: 1040px) {
        div {
          flex-direction: column;
        }
      }
      `
  }

  static get properties() {
    return {
      items: {type: Array, attribute: false, reflect: true},
    }
  }

  constructor() {
    super();
    this.items = [];
  }

  _handleChange = (e) => {
    e.preventDefault()
    e.stopPropagation()
    let event = new CustomEvent('change', {bubbles: true, composed: true, detail: e.path[0].value});
    this.dispatchEvent(event);
  }

  render() {
    return  html`
      <style>${FormDropdownItem.styles}</style>
      <div> 
        <label for="${this.name}">${this.label}</label>
        <select name="${this.name}" @change="${this._handleChange}">
          ${this.items.map(item => {
            return html`
              <option value="${item.value}">${item.name}</option>
            `;
            })
          }
      this.items.forEach(item => {
            console.log(item)
          return 
        </select>
      </div>
      `
  }
}

window.customElements.define('form-dropdown-item', FormDropdownItem)
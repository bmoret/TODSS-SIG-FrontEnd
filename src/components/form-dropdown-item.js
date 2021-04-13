import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';

class FormDropdownItem extends LitElement {
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
        font-size: 16px;
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
      items: {type: Object, attribute: false, reflect: true},
    }
  }

  constructor() {
    super();
    this.items = [];
  }

  _handleChange = (e) => {
    e.preventDefault()
    e.stopPropagation()
    let event = new CustomEvent('change', { detail: e.path[0].value});
    this.dispatchEvent(event);
  }

  render() {
    return  html`
      <div> 
        <label><slot></slot></label>
        <select
            @change="${this._handleChange}"
        >
          ${Object.keys(this.items).map(key => {
            return html`
              <option value="${key}">${this.items[key]}</option>
            `;
            })  
          }
        </select>
      </div>
      `
  }
}

window.customElements.define('form-dropdown-item', FormDropdownItem)
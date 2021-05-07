import { html, css } from 'lit-element';
import FormReadable from "../form-readable";

class FormItem extends FormReadable {
  static get styles() {
    return css`
      div{ 
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: stretch;
        padding: 10px;
        box-sizing: border-box;
      }
      
      label {
        display: inline-block;
        width: 300px;
        max-width: 300px;
        margin: 0 10px 10px 0;
      }
      
      input {
        width: 100%;
        padding: 5px;
        margin: auto;
        box-sizing: border-box;
        overflow: wrap;
        resize: none;
        border: 1px solid black;
        border-radius: 2px;
        min-height: 31px;
        height: min-content;
        background: var(--cim-color-input-background-default);
      }
      
      input:disabled {
        background: var(--cim-color-input-background-disabled);
      }
      
      @media screen and (min-width: 1040px) {
        label {
          min-width: 300px;
        }
        
        span {
          max-width: calc(100% - 300px);
        }
      }
      
      @media screen and (max-width: 1040px) {
        div {
          flex-direction: column;
        }
        
        input {
          max-width: 100%;
        }
      }
      `
  }

  static get properties() {
    return {
      editable: {type: Boolean, attribute: "editable", reflect: true},
    }
  }

  constructor() {
    super();
    this.editable = true;
  }

  _checkValidity = () => {
    let input = this.querySelector('input');
    if(input.value.length > 0) input.removeAttribute("invalid")
  }

  render() {
    return html`
      <style>${FormItem.styles}</style>
      <div> 
        <label for="${this.name}">${this.label}</label>
        <input name="${this.name}" type="text" ?disabled="${!this.editable}" @input="${this._checkValidity}" required>
      </div>
      `
  }
}

window.customElements.define('form-item', FormItem)
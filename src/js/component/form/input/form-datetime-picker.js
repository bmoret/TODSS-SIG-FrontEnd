import { html, css } from 'lit-element';
import FormReadable from "../form-readable.js";

class FormDateTimePicker extends FormReadable {
  static get styles() {
    return css`
      div{ 
        position: relative;
        display: flex;
        align-items: stretch;
        padding: 10px;
        box-sizing: border-box;
      }
      
      label {
        display: inline-block;
        width: 150px;
        max-width: 150px;
        margin: 10px 10px 10px 0;
        font-weight: bold;
        font-size: 18.72px;
      }
      
      label:first-child {
        text-align: left;
      }
      
      input {
        width: 100%;
        padding: 5px;
        margin: auto;
        border: 1px solid black;
        border-radius: 2px;
        background: var(--cim-color-input-background-default);
        height: 31px;
      }
      
      input:hover,
      input:focus {
        border: var(--cim-outline);
        outline:none !important;
        max-height: 29px;
      }
      
      input:disabled {
        background: var(--cim-color-input-background-disabled);
      }
      
      @media screen and (min-width: 1040px) {
        div {
          flex-direction: row;
        }
        
        label {
          max-width: 150px;
          text-align:center;
        }
      }
      
      @media screen and (max-width: 1040px) {
        div {
          flex-direction: column;
        }
        
        input, label {
          width: 100%;
        }
      }
      `
  }
  static get properties() {
    return {
      secondName: {type: String, attribute: false, reflect: false},
      secondLabel: {type: String, attribute: false, reflect: false},
    }
  }

  constructor() {
    super();
    this.editable = true;
    this.secondName = '';
    this.secondLabel = '';
  }

  render() {
    return  html`
      <style>${FormDateTimePicker.styles}</style>
      <div> 
        <label for="${this.name}">${this.label}</label>
        <input type="datetime-local" name="${this.name}">
        <label for="${this.secondName}">${this.secondLabel}</label>
        <input type="datetime-local" name="${this.secondName}">
      </div>
      `
  }
}

window.customElements.define('form-datetime-picker', FormDateTimePicker)
import { html, css } from 'lit-element';
import FormReadable from "../form-readable.js";

class FormDatePicker extends FormReadable {
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
      
      input:hover,
      input:focus {
        border: var(--cim-outline);
        outline:none !important;
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
        var x = new Date()
        this.value = x.getFullYear().toString()+"-"+(x.getMonth()+1 < 10 ? "0"+ (x.getMonth()+1).toString() : (x.getMonth()+1).toString()) +"-"+x.getDate().toString();
    }

    render() {
        return  html`
      <style>${FormDatePicker.styles}</style>
      <div> 
        <label for="${this.name}">${this.label}</label>
        <input type="date" name="${this.name}" ?disabled="${!this.editable}" value="${this.value}">
      </div>
      `
    }
}

window.customElements.define('form-date-picker', FormDatePicker)
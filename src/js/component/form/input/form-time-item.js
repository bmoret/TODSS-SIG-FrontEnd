import { html, css } from 'lit-element';
import FormReadable from "../form-readable";

class FormTimeItem extends FormReadable {
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
      
      input {
        width: 100%;
        padding: 5px;
        margin auto;
        box-sizing: border-box;
        border: 1px solid black;
        border-radius: 2px;
        min-height: 31px;
        height: min-content;
      }
      
      input:hover,
      input:focus {
        border: var(--cim-outline);
        outline:none !important;
      }
      
      @media screen and (min-width: 1040px) {
        label {
          min-width: 300px;
        }
        
        input {
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

  constructor() {
    super();
  }

  render() {
    return  html`
      <div> 
        <label for="${this.name}">${this.label}</label>
        <input name="${this.name}" min="00:15" type="time" value="01:00">
      </div>
      `
  }
}

window.customElements.define('form-time-item', FormTimeItem)
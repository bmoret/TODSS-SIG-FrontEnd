import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';

class FormItem extends LitElement {
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
        min-width: 300px;
        margin: 0 10px 10px 0;
      }
      
      span {
        width: 100%;
        padding: 5px;
        margin auto;
        box-sizing: border-box;
        background: transparent;
        overflow: wrap;
        resize: none;
        border: 1px solid black;
        border-radius: 2px;
        height: min-content;
      }
      
      @media screen and (min-width: 1040px) {
        span {
          max-width: calc(100% - 300px);
        }
      }
      
      @media screen and (max-width: 1040px) {
        div {
          flex-direction: column;
        }
        
        span {
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
        <label><slot></slot></label>
         <span contenteditable></span>
      </div>
      `
  }
}

window.customElements.define('form-item', FormItem)
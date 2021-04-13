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
        max-width: 300px;
        margin: 0 10px 10px 0;
      }
      
      span {
        width: 100%;
        padding: 5px;
        margin auto;
        box-sizing: border-box;
        overflow: wrap;
        resize: none;
        border: 1px solid black;
        border-radius: 2px;
        min-height: 31px;
        height: min-content;
        background: var(--cim-color-input-background-disabled);
      }
      
      :host([editable]) div span {
        background: var(--cim-color-input-background-default);
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
        
        span {
          max-width: 100%;
        }
      }
      `
  }

  static get properties() {
    return {
      editable: {type: Boolean, attribute: "editable", reflect: true}
    }
  }

  constructor() {
    super();
    this.editable = true;
  }


  render() {
    return  html`
      <div> 
        <label><slot></slot></label>
         <span contenteditable="${this.editable}"></span>
      </div>
      `
  }
}

window.customElements.define('form-item', FormItem)
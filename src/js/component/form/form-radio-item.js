import { LitElement, html, css } from 'lit-element';

class FormRadioItem extends LitElement {

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

    static get properties() {
        return {
            items: {type: Object, attribute: false, reflect: true},
        }
    }

    constructor() {
        super();
        this.items = [];
    }

    render() { //todo all buttons can be selected and name is not shown
        return  html`
       <style>${FormRadioItem.styles}</style>
      <div> 
        <label for="${this.name}">${this.label}</label>
        ${Object.keys(this.items).map(key => {
            return html`        
        <input type="radio" name="${key}" value="${key}">
        <label for ="${key}" >${this.items[key]}</label>
        `;     
        })}
        <input type="radio" name="radioInput" value="">
        <label for = "radioInput">Geen</label>
      </div>
      `
    }

}

window.customElements.define('form-radio-item', FormRadioItem);
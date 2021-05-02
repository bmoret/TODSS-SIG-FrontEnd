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
      
      .divTitle {
        display: inline-block;
        max-width: 300px;
        margin: 0 10px 10px 0;
      }
      
      label {
        display: inline-block;
        max-width: 200px;
        margin: 0 10px 10px 0;
      }
      
      @media screen and (min-width: 1040px) {
         .divTitle{
          min-width: 300px;
        }
      
        label {
          min-width: 200px;
        }
        input {
          max-width: calc(100% - 300px);
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

    render() {
        return  html`
       <style>${FormRadioItem.styles}</style>
      <div> 
        <label class="divTitle" for="${this.name}">${this.label}</label>
        ${this.items.map(item => {
            return html`        
        <input type="radio" name="radioInput" value="${item.id}">
        <label class="radioLabel" for ="radioInput" >${item.firstname + " " + item.lastname}</label>
        `;     
        })}
        <input type="radio" name="radioInput" value="">
        <label class="radioLabel" for = "radioInput">Geen</label>
      </div>
      `
    }

}

window.customElements.define('form-radio-item', FormRadioItem);
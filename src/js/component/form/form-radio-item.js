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

    constructor() {
        super();
    }

    render() {
        return  html`
      <div> 
        <label><slot></slot></label>
        <input type="radio" name="contactPersonRadio">
        <label for = "contactPersonRadio">Richard Lakerveld</label>
        
        <input type="radio" name="contactPersonRadio">
        <label for = "contactPersonRadio">Marc van Bommel</label>
        
                <input type="radio" name="contactPersonRadio" value="">
        <label for = "contactPersonRadio">Geen</label>
      </div>
      `
    }


}
window.customElements.define('form-radio-item', FormRadioItem)
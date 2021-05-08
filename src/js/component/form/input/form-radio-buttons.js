import { LitElement, html, css } from 'lit-element';

class FormRadioButtons extends LitElement {

    static get styles() {
        return css`
      div{ 
        position: relative;
        display: flex;
        flex-direction: row;
        padding: 10px;
        box-sizing: border-box;
      }
      
      #divRadioButtons 
      {
        overflow-x: scroll;

      }
      
      .divTitle {
        display: inline-block;
        max-width: 300px;
        margin: 0 10px 10px 0;
      }
      
      label {
        display: inline-block;
        max-width: 100;
        margin: 0 10px 10px 0;
      }
      
      @media screen and (min-width: 1040px) {
         .divTitle{
          min-width: 300px;
        }
      
        label {
          min-width: 100px;
        }
        
        input {
          max-width: calc(100% - 300px);
        }
        div {
          flex-direction: row;
        }
      }
        @media screen and (max-width: 1040px) {
        #divContainer {
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

    _handleChange(e) {
        let event = new CustomEvent('changeContactPerson', {bubbles: true, composed: true, detail: e});
        console.log("in form-radio-uttonbs")
        console.log(e);
        this.dispatchEvent(event);
    }

    render() {
        return  html`
       <style>${FormRadioButtons.styles}</style>
       
      <div id="divContainer"> 
        <label class="divTitle" for="${this.name}">${this.label}</label>
          <div id="divRadioButtons">
              ${this.items.map(item => {
                  return html`        
            <input @change="${e => this._handleChange(item.id)}" type="radio" name="radioInput" value="${item.id}" >
            <label class="radioLabel" for ="radioInput" >${item.firstname + " " + item.lastname}</label>
            `;
              })}
              <input @change="${e => this._handleChange(null)}" type="radio" name="radioInput" value="">
              <label class="radioLabel" for = "radioInput">Geen</label>
          </div>
      </div>
      `
    }
}

window.customElements.define('form-radio-buttons', FormRadioButtons);
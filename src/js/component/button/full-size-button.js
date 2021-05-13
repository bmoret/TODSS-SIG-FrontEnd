import { LitElement, html, css } from 'lit-element';

class FullSizeButton extends LitElement {
  static get styles() {
    return css`
        :host{ 
          width: 100%;
          height: 100%;
        }
        
        button {
          background-image: var(--cim-color-gradient-light);
          padding: 5px;
          outline: none;
          border: none;
          cursor: pointer;
        }
  
        button:hover,
        button:focus {
          background-color: var(--cim-color-button-focused);
          -webkit-box-shadow: var(--cim-shadow-button-default);
             -moz-box-shadow: var(--cim-shadow-button-default);
                  box-shadow: var(--cim-shadow-button-default);
        }
      
        ::slotted(*) {
            text-align: center;
            margin: auto;
            width: 50%;
        }
        
        slot {
          font-size: var(--cim-fond-size-button);
        }
        
        @media screen and (max-width: 1040px) {
            button {
              width: 100%;
              height: 100%;
            }
           
        }
       
        @media screen and (min-width: 1040px) {
            button {
            width: 100%;
            height: 100%;
            }
        }
    `
  }

  _handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    let event = new CustomEvent('click', { bubbles: true, composed: true });
    this.dispatchEvent(event);
  }

  render() {
    return html`
          <button  @click="${this._handleClick}">
            <slot></slot>
          </button>
        `
  }
}

window.customElements.define('sig-full-size-button', FullSizeButton);
import { LitElement, html, css } from 'lit-element';

class Button extends LitElement {
    static get styles() { return css`
        :host {
          display: block;
        }
        button {
          background-color: var(--cim-color-button);
          padding: 5px;
          width: 100px;
          outline: none;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      
        button:hover,
        button:focus {
            background-color: var(--cim-color-button-focused);
          -webkit-box-shadow: var(--cim-shadow-button-default);
             -moz-box-shadow: var(--cim-shadow-button-default);
                  box-shadow: var(--cim-shadow-button-default);
        }
      
        slot {
          font-size: var(--cim-fond-size-button);
        }
        `
    }

    _handleClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        let event = new CustomEvent('click');
        window.dispatchEvent(event);
    }

    render() {
        return html`
          <button  @click="${this._handleClick}">
            <slot></slot>
          </button>
        `
    }
}

window.customElements.define('sig-button', Button);
import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';

class Button extends LitElement {
    static get styles() { return css`
        :host {
          display: block;
        }
        button {
          font-size: 100%;
          background: #BFF678;
          padding: 5px 0;
          width: 100px;
          outline: none;
          border: 0px;
          border-radius: inherit;
          border-radius: 4px;
          cursor: pointer;
        }
      
        button:hover,
        button:focus {
          -webkit-box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
             -moz-box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
                  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
        }
      
        slot {
          font-size: 20px;
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
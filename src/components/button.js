import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';

class Button extends LitElement {
    static get styles() { return css`
    
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
      -webkit-box-shadow: 0px 0px 6px #000000;
         -moz-box-shadow: 0px 0px 6px #000000;
              box-shadow: 0px 0px 6px #000000;
    }
  
    slot {
      font-size: 20px;
    }
    `
    }

    static get properties() {
        return {
            text: {type: String}
        }
    }

    _handleClick = (e) => {
        console.log("click click motherfucker")
        e.preventDefault()
        e.stopPropagation()
        let event = new CustomEvent('press', { detail: this.text });
        window.dispatchEvent(event);
    }

    render() {
        return html`
      <button  @click="${this._handleClick}">
      ${this.text}</button>
    `
    }
}

window.customElements.define('sig-button', Button);
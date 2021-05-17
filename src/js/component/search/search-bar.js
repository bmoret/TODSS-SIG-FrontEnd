import { LitElement, html, css } from 'lit-element';

class SearchBar extends LitElement {
  static get styles() {
    return css`
      :host {
      }
    
      input {
        width: 100%;
        padding: 5px;
        height: 31px;
        border: 1px solid black;
        border-radius: 2px;
        box-sizing: border-box;
      }
      
      div:focus-within input,
      input:hover,
      button:focus,
      button:hover {
        border: var(--cim-outline);
        outline:none !important;
      }
      
      div {
        position: relative;
        height: 31px;
      }
      
      button {
        position: absolute;
        height: 31px;
        min-width: 40px;
        right: 0;
        top: 0;
        margin: 0;
        padding: 0;
        border: none;
        background: transparent;
      }
      
      
      button:hover,
      button:focus {
        background-image: var(--cim-color-gradient-dark)
       
      }
      
      img {
        margin: auto;
        height: 25px;
        vertical-align: middle;
      }
    `
  }

  static get properties() {
    return {
      placeholder: {type: String, attribute: false, reflect: true}
    }
  }
  constructor() {
    super();
    this.placeholder = "";
  }

  _handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this._search(e);
    }
  }
  _search = (e) => {
    e.preventDefault(e)
    e.stopPropagation(e)
    let event = new CustomEvent('search', { bubbles: true, composed: true });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <div>
        <input type="text"
               aria-label="Zoek invoerveld"
               placeholder="${this.placeholder}"
               @keydown="${this._handleKeyDown}"
        />
        <button @click="${e => this._search(e)}" aria-label="Zoek">
          <img src="/dist/assets/icon/search-glas.svg" alt="">
        </button>
      </div>
    `
  }
}
window.customElements.define('search-bar', SearchBar)
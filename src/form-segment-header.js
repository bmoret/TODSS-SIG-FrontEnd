import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';

class FormSegmentHeader extends LitElement {
    static get styles() {
      return css`
        div {
          position: relative;
          display: block;
          margin: 0;
          padding: 10px;
          width: 100%;
          background-image: linear-gradient(45deg, #BFF679, #9FE247);
          height:30px;
        }
       
        :host([open]) div, 
        div:hover {
          background-image: linear-gradient(45deg, #9FE247, #8DC743);
        }
        
        h2 {
          left: 0;
          margin: auto;
        }

        img {
          position: absolute;
          top: 10px;
          right: 0;
          transition: 0.2s ease-in;
        }

        :host([open]) img {
          transform: rotateX(180deg)
        }
      `
    }

    static get properties() {
      return {
        show: {type: Boolean, attribute: "open", reflect: true}
      }
    }

    constructor() {
      super();
      this.show = true;
    }

    _handleToggle = (e) => {
      this.show = !this.show;
      this._emitChange(e);
    }

    _emitChange(e) {
      e.preventDefault();
      e.stopPropagation();
      let event = new CustomEvent('toggle');
      this.dispatchEvent(event);
    }

    render() {
      return  html`
      <div @click="${this._handleToggle}"> 
        <h2>
          <slot></slot>
        </h2>
        <img src="down-arrow.svg" alt="" height="30px"/><!--Dropdown arrow icon-->
      </div>
      `
    }
}

window.customElements.define('form-segment-header', FormSegmentHeader)
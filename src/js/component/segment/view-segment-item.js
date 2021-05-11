import {html, css, LitElement} from 'lit-element';

class ViewSegmentItem extends LitElement {
  static get styles() {
    return css`
      div{ 
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: stretch;
        padding: 10px;
        box-sizing: border-box;
      }
      
      h3 {
        display: inline-block;
        width: 300px;
        max-width: 300px;
        margin: 0 10px 10px 0;
      }
      
      p {
        width: 100%;
        padding: 5px;
        margin: auto;
        box-sizing: border-box;
        overflow: wrap;
        resize: none;
        min-height: 31px;
        height: min-content;
        background: var(--cim-color-input-background-default);
      }
    
      @media screen and (min-width: 1040px) {
        h3 {
          min-width: 300px;
        }
        
        p {
          max-width: calc(100% - 300px);
        }
      }
      
      @media screen and (max-width: 1040px) {
        div {
          flex-direction: column;
        }
        
        p {
          max-width: 100%;
        }
      }
      `
  }

  static get properties() {
    return {
      name: {type: String, attribute: false, reflect: true},
      value: {type: String, attribute: false, reflect: true},
    }
  }

  constructor() {
    super();
    this.name = "";
    this.value = "";
  }

  render() {
    return html`
      <div> 
        <h3>${this.name}</h3>
        <p>${this.value}</p>
      </div>
      `
  }
}

window.customElements.define('view-segment-item', ViewSegmentItem)
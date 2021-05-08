import {LitElement, html, css} from 'lit-element';

class ErrorBox extends LitElement {
  static get styles() {
    return css`
      div  {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
        
      h1 {
        font-size: 25px;
      }
      
      p {
        font-size: 65px;
        font-weight: bold;
        margin: 20px 0;
      }
    `;
  }

  static get properties() {
    return {
      errorCode: {type: String, attribute: false, reflect: true},
      message: {type: String, attribute: false, reflect: true},
    }
  }

  constructor() {
    super();
    this.errorCode = "";
    this.message = "";
  }

  render() {
    console.log(this.errorCode)
    return html`
       <div>
          <p>${this.errorCode}</p>
          <h1>${this.message}</h1>
       </div>
    `
  }
}

window.customElements.define('error-box', ErrorBox)
import { LitElement, html, css } from 'lit-element';

class SessionCompact extends LitElement {
    static get styles() {
        return css`
      :host {
        display: block;
        position: relative;
        width: 100%;
        min-width: 250px;
      }
    
      div {
        display: flex;
        flex-direction: row;
        flex-flow: wrap;
        border-radius: 2px;
        max-width: 100%;
        margin: 0;
        padding: 5px;
        vertical-align: middle;
        -webkit-box-shadow: var(--cim-shadow-default);
           -moz-box-shadow: var(--cim-shadow-default);
                box-shadow: var(--cim-shadow-default);
      }
      
      button {
        display: block;
        position: relative;
        height: 2.5em;
        width: 2.5em;
        text-align: center;
        margin-right: 10px;
        border: solid 1px #999999;
        border-radius: 2px;
        padding: 0;
      }
      
      button:hover {
        border: 1px;
      }
      
      button[present=true], .present:hover {
        background-color: #bbffbb;
      }
      
      button[absent=true], .absent:hover {
        background-color: #ffbbbb;
      }
     
      img {
        max-height: 100%;
        box-sizing: border-box;
      }
     
      .cross {
        padding: 6px;
      }
      
      .checkmark {
        padding: 3.5px; 
      }
      
      p {
        margin: auto;
        margin-left: 5px;
      }
    `;
    }

    static get properties() {
        return {
            session: {type: Object, attribute: false, reflect: true}
        }
    }

    constructor() {
        super()
        this.session = {};
    }

    render() {
        console.log(this.session.details.subject)
        return html`
            <div>
                <p>${this.session.details.startDate.split("T")[0]}</p>
                <p>${this.session.details.subject}</p>
                <p>${this.session.type}</p>
                <p>${this.session.details.description}</p>
                ${this.session.state === "ENDED" ? html`weergeven hoeveel mensen mee deden` : html``}

            </div>
        `
    }
}

window.customElements.define('session-compact', SessionCompact);
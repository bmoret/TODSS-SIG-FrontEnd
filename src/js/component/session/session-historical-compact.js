import { LitElement, html, css } from 'lit-element';

class SessionCompact extends LitElement {
  static get styles() {
    return css`
      :host {
        min-width: 250px;
      }
    
      div {
        display: grid;
        grid-template-areas: 
          "date  subject  type"
          ".  description  people"; 
        grid-template-columns: 110px auto 200px ;
        border-radius: 2px;
        padding: 5px;
        vertical-align: middle;
        -webkit-box-shadow: var(--cim-shadow-default);
           -moz-box-shadow: var(--cim-shadow-default);
                box-shadow: var(--cim-shadow-default);
      }
      
      grid-date {
        max-width: 120px;
        grid-area: date;
      }
      .grid-subject {grid-area: subject;}
      .grid-type {
        margin-right: 20px;
        justify-self: end;
        grid-area: type;
      }
      .grid-description {grid-area: description;}
      .grid-people {
        margin-right: 20px;
        justify-self: end;
        grid-area: people;
      }
     
      
      p {
        display: inline-block;
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
    return html`
      <div>
        <p class="grid-date">${this.session.details.startDate.split("T")[0]}</p>
        <p class="subject">${this.session.details.subject}</p>
        <p class="grid-type">${this.session.type}</p>
        <p class="grid-description">${this.session.details.description}</p>
        <p class="grid-people">aantal leden</p>
      </div>
    `
  }
}

window.customElements.define('session-historical-compact', SessionCompact);
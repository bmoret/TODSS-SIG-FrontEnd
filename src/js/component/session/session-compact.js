import { LitElement, html, css } from 'lit-element';

class SessionCompact extends LitElement {
    static get styles() {
        return css`
       :host {
        min-width: 250px;
      }
    
      div {
        min-height: 100px;
        display: grid;
        grid-template-areas: 
          "date  subject  type"
          ".  description  person-amount"; 
        grid-template-columns: 110px auto 110px ;
        border-radius: 2px;
        padding: 5px;
        vertical-align: middle;
        -webkit-box-shadow: var(--cim-shadow-default);
           -moz-box-shadow: var(--cim-shadow-default);
                box-shadow: var(--cim-shadow-default);
      }
      
      div:hover {
          background-color: var(--cim-color-button-focused);
          -webkit-box-shadow: var(--cim-shadow-button-default);
             -moz-box-shadow: var(--cim-shadow-button-default);
                  box-shadow: var(--cim-shadow-button-default);
        }
      
      
      .grid-date {
        max-width: 120px;
        grid-area: date;
      }
      .grid-subject {
        font-weight: bold;
        grid-area: subject;
      }
      .grid-type {
        margin-right: 20px;
        justify-self: end;
        grid-area: type;
      }
      .grid-description {grid-area: description;}
      
      .grid-person-amount {
        display: flex;
        margin-right: 20px;
        justify-self: end;
        grid-area: person-amount;
        align-items: center;
      }
      
      .grid-person-amount .tooltip {
        visibility: hidden;
        max-width: 200px;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        right: 10%;
        z-index: 1;
      }
      
      .grid-person-amount:hover .tooltip {
        visibility: visible;
      }
      
      p {
        display: inline-block;
        margin: auto;
        margin-left: 5px;
      }
      
      
      
      img {
        margin-left: 5px;
        height: 15px;
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

    connectedCallback() {
        super.connectedCallback();
        this.tooltip = this.session.attendanceInfo.attendeeAmount
                        +" van de "
                        + this.session.attendanceInfo.reactionAmount
                        +" geintreseerde "
                        + (this.session.state === "ENDED" || this.session.state === "ONGOING" ? "waren aanwezig."
                        : "hebben zich aangemeld");
    }

    render() {
        return html`
            <div>
              <p class="grid-date">${this.session.details.startDate.split("T")[0]}</p>
                <p class="grid-subject">${this.session.details.subject}</p>
                <p class="grid-type">${this.session.type}</p>
                <p class="grid-description">${this.session.details.description}</p>
                <span class="grid-person-amount">
                    <p>${this.session.attendanceInfo.attendeeAmount}/${this.session.attendanceInfo.reactionAmount}</p>
                    <img src="/dist/assets/icon/person.svg">
                    <span class="tooltip">${this.tooltip}</span>
                </span>
            </div>
        `
    }
}

window.customElements.define('session-compact', SessionCompact);
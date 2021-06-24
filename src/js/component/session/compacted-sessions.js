import {LitElement, html, css} from 'lit-element';
import {roundToPercent} from "../../utils/number-utils";
import {request} from "../../service/connection-service";

class CompactedSessions extends LitElement {
    static get styles() {
        return css`
      ul {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        padding: 0;
        justify-content: space-between;
      }
      
      li {
        padding: 5px 0;
        box-sizing: border-box;
        list-style: none;
      }
      
      img {
        width: 70px;
        max-height: 80px;
        margin: 70px 20px 0 0;
      }
      
      p {
        font-weight: bold;
        font-size: 20px
      }
      
      .type__container {
        display: flex;
        flex-direction: row;
      }
    
      .attendances__container {
        width: 100%;
      }
     
      @media screen and (max-width: 1040px) {
       ul {
        flex-direction: column;
       }
       
       li {
        width: 100%;
       }
      }
      
      @media screen and (min-width: 1040px) {
       ul {
        flex-direction: row;
       }
       
       li {
        flex: 1 0 40%;
        max-width: 50%;
       }
       
       li:nth-child(odd) {
        padding-right: 10px;
       }
       }
    `;
    }

    static get properties() {
        return {
            futureSessions: {type: Array, attribute: false, reflect: true},
            pastSessions: {type: Array, attribute: false, reflect: true},
            showPast: {type: Boolean, attribute: false, reflect: true}
        }
    }

    render() {
        return html`
        <div class="attendances__container">
            ${this.showPast ? html`
          <ul>
            ${this.pastSessions.map(session => html`
              <li>
                <session-compact .session="${session}"><session-compact>
              </li>
            `)}
          </ul>`
           : 
            html `<ul>
            ${this.futureSessions.map(session => html`
              <li>
                <session-compact .session="${session}"><session-compact>
              </li>
            `)}
          </ul>`}
        </div>
      
    `
    }
}

window.customElements.define('compacted-sessions', CompactedSessions);
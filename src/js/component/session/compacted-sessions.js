import {LitElement, html, css} from 'lit-element';

class CompactedSessions extends LitElement {
    static get styles() {
        return css`
       ul {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
        text-align: center;
      }
    
      .sessions__container {
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

    constructor() {
        super()
        this.futureSessions = [];
        this.pastSessions = [];
        this.showPast = false;
    }

    render() {
        return html`
        <div class="sessions__container">
            <ul>
                ${this.showPast ? this.pastSessions.length === 0? html `<p class="no__results">Geen sessies gevonden</p>` 
                    : this.pastSessions.map(session => html`
                      <li><session-historical-compact .session="${session}"></session-historical-compact></li>
                    `)
                   : this.futureSessions.length === 0? html `<p class="no__results">Geen sessies gevonden</p>` 
                      : this.futureSessions.map(session => html`
                        <li><session-compact .session="${session}"></session-compact></li>
                      `)
                }
            <ul>
        </div>
    `
    }
}

window.customElements.define('compacted-sessions', CompactedSessions);
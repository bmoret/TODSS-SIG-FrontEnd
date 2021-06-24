import {LitElement, html, css} from 'lit-element';
import {Router} from "@vaadin/router/dist/vaadin-router";

class CompactedSessions extends LitElement {
    static get styles() {
        return css`
       ul {
        display: flex;
        flex-direction: column;
        padding: 0;
        list-style: none;
        justify-content: center;
        align-items: center;
      }
      
      li {
        width: 100%;
        padding: 5px 0;
      }
      
      p {
        font-weight: bold;
        font-size: 20px
        text-align: center;
      }
      
      session-historical-compact,
      session-compact {
        cursor: pointer;
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

    _goToSession = (id) => {
        Router.go("/session/" + id);
    }

    render() {
        return html`
        <div class="sessions__container">
            <ul>
                ${this.showPast ? this.pastSessions.length === 0? html `<p class="no__results">Geen sessies gevonden</p>` 
                    : this.pastSessions.map(session => html`
                      <li>
                          <session-historical-compact 
                          .session="${session}" 
                          @click="${_ => this._goToSession(session.id)}"></session-historical-compact>
                      </li>
                    `)
                   : this.futureSessions.length === 0? html `<p class="no__results">Geen sessies gevonden</p>` 
                      : this.futureSessions.map(session => html`
                        <li>
                        <session-compact 
                            .session="${session}" 
                            @click="${_ => this._goToSession(session.id)}"></session-compact>
                        </li>
                      `)
                }
            <ul>
        </div>
    `
    }
}

window.customElements.define('compacted-sessions', CompactedSessions);
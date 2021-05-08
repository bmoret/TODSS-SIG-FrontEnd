import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';
import {Router} from "@vaadin/router";

class SeachResults extends LitElement {
  static get styles() {
    return css`
        li {
            cursor: pointer;
            padding: 10px;
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        }

        li:hover {background-color: #ddd;}

        h3 {
          margin: 0px;
          margin-bottom: 4px;
        }   
        
        main {
          display: grid;
          grid-template-areas:
            "expertise  role  branch";
          grid-template-columns: 34% auto 33%;          
        }

        p {
          margin: 0;
        }

        p.expertise {
          grid-area: expertise;
        }

        p.role {
          grid-area: role;
        }

        p.branch {
          grid-area: branch;
        }
    `
  }

  static get properties() {
    return {
      employee: {type: Object, attribute: false, reflect: true}
    }
  }

  _handleRow = () => {
    Router.go(`/person/${this.employee.id}`)
  }

  render() {
    return html`
            <li @click="${this._handleRow}">
                <h3>${this.employee.firstname+" "+this.employee.lastname}</h3>
                <main>
                  <p class="exp">Expertise: ${this.employee.expertise}</p>
                  <p class="role">Role: ${this.employee.role}</p>
                  <p class="branch">Branch: ${this.employee.branch}</p>
                </main>
            </li>
    `
  }
}

window.customElements.define('search-result', SeachResults)
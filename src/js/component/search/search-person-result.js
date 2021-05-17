import { LitElement, html, css } from 'lit-element';
import {Router} from "@vaadin/router";

class SearchResult extends LitElement {
  static get styles() {
    return css`
        .container {
            cursor: pointer;
            padding: 10px;
            box-shadow: var(--cim-shadow-default);
        }

        div:hover {background-color: #ddd;}

        .result__name {
          font-weight: bold;
          font-size: 1.5em;
        }   
        
        .result__info {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }
        
        p {
          margin: 0;
        }

        div.result__info p {
          width: 33%;
          margin: auto;
          margin-left: 0;
          text-align: left;
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
      <div class="container" @click="${this._handleRow}">
          <p class="result__name">${this.employee.firstname+" "+this.employee.lastname}</p>
          <div class="result__info">
            <p>Expertise: ${this.employee.expertise}</p>
            <p>Rol: ${this.employee.role}</p>
            <p>Locatie: ${this.employee.branch}</p>
          </div>
      </div>
    `
  }
}

window.customElements.define('search-result', SearchResult)
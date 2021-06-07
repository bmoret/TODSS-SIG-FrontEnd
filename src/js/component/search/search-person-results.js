import { LitElement, html, css } from 'lit-element';

class SearchResults extends LitElement {
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
        
        ul {
           list-style-type: none;
           padding: 0;
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
      results: {type: Array, attribute: false, reflect: true},
    }
  }

  constructor() {
    super();
    this.results = [];
  }

  render() {
    return html`
      <ul>
        ${this.results.map( result => html`
          <li>
            <search-result .employee="${result}"></search-result>
          </li>
        `)}
      </ul>
    `
  }
}

window.customElements.define('search-person-results', SearchResults)
import { LitElement, html, css } from 'lit-element';
import { store } from "../../state/store/store";

class SeachEmployeePage extends LitElement {
  static get styles() {
    return css`
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
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
    document.title = "Medewerkers zoeken";
    this.results = [];
    this._provideResults();
  }

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener('provideResults', this._provideResults);
    document.addEventListener('provideSessie', this._provideResults);
  }

  _provideResults = async () => {
    const state = store.getState().searchEmployee;
    const results = state.segments.results;
    this.results = results;
  }

  render() {

    return html`
      <app-root>
        <cim-top-bar slot="header"></cim-top-bar>
        <centered-layout slot="body">
          <main>
          <search-employee .title="${"Medewerkers zoeken"}"></search-employee>
          <selected-speaker></selected-speaker>
          
          ${this.results.length > 0 ? html`
            <page-segment .title="${"Zoek resultaten"}">
              <ul>
                ${this.results.map(
                  result => html`
                    <search-result
                      .employee="${result}"
                    ></search-result>
                `)}
              </ul>
            ` : html ``}
          </main>
        </centered-layout>
      </app-root>
    `
    
  }
}

window.customElements.define('search-employee-page', SeachEmployeePage)
import {css, html, LitElement} from 'lit-element';
import {store} from "../../state/store/store";

class SearchEmployeePage extends LitElement {
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
    this.results = state.segments.results;
  }

  render() {
    return html`
      <app-root>
        <cim-top-bar slot="header"></cim-top-bar>
        <centered-layout slot="body">
          <main>
          <search-employee .title="${"Medewerkers zoeken"}"></search-employee>
          </main>
        </centered-layout>
      </app-root>
    `
  }
}

window.customElements.define('search-employee-page', SearchEmployeePage)
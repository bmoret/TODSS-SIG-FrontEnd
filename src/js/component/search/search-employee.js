import { LitElement, html } from 'lit-element';
import request from "../../service/connection-service";
import { store } from "../../state/store/store";
import { actions } from "../../state/reducer/searchEmployee";

class SearchEmployee extends LitElement {
  static get properties() {
    return {
      results: {type: Array, attribute: false, reflect: true},
    }
  }
  constructor() {
    super();
    this.results = [];
  }

  _search = (e) => {
    request('POST', '/person/search', {searchTerm: e.detail})
      .then(r => {
        this.results = r;
        store.dispatch(actions.fill(r))
      })
      .catch(_ => alert(`Er ging iets mis tijdens medewerkers zoeken`));
  }

  render() {
    const state = store.getState().searchEmployee;

    return html`
        <search-bar .placeholder="${"Medewerker naam..."}" @search="${this._search}"></search-bar>
        <search-person-results .results="${state.results}"></search-person-results> 
    `
  }
}

window.customElements.define('search-employee', SearchEmployee)
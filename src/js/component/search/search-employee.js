import { LitElement, html } from 'lit-element';
import request from "../../service/connection-service";
import { store } from "../../state/store/store";
import { actions } from "../../state/reducer/searchEmployee";

class SearchEmployee extends LitElement {
  static get properties() {
  return {
    title: {type: String, attribute: false, reflect: true},
    results: {type: Array, attribute: false, reflect: true},
  }
}
  constructor() {
    super();
    this.title = "";
    this.results = [];
    store.subscribe(this._refresh)
  }

  _refresh = async () => {
    history.replaceState(store.getState(), document.title, window.location)
    await this.requestUpdate();
  }

  async _handleSegmentToggle(title, isOpen) {
    if (isOpen) {
      store.dispatch(actions.close({title: title}))
    } else {
      store.dispatch(actions.open({title: title}))
    }
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
    const segments = state.segments;

    return html`
      <page-segment 
      .title="${this.title}"
      .show="${segments.zoekMedewerker.open}" 
      @toggle="${_ => this._handleSegmentToggle("zoekMedewerker", segments.zoekMedewerker.open)}">
        <search-bar .placeholder="${"Medewerker naam..."}" @search="${this._search}"></search-bar>
        <search-person-results .results="${state.results}"></search-person-results>  
      </page-segment>
    `
  }
}

window.customElements.define('search-employee', SearchEmployee)
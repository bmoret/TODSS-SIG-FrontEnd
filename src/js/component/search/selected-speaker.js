import { LitElement, html } from 'lit-element';
import { store } from "../../state/store/store";
import { actions } from "../../state/reducer/searchEmployee";
import {request} from "../../service/connection-service";

class SelectedSpeaker extends LitElement {
  static get properties() {
    return {
      sessions: {type: Array, attribute: false, reflect: true}
    }
  }

  constructor() {
    super();
    store.subscribe(this._refresh)
    this.sessions = {};
    this._load();
    this.selectedSession = "";
    document.addEventListener('provideSessie', (e) => console.log("ewaewa "+e.detail))
  }

  _load = () => {
    request('GET', '/sessions')
      .then(r => {
        let sessions = [];
        //todo: filter op tijd na nu zodat geen oude zichtbaar zijn
        r.forEach(session => sessions.push({ value: session.id, name: session.details.subject +" - "+session.details.description }))
        this.sessions = sessions;
        this.selectedSession = sessions[0].value;
      }).catch(_ => alert(`error: ${_}`));
  }

  _handleSessionSearch =  () => {
    const selectedSession = this.selectedSession;
    const searchSession = this.shadowRoot.querySelector('input[name=searchSession]').value;
    if (searchSession !== undefined && searchSession !== null && searchSession !== '') {
      console.log(`Zoek sessie met id: ${searchSession}`)
      request('GET', `/attendances/${searchSession}/speaker`)
        .then(r => {
          let result = r;
          store.dispatch(actions.fill(result)) 
          document.dispatchEvent(new CustomEvent('provideSessie', { detail: result }))
        })
    } else {
      console.log(`Sessies: ${selectedSession}`)
      request('GET', `/attendances/${selectedSession}/speaker`)
        .then(r => {
          let result = r;  
          store.dispatch(actions.fill(result)) 
          document.dispatchEvent(new CustomEvent('provideSessie', { detail: result }))
      })
      .catch(_ => alert(`error: ${_}`));
    }
  }

  _handleSessionSelection =  (e) => {
    this.selectedSession = e.detail;
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

  render() {
    const state = store.getState().searchEmployee;
    const segments = state.segments; //todo move out of component

    return html`
            <form>
              <page-segment 
              .title="${"Zoek sprekers van sessie"}"
              .show="${segments.zoekSpreker.open}" 
              @toggle="${_ => this._handleSegmentToggle("zoekSpreker", segments.zoekSpreker.open)}">
              
                <form-dropdown-item .items="${this.sessions}" .name="${"sessions"}" .label="${"Sessies"}" @change="${this._handleSessionSelection}"></form-dropdown-item>
                <form-item .name="${"searchSession"}" .label="${"Zoek sessie met id"}"></form-item>
                <div>
                  <sig-button @keydown="${e => e.key === 'Enter' && this._handleSessionSearch()}" @click="${this._handleSessionSearch}">Zoek</sig-button>
                </div>
              </page-segment>
            </form>
    `
  }
}

window.customElements.define('selected-speaker', SelectedSpeaker)
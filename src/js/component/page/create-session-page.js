import { LitElement, html, css } from 'lit-element';

import { parseForm } from "../../utils/form-data-parser";
import { dateToTimestamp } from "../../utils/date-time-parser"
import request from "../../service/connection-service";

import { actions} from "../../state/reducer/createSession.js";
import { store } from "../../state/store/store.js";

const sessionTypes =  {
  "PHYSICAL_SESSION_REQUEST": "Fysiek",
  "ONLINE_SESSION_REQUEST": "Online",
  "TEAMS_ONLINE_SESSION_REQUEST": "Teams"
}

class CreateSessionPage extends LitElement {
  static get styles() {
    return css`
      centered-layout div {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }
        
      sig-button {
        margin: 15px 10px;
      }
      
      h1 {
        margin-top: 0;
      }
    `;
  }

  static get properties() {
    return {
      sigs: {type: Array, attribute: false, reflect: true},
      sessionType: {type: String, attribute: false, reflect: true},
    }
  }

  constructor() {
    super();
    this.sessionType = "PHYSICAL_SESSION_REQUEST";
    this.sigs = this._loadSigs();
    store.subscribe(this._refresh)
  }

  _loadSigs = () => {
    return {"d4fb562d-e468-431b-ab0f-ba0ad16a2631": "sig1", "d4fb562d-e468-431b-ab0f-ba0ad16a2632": "sig2"}
  }

  _refresh = async () => {
    history.replaceState(store.getState(), document.title, window.location)
    await this.requestUpdate();
  }

  _handleCancel = () => {
    window.location.href = "/";
  }

  _handleSave = () => {
    console.log(Date.now());
    //handle save request
    // .then()of .finaly() na saven, redirect, naar homepage of naar session overzicht
    let form = this.shadowRoot.querySelector("form");
    let body = parseForm(form);

    let duration = body.duration.split(':'); // split it at the colons
    let durationInMilliSeconds = (duration[0]*60*60 + duration[1]*60)*1000;
    body.startDate = dateToTimestamp(new Date());
    body.endDate = dateToTimestamp(new Date() + durationInMilliSeconds)
    delete body.duration

    console.log(body)
    request('POST', '/sessions', body )
      .then(r => r);
  }

  _handleSessionType = (e) => {
    this.sessionType = e.detail;
  }

  async _handleSegmentToggle(title, isOpen) {
    if (isOpen) {
      store.dispatch(actions.close({title: title}))
    }else {
      store.dispatch(actions.open({title: title}))
    }
  }

  render() {
    const state = store.getState().createSession;
    const segments = state.segments;

    return  html`
        <app-root>
          <cim-top-bar slot="header"></cim-top-bar>
          <centered-layout slot="body">
            <h1>Sessie aanmaken</h1>
            <form>
              <form-segment 
                .title="${"Inhoud"}" 
                .show="${segments.inhoud.open}" 
                 @toggle="${ _ => this._handleSegmentToggle("inhoud", segments.inhoud.open) }">
                <form-item .name="${"subject"}" .label="${"Onderwerp"}"></form-item>
                <form-item .name="${"description"}" .label="${"Omschrijving"}"></form-item>
                <form-dropdown-item .items="${ this.sigs }" .name="${"sigId"}" .label="${"Special Interest Group"}" ></form-dropdown-item>
              </form-segment>
              <form-segment 
                .title="${"Soort"}" 
                .show="${segments.soort.open}" 
                @toggle="${ _ => this._handleSegmentToggle("soort", segments.soort.open) }">
                <form-dropdown-item .items="${ sessionTypes }" .name="${"@type"}" .label="${"Sessie type"}" @change="${this._handleSessionType}"></form-dropdown-item>
                ${this.sessionType === "PHYSICAL_SESSION_REQUEST"
                  ? html`<form-item .name="${"address"}" .label="${"Adres"}"></form-item>`
                  : html`
                    <form-item .name="${"platform"}" .label="${"Platform"}">Platform</form-item>
                    <form-item .name="${"sessionType"}" .label="${"Join link"}" .editable="${this.sessionType !== "TEAMS_ONLINE_SESSION_REQUEST"}"></form-item>
                  `}
              </form-segment>
              <form-segment 
                .title="${"Tijdsindeling"}" 
                .show="${segments.tijdsindeling.open}" 
                @toggle="${ _ => this._handleSegmentToggle("tijdsindeling", segments.tijdsindeling.open) }">
                <form-time-item .name="${"duration"}" .label="${"Duratie"}"></form-time-item>
              </form-segment>
              <div>
                <sig-button @click="${() => this._handleCancel()}">Annuleren</sig-button>
                <sig-button @click="${() => this._handleSave()}">Opslaan</sig-button>
              </div>
            </form>
          </centered-layout>
        </app-root>
      `
  }
}

window.customElements.define('create-session-page', CreateSessionPage)
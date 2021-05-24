import {LitElement, html, css} from 'lit-element';
import {Router} from '@vaadin/router';

import {parseForm, isValidForm} from "../../utils/form-util";
import {dateToTimestamp, timeSeparatedByColonToMilliseconds} from "../../utils/date-time-util"
import {request} from "../../service/connection-service";

import {actions} from "../../state/reducer/createSession.js";
import {store} from "../../state/store/store.js";

const sessionTypes = [
  { value: "PHYSICAL_SESSION_REQUEST", name: "Fysiek"},
  { value: "ONLINE_SESSION_REQUEST", name: "Online"},
  { value: "TEAMS_ONLINE_SESSION_REQUEST", name: "Teams"},
]

class CreateSessionPage extends LitElement {
  static get styles() {
    return css`
      centered-layout  {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
        
      sig-button {
        margin: 15px 10px;
      }
      
      centered-layout > h1 {
        text-align:center;
      }
      
      main h1 {
        margin-top: 0;
      }
      
      form div {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }
      
     
      *[invalid]{
          box-shadow: var(--cim-shadow-invalid-input);
      }
    `;
  }

  static get properties() {
    return {
      loading: {type: Boolean, attribute: false, reflect: true},
      sigs: {type: Array, attribute: false, reflect: true},
      sessionType: {type: String, attribute: false, reflect: true},
      sigPeople: {type: Array, attribute: false, reflect: true},
      contactPerson: {type: String, attribute: false, reflect: true},
    }
  }

  constructor() {
    super();
    this.loading = true;
    this.sessionType = sessionTypes[0];
    this.sigs = [];
    this.contactPerson = null;
    document.title = "Sessie aanmaken"
    store.subscribe(this._refresh)
    this._load()
  }

  connectedCallback() {
    super.connectedCallback();

    window.addEventListener( 'changeContactPerson', (e) => this._handleContactPerson(e));
  }

  _refresh = async () => {
    history.replaceState(store.getState(), document.title, window.location)
    await this.requestUpdate();
  }

  _load = () => {
    request('GET', '/sig')
      .then(r => {
        let sigs = [];
        r.forEach(sig => sigs.push({ value: sig.id, name: sig.subject }))
        this.sigs = sigs;
      })
      .then (_ => this.sigs[0]? this._handleLoadAssociatedPeople({detail : this.sigs[0].value}) :'')
      .then(_ => this.loading = false)
      .catch(_ => {
        this.loading = true;
        this.shadowRoot.getElementById("load-info").innerText = "Error, Kan iets niet laden"
      })
  }

  _handleLoadAssociatedPeople = (e) => {
    let requestLink = "/sig/" + e.detail + "/people";
    request('GET', requestLink).then(result =>
        this.sigPeople = result);
  };

  _handleContactPerson = (e) => {
    this.contactPerson = e.detail;
  }

  _handleCancel = () => {
    history.back();
  }

  _handleSave = () => {
    let form = this.shadowRoot.querySelector("form");
    if (!isValidForm(form)) return;
    let body = parseForm(form);
    let durationInMilliSeconds = timeSeparatedByColonToMilliseconds(body.duration)
    body.startDate = dateToTimestamp(new Date());
    body.endDate = dateToTimestamp(new Date() + durationInMilliSeconds)
    body.contactPerson = this.contactPerson;
    delete body.duration

    request('POST', '/sessions', body)
      .then(r => r)
      .then(_ => Router.go('/'))
      .catch(_ => alert("Er was een error tijdens het aanmaken van de sessie!"));
  }

  _handleSessionType = (e) => {
    this.sessionType = e.detail;
  }

  async _handleSegmentToggle(title, isOpen) {
    if (isOpen) {
      store.dispatch(actions.close({title: title}))
    } else {
      store.dispatch(actions.open({title: title}))
    }
  }

  render() {
    const state = store.getState().createSession;
    const segments = state.segments;

    return html`
        <app-root>
          <cim-top-bar slot="header"></cim-top-bar>
          <centered-layout slot="body">
          ${this.loading ? html`<h1 id="load-info">Loading...</h1>` : html`
            <main>
              <h1>Sessie aanmaken</h1>
              <form>
                <page-segment 
                  .title="${"Inhoud"}" 
                  .show="${segments.inhoud.open}" 
                   @toggle="${_ => this._handleSegmentToggle("inhoud", segments.inhoud.open)}">
                  <form-item .name="${"subject"}" .label="${"Onderwerp"}"></form-item>
                  <form-item .name="${"description"}" .label="${"Omschrijving"}"></form-item>
                  <form-dropdown-item .items="${this.sigs}" .name="${"sigId"}" .label="${"Special Interest Group"}" ></form-dropdown-item>
                  <form-radio-buttons @change="${e => this._handleContactPerson(e)}" .items="${this.sigPeople}"
                                        .name="${"contactPerson"}" .label="${"Contact persoon"}"></form-radio-buttons>
                </page-segment>
                <page-segment 
                  .title="${"Soort"}" 
                  .show="${segments.soort.open}" 
                  @toggle="${_ => this._handleSegmentToggle("soort", segments.soort.open)}">
                  <form-dropdown-item .items="${sessionTypes}" .name="${"@type"}" .label="${"Sessie type"}" @change="${this._handleSessionType}"></form-dropdown-item>
                ${this.sessionType === "ONLINE_SESSION_REQUEST" || this.sessionType === "TEAMS_ONLINE_SESSION_REQUEST"
                  ? html`
                    <form-item .name="${"platform"}" .label="${"Platform"}" .editable="${this.sessionType !== "TEAMS_ONLINE_SESSION_REQUEST"}"></form-item>
                    <form-item .name="${"joinUrl"}" .label="${"Join link"}" .editable="${this.sessionType !== "TEAMS_ONLINE_SESSION_REQUEST"}"></form-item>
                  `: html`<form-item .name="${"address"}" .label="${"Adres"}"></form-item>`
                } 
                </page-segment>
                <page-segment 
                  .title="${"Tijdsindeling"}" 
                  .show="${segments.tijdsindeling.open}" 
                  @toggle="${_ => this._handleSegmentToggle("tijdsindeling", segments.tijdsindeling.open)}">
                  <form-time-item .name="${"duration"}" .label="${"Verwachtte duur"}"></form-time-item>
                </page-segment>
                <div>
                  <sig-button @click="${() => this._handleCancel()}">Annuleren</sig-button>
                  <sig-button @click="${() => this._handleSave()}">Opslaan</sig-button>
                </div>
              </form>
             </main>
            `}
          </centered-layout>
        </app-root>
      `
  }
}

window.customElements.define('create-session-page', CreateSessionPage)
import {LitElement, html, css} from 'lit-element';
import {Router} from '@vaadin/router';

import {parseForm, isValidForm} from "../../utils/form-util";
import {
  datesToDuration,
  dateToTimeSeparatedByColumn,
  dateToTimestamp,
  timeSeparatedByColonToMilliseconds
} from "../../utils/date-time-util"
import {request} from "../../service/connection-service";

import {actions} from "../../state/reducer/createSession.js";
import {store} from "../../state/store/store.js";

const sessionTypes = [
  { value: "PHYSICAL_SESSION_REQUEST", name: "Fysiek"},
  { value: "ONLINE_SESSION_REQUEST", name: "Online"},
  { value: "TEAMS_ONLINE_SESSION_REQUEST", name: "Teams"},
]

class ModifySessionPage extends LitElement {
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
      message: {type: String, attribute: false, reflect: true},
      session: {type: Object, attribute: false, reflect: true},
    }
  }

  constructor() {
    super();
    this.loading = true;
    this.sessionType = sessionTypes[0].value;
    this.sigs = [];
    this.contactPerson = null;
    document.title = "Sessie aanmaken"
    store.subscribe(this._refresh)
  }

  connectedCallback() {
    super.connectedCallback();
    this._load()
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
        console.log("test")
        this.loading = true;
        this.shadowRoot.getElementById("load-info").innerText = "Error, Kan iets niet laden"
      })
    request('GET', `/sessions/${this.location.params.id}`)
        .then(r => {
          this.session = r
          this.contactPerson = this.session.contactPerson.personId
          if (this.session.type === "ONLINE") {
            this.sessionType = sessionTypes[1].value
          }
        })
        .then(_ => this.loading = false)
        .catch(_ => {
          console.log("test")
          this.loading = true;
          this.message = "Error, Kan de sessie niet laden"
        })
  }

  _handleLoadAssociatedPeople = (e) => {
    let requestLink = "/sig/" + e.detail + "/people";
    request('GET', requestLink).then(result =>
        this.sigPeople = result);
  };

  _handleSessionType = (e) => this.sessionType = e.detail;

  _getSessionDuration = () => dateToTimeSeparatedByColumn(datesToDuration(this.session.details.startDate, this.session.details.endDate))

  _handleContactPerson = (e) => this.contactPerson = e.detail;

  _handleCancel = () => history.back();

  _handleSave = () => {
    let form = this.shadowRoot.querySelector("form");
    if (!isValidForm(form)) return;
    let body = parseForm(form);
    if (body.duration){
      let durationInMilliSeconds = timeSeparatedByColonToMilliseconds(body.duration)
      body.startDate = dateToTimestamp(new Date());
      body.endDate = dateToTimestamp(Date.now() + durationInMilliSeconds);
    } else {
      body.startDate = this.session.details.startDate;
      body.endDate = this.session.details.endDate;
    }
    delete body.duration
    body.contactPerson = this.contactPerson;
    delete body.duration

    request('PUT', '/sessions/'+this.session.id, body)
      .then(r => r)
      .then(_ => Router.go('/session/' + this.session.id))
      .catch(_ => alert("Er was een error tijdens het aanmaken van de sessie!"));
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
    // const duration =  this._getSessionDuration();

    return html`
        <app-root>
          <cim-top-bar slot="header"></cim-top-bar>
          <centered-layout slot="body">
          ${this.loading ? html`<h1 id="load-info">${this.message}</h1>` : html`
            <main>
              <h1>Sessie ${this.session.details.subject} aanpassen</h1>
              <form>
                <page-segment 
                  .title="${"Inhoud"}" 
                  .show="${segments.inhoud.open}"
                   @toggle="${_ => this._handleSegmentToggle("inhoud", segments.inhoud.open)}">
                  <form-item .name="${"subject"}" .label="${"Onderwerp"}" .value="${this.session.details.subject}"></form-item>
                  <form-item .name="${"description"}" .label="${"Omschrijving"}" .value="${this.session.details.description}"></form-item>
                  <form-dropdown-item .items="${this.sigs}" .name="${"sigId"}" .label="${"Special Interest Group"}" .selected="${this.session.specialInterestGroup.id}"></form-dropdown-item>
                  <form-radio-buttons @change="${e => this._handleContactPerson(e)}" .items="${this.sigPeople}"
                                        .name="${"contactPerson"}" .label="${"Contact persoon"}" .selected="${this.session.contactPerson !== undefined? this.session.contactPerson.personId : ""}"></form-radio-buttons>
                </page-segment>
                <page-segment 
                  .title="${"Soort"}" 
                  .show="${segments.soort.open}" 
                  @toggle="${_ => this._handleSegmentToggle("soort", segments.soort.open)}">
                  <form-dropdown-item .items="${sessionTypes}" .name="${"@type"}" .label="${"Sessie type"}" @change="${this._handleSessionType}" .selected="${this.sessionType}"></form-dropdown-item>
                ${this.sessionType === "ONLINE_SESSION_REQUEST" || this.sessionType === "TEAMS_ONLINE_SESSION_REQUEST"
                  ? html`
                    <form-item .name="${"platform"}" .label="${"Platform"}" .value="${this.session.platform}">Platform</form-item>
                    <form-item .name="${"joinUrl"}" .label="${"Join link"}" .editable="${this.sessionType !== "TEAMS_ONLINE_SESSION_REQUEST"}"
                    value="${this.sessionType === "TEAMS_ONLINE_SESSION_REQUEST"? "TEAMS" : ''}" .value="${this.session.joinUrl}"></form-item>
                  `: html`<form-item .name="${"address"}" .label="${"Adres"}" .value="${this.session.address}"></form-item>`
                } 
                </page-segment>
                ${["DRAFT", "TO_BE_PLANNED"].includes(this.session.state)?
                  html`<page-segment 
                    .title="${"Tijdsindeling"}" 
                    .show="${segments.tijdsindeling.open}" 
                    @toggle="${_ => this._handleSegmentToggle("tijdsindeling", segments.tijdsindeling.open)}">
                    <form-time-item .name="${"duration"}" .label="${"Duratie"}" .value="${this._getSessionDuration()}"></form-time-item>
                  </page-segment>` : ''
                }
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

window.customElements.define('modify-session-page', ModifySessionPage)
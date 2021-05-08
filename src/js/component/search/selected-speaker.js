import { LitElement, html } from 'https://cdn.skypack.dev/lit-element@2.3.1';
import {parseForm, isValidForm} from "../../utils/form-util";
import request from "../../service/connection-service";
class SelectedSpeaker extends LitElement {
  constructor() {
    super();
    this.sessions = [];
    this._load();
    this.selectedSession= this.sessions[0];
  }

  _load = async () => { 
    let sessions = [];
    let obj1 = {}
    obj1["value"] = "1"
    obj1["name"] = "titol - omschrevonong"
    sessions.push(obj1)
    let obj2 = {}
    obj2["value"] = "2"
    obj2["name"] = "ham - Ham"
    sessions.push(obj2)
    let obj3 = {}
    obj3["value"] = "3"
    obj3["name"] = "ham - Kaas"
    sessions.push(obj3)
    this.sessions = sessions;
    let obj4 = {}
    obj4["value"] = "4"
    obj4["name"] = "hackermon - eating broodje kaas met pinda"
    sessions.push(obj4)
    this.sessions = sessions;

    return request('GET', `/sessions`)
      .then(r => {
        let sessions = [];
        r.forEach(session => {
          if(session.date === "na vandaag") {
            let obj = {}
            obj["id"] = session.id
            obj["onderwerp"] = `${session.subject} - ${session.description}`;
            session.push(obj)
          }
        })
        this.session = sessions
      })
  }

  _handleSessionSearch =  () => {
    const selectedSession = this.session;
    const searchSession = this.shadowRoot.querySelector('input[name=searchSession]').value;
    let result = [];
    if (searchSession !== undefined && searchSession !== null && searchSession !== '') {
      console.log(`Zoek sessie met id: ${searchSession}`)
      request('GET', `/attendance/${searchSession}`)
        .then(r => result = r, + console.log("hoi")) //r. sprekers
      document.dispatchEvent(new CustomEvent('provideSessie', { detail: result }))
    } else {
      console.log(`Sessies: ${selectedSession}`)
      request('GET', `/attendance/${selectedSession}`)
        .then(r => result = r, + console.log("hoi")) //r. sprekers
      document.dispatchEvent(new CustomEvent('provideSessie', { detail: result}))
    }
  }

  _handleSessionSelection =  (e) => {
    this.session = e.detail;
  }

  render() {
    return html`
            <form>
              <form-segment .title="${"Zoek sprekers van sessie"}">
                <form-dropdown-item .items="${this.sessions}" .name="${"sessions"}" .label="${"Sessies"}" @change="${this._handleSessionSelection}"></form-dropdown-item>
                <form-item .name="${"searchSession"}" .label="${"Zoek sessie met id"}"></form-item>
                <div>
                  <sig-button @keydown="${e => e.key === 'Enter' && this._handleSessionSearch()}" @click="${this._handleSessionSearch}">Zoek</sig-button>
                </div>
              </form-segment>
            </form>
    `
  }
}

window.customElements.define('selected-speaker', SelectedSpeaker)
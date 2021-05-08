// import {LitElement, html, css} from 'lit-element';
// import {Router} from '@vaadin/router';
//
// import {parseForm, isValidForm} from "../../utils/form-util";
// import {dateToTimestamp, timeSeparatedByColonToMilliseconds} from "../../utils/date-time-util"
// import request from "../../service/connection-service";
//
// import {actions} from "../../state/reducer/createSession.js";
// import {store} from "../../state/store/store.js";
//
// const sessionTypes = [
//   { value: "PHYSICAL_SESSION_REQUEST", name: "Fysiek"},
//   { value: "ONLINE_SESSION_REQUEST", name: "Online"},
//   { value: "ONLINE_SESSION_REQUEST", name: "Teams"},
// ]
//
// todo: Moet sessie AANPASSEN page worden, maar dan voor manager, Of role functions in een component inbouwen (if role, show x)
//
// class CreateSessionPage extends LitElement {
//   static get styles() {
//     return css`
//       centered-layout  {
//         display: flex;
//         flex-direction: column;
//         justify-content: center;
//         align-items: center;
//       }
//
//       sig-button {
//         margin: 15px 10px;
//       }
//
//       centered-layout > h1 {
//         text-align:center;
//       }
//
//       main h1 {
//         margin-top: 0;
//       }
//
//       form div {
//         display: flex;
//         flex-direction: row;
//         justify-content: flex-end;
//       }
//
//
//       *[invalid]{
//           box-shadow: var(--cim-shadow-invalid-input);
//       }
//     `;
//   }
//
//   static get properties() {
//     return {
//       loading: {type: Boolean, attribute: false, reflect: true},
//       sigs: {type: Array, attribute: false, reflect: true},
//       sessionType: {type: String, attribute: false, reflect: true},
//       sessionId: {type: String, attribute: false, reflect: true},
//     }
//   }
//
//   constructor() {
//     super();
//     this.loading = true;
//     this.sessionType = sessionTypes[0];
//     this.sigs = [];
//     this.sessionId = "";
//     document.title = "Sessie aanmaken"
//     store.subscribe(this._refresh)
//     this._load()
//   }
//
//   _refresh = async () => {
//     history.replaceState(store.getState(), document.title, window.location)
//     await this.requestUpdate();
//   }
//
//   _load = () => {
//     request('GET', '/sig')
//       .then(r => {
//         let sigs = [];
//         r.forEach(sig => sigs.push({ value: sig.id, name: sig.subject }))
//         this.sigs = sigs
//       })
//       .then(_ => this.loading = false)
//       .catch(_ => {
//         this.loading = true;
//         this.shadowRoot.getElementById("load-info").innerText = "Error, Kan iets niet laden"
//       })
//   }
//
//   _handleCancel = () => {
//     history.back();
//   }
//
//   _handleSave = () => {
//     let form = this.shadowRoot.querySelector("form");
//     if (!isValidForm(form)) return;
//     let body = parseForm(form);
//     let durationInMilliSeconds = timeSeparatedByColonToMilliseconds(body.duration)
//     body.startDate = dateToTimestamp(new Date());
//     body.endDate = dateToTimestamp(new Date() + durationInMilliSeconds)
//     delete body.duration
//
//     request('POST', '/sessions', body)
//       .then(r => r)
//       .then(_ => Router.go('/'))
//       .catch(_ => alert("Er was een error tijdens het aanmaken van de sessie!"));
//   }
//
//   _handleSessionRequest = () => {
//
//     //Check if is saved else continue
//     //Request session planning
//     //load next page
//   }
//
//   _handleSessionType = (e) => {
//     this.sessionType = e.detail;
//   }
//
//   async _handleSegmentToggle(title, isOpen) {
//     if (isOpen) {
//       store.dispatch(actions.close({title: title}))
//     } else {
//       store.dispatch(actions.open({title: title}))
//     }
//   }
//
//   render() {
//     const state = store.getState().createSession;
//     const segments = state.segments;
//
//     return html`
//         <app-root>
//           <cim-top-bar slot="header"></cim-top-bar>
//           <centered-layout slot="body">
//           ${this.loading ? html`<h1 id="load-info">Loading...</h1>` : html`
//             <main>
//               <h1>Sessie aanmaken</h1>
//               <form>
//                 <form-segment
//                   .title="${"Inhoud"}"
//                   .show="${segments.inhoud.open}"
//                    @toggle="${_ => this._handleSegmentToggle("inhoud", segments.inhoud.open)}">
//                   <form-item .name="${"subject"}" .label="${"Onderwerp"}"></form-item>
//                   <form-item .name="${"description"}" .label="${"Omschrijving"}"></form-item>
//                   <form-dropdown-item .items="${this.sigs}" .name="${"sigId"}" .label="${"Special Interest Group"}" ></form-dropdown-item>
//                 </form-segment>
//                 <form-segment
//                   .title="${"Soort"}"
//                   .show="${segments.soort.open}"
//                   @toggle="${_ => this._handleSegmentToggle("soort", segments.soort.open)}">
//                   <form-dropdown-item .items="${sessionTypes}" .name="${"@type"}" .label="${"Sessie type"}" @change="${this._handleSessionType}"></form-dropdown-item>
//                   ${this.sessionType === "PHYSICAL_SESSION_REQUEST"
//       ? html`<form-item .name="${"address"}" .label="${"Adres"}"></form-item>`
//       : html`
//                       <form-item .name="${"platform"}" .label="${"Platform"}">Platform</form-item>
//                       <form-item .name="${"joinUrl"}" .label="${"Join link"}" .editable="${this.sessionType !== "TEAMS_ONLINE_SESSION_REQUEST"}"
//                       value="${this.sessionType === "TEAMS_ONLINE_SESSION_REQUEST"? "TEAMS" : ''}"></form-item>
//                     `}
//                 </form-segment>
//                 <form-segment
//                   .title="${"Tijdsindeling"}"
//                   .show="${segments.tijdsindeling.open}"
//                   @toggle="${_ => this._handleSegmentToggle("tijdsindeling", segments.tijdsindeling.open)}">
//                   <form-time-item .name="${"duration"}" .label="${"Duratie"}"></form-time-item>
//                 </form-segment>
//                 <div>
//                   <sig-button @click="${() => this._handleCancel()}">Annuleren</sig-button>
//                   <sig-button @click="${() => this._handleSave()}">Opslaan</sig-button>
//                   <sig-button @click="${() => this._handleSessionRequest()}">Aanvragen</sig-button>
//                 </div>
//               </form>
//              </main>
//             `}
//           </centered-layout>
//         </app-root>
//       `
//   }
// }
//
// window.customElements.define('create-session-manager-page', CreateSessionPage)
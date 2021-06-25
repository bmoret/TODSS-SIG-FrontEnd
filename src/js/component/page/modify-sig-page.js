import {LitElement, html, css} from 'lit-element';
import {Router} from "@vaadin/router";
import {parseForm} from "../../utils/form-util";
import {request} from "../../service/connection-service";

class ModifySpecialInterestGroupScreen extends LitElement {
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
    `;
  }

  static get properties() {
    return {
      sig: {type: Object, attribute: false, reflect: true},
      organizers: {type: Array, attribute: false, reflect: true},
      loading: {type: Boolean, attribute: false, reflect: true},
      message: {type: String, attribute: false, reflect: true},
    }
  }

  constructor() {
    super();
    this.sig = {};
    this.organizers = [];
    this.loading = true;
    this.message = "Loading..."
  }

  connectedCallback() {
    super.connectedCallback()
    this._load()
  }

  _load = () => {
    request('GET', `/sig/${this.location.params.id}`)
      .then(r => {
        console.log(r.id)
        if (r.id === undefined) throw "";
        this.sig = r
      })
      .then(_ => this.organizers = this.sig.organizers.map(organizer => {
        return {name: organizer.personName, value: organizer.personId}
      }))
      .then(_ => this.loading = false)
      .catch(_ => {
        this.message = "Er ging iets mis tijdens het laden."
      })
  }

  _handleCancel = () => {
    history.back()
  }

  _handleSave = () => {
    let form = this.shadowRoot.querySelector("form");
    let body = parseForm(form);
    request('PUT', '/sig/' + this.location.params.id, body)
      .then(r => r)
      .then(_ => Router.go('/sig/' + this.sig.id))
      .catch(_ => alert("Er was een error tijdens het aanmaken van de sessie!"));
  }

  _selectManager = (e) => {
    const person = e.detail;
    const managerComponent = this.shadowRoot.querySelector("#manager");
    managerComponent.items = [{name: `${person.firstname} ${person.lastname}`, value: person.id}]
  }

  render() {
    return html`
      <cim-top-bar></cim-top-bar>
      <centered-layout>
        ${this.loading ? html`<h1 id="load-info">${this.message}</h1>` : html`
          <h1>Special Interest Group aanpassen: ${this.sig.subject}</h1>
          <form>
            <page-segment .title="${"info"}" >
              <form-item .name="${"subject"}" .label="${"Onderwerp"}" .value="${this.sig.subject}"></form-item>
              <form-dropdown-item id="manager" .name="${"managerId"}" .label="${"Manager"}" .items="${[{name: this.sig.manager.personName, value: this.sig.manager.personId}]}"></form-dropdown-item>
              <search-employee @employeeResult="${this._selectManager}"></search-employee>
              <view-clickable-list-segment-item 
              .name="${"Organisatoren"}"
              .items="${this.organizers}" 
              .formItem="${true}"></view-clickable-list-segment-item>
            </page-segment>
          </form>
        <div>
          <sig-button @click="${this._handleCancel}">Annuleren</sig-button>
          <sig-button @click="${this._handleSave}">Opslaan</sig-button>
        </div>`}
      </centered-layout>
    `
  }
}

window.customElements.define('modify-sig-page', ModifySpecialInterestGroupScreen)
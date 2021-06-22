import {LitElement, html, css} from 'lit-element';
import {Router} from "@vaadin/router";

import {parseForm} from "../../utils/form-util";
import {request} from "../../service/connection-service";

class CreateSpecialInterestGroupPage extends LitElement {
  static get styles() {
    return css`
      centered-layout div {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      } 
      
      h1 {
        margin:  0 auto 22px auto;
      }
        
      sig-button {
        margin: 15px 10px;
      }
    `;
  }

  static get properties() {
    return {
      organizers: {type: Array, attribute: false, reflect: true},
    }
  }

  constructor() {
    super();
    this.organizers = [];
  }

  _handleCancel = () => history.back();

  _handleSave = () => {
    let form = this.shadowRoot.querySelector("form");
    let body = parseForm(form);
    body.organizerIds = this.organizers.map(organizer => organizer.value);
    if (body.subject === undefined || body.manager === undefined || body.organizerIds.size === 0) return;
    request('POST', '/sig', body)
      .then(r => Router.go('/sig/' + r.id))
      .catch(_ => alert("Er was een error tijdens het aanmaken van de medewerker!"));
  }

  _selectManager = (e) => {
    const person = e.detail;
    const managerComponent = this.shadowRoot.querySelector("#manager");
    managerComponent.items = [{name: `${person.firstname} ${person.lastname}`, value: person.id}]
  }

  _selectOrganizer = (e) => {
    const person = e.detail;
    if (this.organizers.some(item =>  item.value === person.id)) return;
    const organizer = {name: `${person.firstname} ${person.lastname}`, value: person.id}
    this.organizers = [...this.organizers, organizer]
  }

  render() {
    return html`
      <cim-top-bar></cim-top-bar>
      <centered-layout>
        <h1>Special Interest Group aanmaken</h1>
          <form>
            <page-segment .title="${"info"}" >
              <form-item .name="${"subject"}" .label="${"Onderwerp"}"></form-item>
              <form-dropdown-item id="manager" .name="${"managerId"}" .label="${"Manager"}"></form-dropdown-item>
              <search-employee @employeeResult="${this._selectManager}"></search-employee>
              <view-clickable-list-segment-item 
              .name="${"Organisatoren"}"
              .items="${this.organizers}" 
              .formItem="${true}"></view-clickable-list-segment-item>
              <search-employee @employeeResult="${this._selectOrganizer}"></search-employee>
            </page-segment>
          </form>
        <div>
          <sig-button @click="${this._handleCancel}">Annuleren</sig-button>
          <sig-button @click="${this._handleSave}">Opslaan</sig-button>
        </div>
      </centered-layout>
    `
  }
}

window.customElements.define('create-sig-page', CreateSpecialInterestGroupPage)
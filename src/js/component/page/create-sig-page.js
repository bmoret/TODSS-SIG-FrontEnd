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

  _handleCancel = () => history.back();

  _handleSave = () => {
    let form = this.shadowRoot.querySelector("form");
    let body = parseForm(form);
    body.organizerIds = [];
    request('POST', '/sig', body)
      .then(r => Router.go('/sig/' + r.id))
      .catch(_ => alert("Er was een error tijdens het aanmaken van de medewerker!"));
  }

  _selectPerson = (e) => {
    const person = e.detail;
    const supervisorComponent = this.shadowRoot.querySelector("#manager");
    supervisorComponent.items = [{name: `${person.firstname} ${person.lastname}`, value: person.id}]
  }

  render() {
    return html`
        <cim-top-bar></cim-top-bar>
        <centered-layout>
          <h1>Special Interest Group aanmaken</h1>
            <form>
                <page-segment .title="${"info"}" >
                    <form-item .name="${"subject"}" .label="${"Onderwerp"}"></form-item>
                    <form-dropdown-item id="manager" .name="${"managerId"}" .label="${"Supervisor"}"></form-dropdown-item>
                    <search-employee @employeeResult="${this._selectPerson}"></search-employee>
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
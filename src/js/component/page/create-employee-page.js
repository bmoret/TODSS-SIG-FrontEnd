import {LitElement, html, css} from 'lit-element';
import {Router} from "@vaadin/router";

import {parseForm} from "../../utils/form-util";
import {request} from "../../service/connection-service";

const branchTypes = [{name: "Vianen", value: "VIANEN"}, {name: "Best", value: "BEST"}, {
  name: "Groningen",
  value: "GRONINGEN"
},
  {name: "Rotterdam", value: "ROTTERDAM"}, {name: "Amsterdam", value: "AMSTERDAM"},
  {name: "Deventer", value: "DEVENTER"}, {name: "Maastricht", value: "MAASTRICHT"}]

const roleTypes = [{name: "Manager", value: "MANAGER"}, {name: "Employee", value: "EMPLOYEE"},
  {name: "Secretary", value: "SECRETARY"}]

class CreateEmployeePage extends LitElement {
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
        request('POST', '/person', body)
            .then(r => Router.go('/person/' + r.id))
            .catch(_ => alert("Er was een error tijdens het aanmaken van de medewerker!"));
    }

  _selectPerson = (e) => {
    const person = e.detail;
    const supervisorComponent = this.shadowRoot.querySelector("#supervisor");
    supervisorComponent.items = [
      {name: `${person.firstname} ${person.lastname}`, value: person.id},
      {name: 'Geen', value: ""}
    ]
  }

  render() {
    return html`
        <cim-top-bar></cim-top-bar>
        <centered-layout>
          <h1>Medewerker Aanmaken</h1>
            <form>
                <page-segment .title="${"Persoonsgegevens"}" >
                    <form-item .name="${"firstname"}" .label="${"Voornaam"}"></form-item>
                    <form-item .name="${"lastname"}" .label="${"Achternaam"}"></form-item>
                    <form-item .name="${"email"}" .label="${"Email"}"></form-item>
                </page-segment>
                <page-segment .title="${"Werkgegevens"}" >
                    <form-item .name="${"expertise"}" .label="${"Expertise"}"></form-item>
                    <form-date-picker .name="${"employedSince"}" .label="${"Werkzaam sinds"}"></form-date-picker>
                    <form-dropdown-item .name="${"branch"}" .label="${"Filiaal"}" .items="${branchTypes}"></form-dropdown-item>
                    <form-dropdown-item .name="${"role"}" .label="${"Rol"}" .items="${roleTypes}"></form-dropdown-item>
                    <form-dropdown-item id="supervisor" .name="${"supervisorId"}" .label="${"Supervisor"}"></form-dropdown-item>
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

window.customElements.define('create-employee-page', CreateEmployeePage)
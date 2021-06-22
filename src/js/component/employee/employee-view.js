import {LitElement, html, css} from 'lit-element';
import {Router} from "@vaadin/router";

class EmployeeView extends LitElement {
  static get styles() {
    return css`
        #supervisor {
          cursor: pointer;
        }
      `
  }

  static get properties() {
    return {
      employee: {type: Object, attribute: false, reflect: true},
    }
  }

  constructor() {
    super();
    this.employee = {};
  }

  _goToSupervisor = () => {
    if (!this.employee.supervisor) return;
    Router.go("/person/" + this.employee.supervisor.personId)
  }

  render() {
    const supervisorName = (this.employee && this.employee.supervisor && this.employee.supervisor.personName)? this.employee.supervisor.personName : "Geen";

    return html`
    <page-segment 
    .title="${"Persoonsgegevens"}" >
      <view-segment-item .name="${"Voornaam"}" .value="${this.employee.firstname}"></view-segment-item>
      <view-segment-item .name="${"Achternaam"}" .value="${this.employee.lastname}"></view-segment-item>
      <view-segment-item .name="${"Email"}" .value="${this.employee.email}"></view-segment-item>
    </page-segment>
    <page-segment .title="${"Werkgegevens"}" >
      <view-segment-item .name="${"Expertise"}" .value="${this.employee.expertise}"></view-segment-item>
      <view-segment-item .name="${"Werkzaam sinds"}" .value="${this.employee.employedSince}"></view-segment-item>
      <view-segment-item .name="${"Filiaal"}" .value="${this.employee.branch}"></view-segment-item>
      <view-segment-item .name="${"Rol"}" .value="${this.employee.role}"></view-segment-item>
      <view-segment-item id="${this.employee.supervisor? "supervisor" : ""}" 
      .name="${"Supervisor"}" 
      .value="${supervisorName}" 
      @click="${this._goToSupervisor}"></view-segment-item>
    </page-segment>
    `
  }
}

window.customElements.define('employee-view', EmployeeView);
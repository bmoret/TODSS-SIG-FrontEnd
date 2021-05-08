import {LitElement, html} from 'lit-element';

class EmployeeView extends LitElement {
  static get properties() {
    return {
      employee: {type: Object, attribute: false, reflect: true},
    }
  }

  constructor() {
    super();
  }

  render() {
    return html`
    <form-segment 
    .title="${"Persoonsgegevens"}" >
      <view-segment-item .name="${"Voornaam"}" .value="${this.employee.firstname}"></view-segment-item>
      <view-segment-item .name="${"Achternaam"}" .value="${this.employee.lastname}"></view-segment-item>
      <view-segment-item .name="${"Email"}" .value="${this.employee.email}"></view-segment-item>
    </form-segment>
    <form-segment .title="${"Werkgegevens"}" >
      <view-segment-item .name="${"Expertise"}" .value="${this.employee.expertise}"></view-segment-item>
      <view-segment-item .name="${"Werkzaam sinds"}" .value="${this.employee.employedSince}"></view-segment-item>
      <view-segment-item .name="${"Filiaal"}" .value="${this.employee.branch}"></view-segment-item>
      <view-segment-item .name="${"Rol"}" .value="${this.employee.role}"></view-segment-item>
      <view-segment-item .name="${"Supervisor"}" .value="${this.employee.supervisor}"></view-segment-item>
    </form-segment>
    `
  }
}

window.customElements.define('employee-view', EmployeeView);
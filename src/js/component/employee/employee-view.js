import {LitElement, html} from 'lit-element';
import {store} from "../../state/store/store";
import {actions} from "../../state/reducer/createSession";

class EmployeeView extends LitElement {
  static get properties() {
    return {
      employee: {type: Object, attribute: false, reflect: true},
    }
  }

  constructor() {
    super();
    console.log(this.employee)
    store.subscribe(this._refresh)
  }

  _refresh = async () => {
    history.replaceState(store.getState(), document.title, window.location)
    await this.requestUpdate();
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
    const segments = state.segments; //todo move out of component

    return html`
    <form-segment .title="${"Persoonsgegevens"}" >
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
    // <page-segment 
    //       .title="${"Inhoud"}" 
    //       .show="${segments.inhoud.open}" 
    //        @toggle="${_ => this._handleSegmentToggle("inhoud", segments.inhoud.open)}">
    //       <view-segment-item .name="${"Onderwerp"}" .value="${this.session.details.subject}"></view-segment-item>
    //       <view-segment-item .name="${"Omschrijving"}" .value="${this.session.details.description}"></view-segment-item>
    //       <view-segment-item .name="${"Special interest group"}" .value="${this.session.specialInterestGroup.subject}" ></view-segment-item>
    //     </page-segment>
    //     <page-segment 
    //       .title="${"Soort"}" 
    //       .show="${segments.soort.open}" 
    //       @toggle="${_ => this._handleSegmentToggle("soort", segments.soort.open)}">
    //       <view-segment-item .name="${"Type"}" .value="${this.session.type}" ></view-segment-item>
    //       ${this.session.type === "PHYSICAL"
    //         ? html`<view-segment-item .name="${"Adres"}" .value="${this.session.address}"></view-segment-item>`
    //         : html`
    //           <view-segment-item .name="${"Platform"}" .value="${this.session.platform}">Platform</view-segment-item>
    //           <view-segment-item .name="${"Join link"}" .value="${this.session.joinUrl}"></view-segment-item>
    //         `}
    //     </page-segment>
    //     <page-segment 
    //       .title="${"Tijdsindeling"}" 
    //       .show="${segments.tijdsindeling.open}" 
    //       @toggle="${_ => this._handleSegmentToggle("tijdsindeling", segments.tijdsindeling.open)}">
    //       <view-segment-item .name="${"Duratie"}" .value="${this._calculateDuration() + " minuten"}"></view-segment-item>
    //     </page-segment>
  }
}

window.customElements.define('employee-view', EmployeeView);
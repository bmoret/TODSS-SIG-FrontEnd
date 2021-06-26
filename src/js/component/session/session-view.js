import {LitElement, html, css} from 'lit-element';
import {store} from "../../state/store/store";
import {actions} from "../../state/reducer/createSession";
import {timestampToDateString} from "../../utils/date-time-util";
import {Router} from "@vaadin/router";

class SessionView extends LitElement {
  static get styles() {
    return css`
      .clickable {
        cursor: pointer;
      }
    `
  }

  static get properties() {
    return {
      session: {type: Object, attribute: false, reflect: true},
    }
  }

  constructor() {
    super();
    this.session = {};
    store.subscribe(this._refresh)
  }

  _refresh = async () => {
    history.replaceState(store.getState(), document.title, window.location)
    await this.requestUpdate();
  }

  _calculateDuration = () => {
    const startDate = new Date(this.session.details.startDate).getTime();
    const endDate = new Date(this.session.details.endDate).getTime();
    const differenceInMinutes = (endDate - startDate) / 1000 / 60;
    return differenceInMinutes > 0 ? differenceInMinutes : 0;
  }

  async _handleSegmentToggle(title, isOpen) {
    if (isOpen) {
      store.dispatch(actions.close({title: title}))
    } else {
      store.dispatch(actions.open({title: title}))
    }
  }

  _goToSig = (id) => {
    Router.go('/sig/'+ id)
  }

  render() {
    const state = store.getState().createSession;
    const segments = state.segments;

    return html`
        <page-segment 
          .title="${"Inhoud"}" 
          .show="${segments.inhoud.open}" 
           @toggle="${_ => this._handleSegmentToggle("inhoud", segments.inhoud.open)}">
          <view-segment-item .name="${"Onderwerp"}" .value="${this.session.details.subject}"></view-segment-item>
          <view-segment-item .name="${"Omschrijving"}" .value="${this.session.details.description}"></view-segment-item>
          <view-segment-item class="clickable"
          .name="${"Special interest group"}" 
          .value="${this.session.specialInterestGroup? this.session.specialInterestGroup.subject : '-'}" 
          @click="${_ => this._goToSig(this.session.specialInterestGroup.id)}"></view-segment-item>
        </page-segment>
        <page-segment 
          .title="${"Soort"}" 
          .show="${segments.soort.open}" 
          @toggle="${_ => this._handleSegmentToggle("soort", segments.soort.open)}">
          <view-segment-item .name="${"Type"}" .value="${this.session.type}" ></view-segment-item>
          ${this.session.type === "PHYSICAL"
            ? html`<view-segment-item .name="${"Adres"}" .value="${this.session.address}"></view-segment-item>`
            : html`
              <view-segment-item .name="${"Platform"}" .value="${this.session.platform}">Platform</view-segment-item>
              <view-segment-item .name="${"Join link"}" .value="${this.session.joinUrl}"></view-segment-item>
            `}
        </page-segment>
        <page-segment 
          .title="${"Tijdsindeling"}" 
          .show="${segments.tijdsindeling.open}" 
          @toggle="${_ => this._handleSegmentToggle("tijdsindeling", segments.tijdsindeling.open)}">
          ${ !["DRAFT", "TO_BE_PLANNED"].includes(this.session.state)? 
            html`<view-segment-item .name="${"Datum"}" .value="${timestampToDateString(this.session.details.startDate)}"></view-segment-item>`: ''
          }
          <view-segment-item .name="${"Duur"}" .value="${this._calculateDuration() + " minuten"}"></view-segment-item>
        </page-segment>
    `
  }
}

window.customElements.define('session-view', SessionView);
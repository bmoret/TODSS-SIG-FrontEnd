import {LitElement, html, css} from 'lit-element';
import {Router} from "@vaadin/router/dist/vaadin-router";

class SpecialInterestGroupView extends LitElement {
  static get styles() {
    return css`
      .clickable {
        cursor: pointer;
      }
    `
  }

  static get properties() {
    return {
      sig: {type: Object, attribute: false, reflect: true},
    }
  }

  constructor() {
    super();
    this.sig = {
      organizers: []
    };
  }

  _goToPerson = (id) => {
    const link = `/person/${id}`
    console.log(link)
    Router.go(link)
  }

  render() {
    const organizerItems = this.sig.organizers.map(organizer => {return {name: organizer.personName, value: organizer.personId}})

    return html`
        <page-segment .title="${"Info"}">
          <view-segment-item .name="${"Onderwerp"}" .value="${this.sig.subject}"></view-segment-item>
          <view-segment-item 
            class="clickable" 
            .name="${"Manager"}" 
            .value="${this.sig.manager.personName}" 
            @click="${_ => this._goToPerson(this.sig.manager.personId)}"></view-segment-item>
          <view-clickable-list-segment-item 
            .name="${"Organisatoren"}"
            .items="${organizerItems}" 
            @click="${e => this._goToPerson(e.detail)}"></view-clickable-list-segment-item>
        </page-segment>
    `
  }
}

window.customElements.define('sig-view', SpecialInterestGroupView);
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
    this.sig = {};
  }

  _goToPerson = (id) => {
    Router.go(`/person/${id}`)
  }

  render() {
    return html`
        <page-segment .title="${"Info"}">
          <view-segment-item .name="${"Onderwerp"}" .value="${this.sig.subject}"></view-segment-item>
          <view-segment-item class="clickable" .name="${"manager"}" .value="${this.sig.manager.personName}" @click="${_ => this._goToPerson(this.sig.manager.personId)}"></view-segment-item>
        </page-segment>
    `
  }
}

window.customElements.define('sig-view', SpecialInterestGroupView);
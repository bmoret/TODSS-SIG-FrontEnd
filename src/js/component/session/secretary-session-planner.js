import {html, css, LitElement} from 'lit-element';
import {Router} from "@vaadin/router";
import {router} from "../router/router";
import {isValidForm, parseForm} from "../../utils/form-util";
import {dateToTimestamp, timeSeparatedByColonToMilliseconds} from "../../utils/date-time-util";
import request from "../../service/connection-service";

class SecretarySessionPlanner extends LitElement {
  static get styles() {
    return css`
      div {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }
      `
  }

  static get properties() {
    return {
      items: {type: Array, attribute: false, reflect: true},
    }
  }

  constructor() {
    super();
  }

  _handlePlanning = () => {
    let form = this.shadowRoot.querySelector("form");
    if (!isValidForm(form)) return;
    let body = parseForm(form);
    if (!this._checkDateAfterNow(body.startDate) || !this._checkDateAfterNow(body.endDate)) {
      return alert("Ongeldige momenten");
    }
    const sessionId = router.location.params.id;
    const URL = `/sessions/${sessionId}/plan?startDate=${body.startDate}&endDate=${body.endDate}`;
    request('PUT', URL)
      .then(r => r)
      .then(_ => alert("Succes"))
      .catch(_ => alert("Er was een error tijdens het plannen van de sessie!"));
  }

  _checkDateAfterNow(inputDateTime) {
    const date = new Date();
    const inputDate = new Date(inputDateTime)
    return inputDate > date;
  }

  render() {
    return html`
      <p></p>
      <form>
        <form-datetime-picker 
        .name="${"startDate"}" 
        .label="${"Van"}"
        .secondName="${"endDate"}" 
        .secondLabel="${"tot"}"
        ></form-datetime-picker>
      </form>
      <div>
        <sig-button @click="${this._handlePlanning}">Inplannen</sig-button>
      </div>
      `
  }
}

window.customElements.define('secretary-session-planner', SecretarySessionPlanner)
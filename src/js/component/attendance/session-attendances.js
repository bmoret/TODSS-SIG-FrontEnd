import {LitElement, html, css} from 'lit-element';
import {roundToPercent} from "../../utils/number-utils";
import {request} from "../../service/connection-service";

class SessionAttendances extends LitElement {
  static get styles() {
    return css`
      ul {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        padding: 0;
        justify-content: space-between;
      }
      
      li {
        padding: 5px 0;
        box-sizing: border-box;
        list-style: none;
      }
      
      img {
        width: 70px;
        max-height: 80px;
        margin: 70px 20px 0 0;
      }
      
      p {
        font-weight: bold;
        font-size: 20px
      }
      
      .type__container {
        display: flex;
        flex-direction: row;
      }
    
      .attendances__container {
        width: 100%;
      }
     
      @media screen and (max-width: 1040px) {
       ul {
        flex-direction: column;
       }
       
       li {
        width: 100%;
       }
      }
      
      @media screen and (min-width: 1040px) {
       ul {
        flex-direction: row;
       }
       
       li {
        flex: 1 0 40%;
        max-width: 50%;
       }
       
       li:nth-child(odd) {
        padding-right: 10px;
       }
       }
    `;
  }

  static get properties() {
    return {
      attendances: {type: Array, attribute: false, reflect: true},
      cancellations: {type: Array, attribute: false, reflect: true},
      attendancePercent: {type: Number, attribute: false, reflect: true},
      cancellationPercent: {type: Number, attribute: false, reflect: true},
    }
  }

  constructor() {
    super();
    this.attendances = [];
    this.cancellations = [];
  }

  updated(_changedProperties) {
    super.updated(_changedProperties);
    const totalAmount = this.attendances.length + this.cancellations.length;
    this.attendancePercent = roundToPercent(this.attendances.length / totalAmount * 100);
    this.cancellationPercent = roundToPercent(this.cancellations.length / totalAmount * 100);
  }

  _updateAttendance = (e, id) => {
    const body = { "isPresent" : e.detail.present, }
    request("PATCH",`/attendances/${id}/presence`, body)
  }

  render() {
    return html`
      <div class="type__container">
        <img src="/dist/assets/icon/checked-person.svg" alt=""/>
        <div class="attendances__container">
          <p>Aangemeld ${!isNaN(this.attendancePercent) ? html`(${this.attendancePercent}%)` : ''}</p>
          <ul>
            ${this.attendances.map(attendance => html`
              <li>
                <attendance-item 
                  .name="${attendance.person.personName}"
                  .id="${attendance.person.personId}"
                  present
                  @updateAttendance="${e => this._updateAttendance(e, attendance.id)}"
                ></attendance-item>
              </li>
            `)}
          </ul>
        </div>
      </div>
      <div class="type__container">
        <img src="/dist/assets/icon/crossed-person.svg" alt=""/>
        <div class="attendances__container">
          <p>Afgemeld ${!isNaN(this.cancellationPercent) ? html`(${this.cancellationPercent}%)` : ''}</p>
          <ul>
            ${this.cancellations.map(cancellation => html`
              <li>
                <attendance-item 
                  .name="${cancellation.person.personName}" 
                  .id="${cancellation.person.personId}"
                  @updateAttendance="${e => this._updateAttendance(e, cancellation.id)}"
                ></attendance-item>
              </li>
            `)}
          </ul>
        </div>
      </div>
      </div>
    `
  }
}

window.customElements.define('session-attendances', SessionAttendances);
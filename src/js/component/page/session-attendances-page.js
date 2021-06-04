import {LitElement, html, css} from 'lit-element';
import {Router} from "@vaadin/router";
import {request} from "../../service/connection-service";
import {store} from "../../state/store/store";

class SessionAttendancesPage extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        height: 100%;
      }
      
      centered-layout  {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      
      h1 {
      display: inline-block;
        text-align:center;
        width: min-content;
        margin-right: 0;
      }
      
      div { 
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      div > *:nth-child(2) {
         margin-left: auto;
      }
      
    `;
  }

  static get properties() {
    return {
      loading: {type: Boolean, attribute: false, reflect: true},
      message: {type: String, attribute: false, reflect: true},
      attendances: {type: Array, attribute: false, reflect: true},
      cancellations: {type: Array, attribute: false, reflect: true},
    }
  }

  constructor() {
    super();
    this.loading = false;
    this.attendances = []
    this.cancellations =[]
    document.title = "Aanmeldingen"
    this.message = "Loading..."

    // this.attendances = [{personName: "Jan Jansen", personId: "aaa"}, {personName: "Kelvin karens", personId: "bbb"}, {personName: "Willem Walters", personId: "ccc"},]
    // this.cancellations = [{personName: "Jenny Jovel", personId: "eee"}, {personName: "Berend B", personId: "ddd"}, {personName: "Xander Xeros", personId: "fff"},]

  }

  connectedCallback() {
    super.connectedCallback();
    this._load()
  }

  _load = () => {
    request('GET', `/attendances/session/${this.location.params.id}`)
      .then(r => {
        let attending = [];
        let canceled = [];
        for(let attendance of r) {
          if (attendance.state && attendance.state === "PRESENT") attending.push(attendance);
          else canceled.push(attendance);
        }
        this.attendances = attending;
        this.cancellations = canceled;
      })
      .then(_ => this._refresh)
      .then(_ => this.loading = false)
      .catch(_ => {
        this.loading = true;
        this.message = "Error, Kan de sessie niet laden"
      })
  }

  _handleUpdateAttendance = (e) => {

    if (e.detail.present){
      const person = this.cancellations.find(attendee => attendee.person.personId === e.detail.id);
      if (person !== undefined){

        //api call update attendance state, present : detail.present
        //if api call ok,

        this.removeFromArray(person, this.cancellations)
        this.attendances = [ ...this.attendances, person]
      }
    }else {
      const person = this.attendances.find(attendee => attendee.person.personId === e.detail.id);
      if (person !== undefined){

        //api call update attendance state, present : detail.present
        //if api call ok,
        this.removeFromArray(person, this.attendances)
        this.cancellations = [ ...this.cancellations, person]
      }
    }
  }

  removeFromArray = (item, array) => {
    const index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  render() {
    const comparator = function(a,b) {return (a.personName > b.personName) ? 1 : ((b.personName > a.personName) ? -1 : 0);}
    this.attendances.sort(comparator);
    this.cancellations.sort(comparator);

    return html`
       <app-root>
          <cim-top-bar slot="header"></cim-top-bar>
          <centered-layout slot="body">
          ${this.loading ? html`<h1 id="load-info">${this.message}</h1>` : html`
            <main>
              <div>
                <h1>Aanmeldingen</h1>
                <sig-button @click="${_ => Router.go(`/session/${this.location.params.id}`)}">Terug</sig-button>
              </div>
              <session-attendances 
                .attendances="${this.attendances}"
                .cancellations="${this.cancellations}"
                @updateAttendance="${e => this._handleUpdateAttendance(e)}"
              ></session-attendances>
            </main>
          `}
          </centered-layout>
        </app-root>
      `
  }
}

window.customElements.define('session-attendances-page', SessionAttendancesPage)
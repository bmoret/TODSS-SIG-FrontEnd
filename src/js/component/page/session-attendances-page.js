import {LitElement, html, css} from 'lit-element';

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
    this.attendances = [];
    document.title = "Aanmeldingen"
    this.message = "Loading..."

    this.attendances = [{personName: "Jan Jansen"}, {personName: "Kelvin karens"}, {personName: "Willem Walters"}, {personName: "Jan Jansen"}, {personName: "Kelvin karens"}, {personName: "Willem Walters"}, {personName: "Jan Jansen"}, {personName: "Kelvin karens"}, {personName: "Willem Walters"}, {personName: "Jan Jansen"}, {personName: "Kelvin karens"}, {personName: "Willem Walters"},]
    this.cancellations = [{personName: "Berend B"}, {personName: "Jenny Jovel"}, {personName: "Xander Xeros"}, {personName: "Berend B"}, {personName: "Jenny Jovel"}, {personName: "Xander Xeros"}, {personName: "Berend B"}, {personName: "Jenny Jovel"}, {personName: "Xander Xeros"}, {personName: "Berend B"}, {personName: "Jenny Jovel"}, {personName: "Xander Xeros"}, {personName: "Berend B"}, {personName: "Jenny Jovel"}, {personName: "Xander Xeros"}, {personName: "Berend B"}, {personName: "Jenny Jovel"}, {personName: "Xander Xeros"}, {personName: "Berend B"}, {personName: "Jenny Jovel"}, {personName: "Xander Xeros"}, ]
    // this.attendances = []
    // this.cancellations =[]
  }

  connectedCallback() {
    super.connectedCallback();
    this._load()
  }

  _load = async () => {
    // request('GET', `/sessions/${this.location.params.id}/attendances`)
    //   .then(r => this.attendances = r)
    //   .then(_ => this.loading = false)
    //   .catch(_ => {
    //     this.loading = true;
    //     this.message = "Error, Kan de sessie niet laden"
    //   })
  }

  render() {
    return html`
       <app-root>
          <cim-top-bar slot="header"></cim-top-bar>
          <centered-layout slot="body">
          ${this.loading ? html`<h1 id="load-info">${this.message}</h1>` : html`
            <main>
              <div>
                <h1>Aanmeldingen</h1>
                <sig-button @click="${_ => history.back()}">Terug</sig-button>
              </div>
              <session-attendances 
                .attendances="${this.attendances}"
                .cancellations="${this.cancellations}"
              ></session-attendances>
            </main>
          `}
          </centered-layout>
        </app-root>
      `
  }
}

window.customElements.define('session-attendances-page', SessionAttendancesPage)
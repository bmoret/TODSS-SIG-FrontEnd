import { LitElement, html, css } from 'lit-element';
import request from "../../service/connection-service";

class applyButton extends LitElement {
    static get styles() {
        return css`
        :host{ 
          width: 100%;
          height: 100%;
        }
        
        button {
          background-image: var(--cim-color-gradient-light);
          padding: 5px;
          outline: none;
          border: none;
          cursor: pointer;
        }
  
        button:hover,
        button:focus {
          background-color: var(--cim-color-button-focused);
          -webkit-box-shadow: var(--cim-shadow-top-down-inset);
             -moz-box-shadow: var(--cim-shadow-top-down-inset);
                  box-shadow: var(--cim-shadow-top-down-inset);
        }
      
        ::slotted(*) {
            text-align: center;
            margin: auto;
            width: 50%;
            font-size: var(--cim-fond-size-button);
            font-weight: bold;
        }
        
        slot {
        }
        
        @media screen and (max-width: 1040px) {
            button {
              width: 100%;
              height: 100%;
            }
           
        }
       
        @media screen and (min-width: 1040px) {
            button {
            width: 100%;
            height: 100%;
            }
        }
    `
    }

    static get properties() {
        return {
            enroll: {type: Boolean, attribute: false, reflect: true},
            sessionId: {type: String, attribute: false, reflect: true},
            employeeId: {type: String, attribute: false, reflect: true}
        }
    }

    constructor() {
        super();
        this.enroll = false;
    }

    connectedCallback() {
        super.connectedCallback();
        const userState = JSON.parse(localStorage.getItem("user_state")) || { };
        this.employeeId = userState.id;
        this._setEnroll()
        console.log(this.employeeId)
        console.log(this.sessionId)
    }

    _setEnroll() {
        request("GET","/attendances/"+this.sessionId+"/"+this.employeeId)
            .then(response => this.enroll = response)
    }

    _handleClick = (e) => {

        const body = {
            "state" : !this.enroll? "PRESENT" : "CANCELED",
            "speaker" : false}

        request("POST","/attendances/"+this.sessionId+"/"+this.employeeId, body)
            .then(response => this.enroll = !this.enroll)
    }

    render() {
        return html`
          <sig-button  @click="${_ => this._handleClick()}">
            ${!this.enroll? "aanmelden voor sessie" : "aanmelding annuleren"}
          </sig-button>
        `
    }
}

window.customElements.define('apply-button', applyButton);
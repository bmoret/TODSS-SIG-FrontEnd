import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';

class CreateSessionScreen extends LitElement {
  static get styles() {
    return css`
      div {
        
    
    `;
  }



  static get properties() {
    return {
    }
  }

  constructor() {
    super();
  }

  render() {
    return  html`
       <centered-layout>
          <h1>Sessie aanmaken</h1>
          <form-segment 
            .title="${"Inhoud"}" 
            .body="${"inputs"}"
          ></form-segment>
          <form-segment 
            .title="${"Soort"}" 
            .body="${"inputs"}"
          ></form-segment>
          <form-segment
             .title="${"Tijdsindeling"}" 
             .body="${"inputs"}"
          ></form-segment>
       </centered-layout>
        
      `
  }
}

window.customElements.define('create-session-screen', CreateSessionScreen)
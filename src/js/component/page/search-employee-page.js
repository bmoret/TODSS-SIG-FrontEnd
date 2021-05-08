import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';
import {parseForm, isValidForm} from "../../utils/form-util";
import request from "../../service/connection-service";
class SeachEmployeePage extends LitElement {
  static get styles() {
    return css`
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }
    `
  }
  

  static get properties() {
    return {
      results: {type: Array, attribute: false}
    }
  }

  constructor() {
    super();
    document.title = "Medewerkers zoeken";
    this.results = [];
  }

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener('provideResults', event => this.results = event.detail);
  }

  render() {
    return html`
      <app-root>
        <cim-top-bar slot="header"></cim-top-bar>
        <centered-layout slot="body">
          <main>
          <search-employee></search-employee>
          <selected-speaker></selected-speaker>
            ${this.results.length > 0 ? html`
            <form-segment .title="${"Zoek resultaten"}">
              <ul>
                ${this.results.map(
                  result => html`
                    <search-result
                    .id="${result.id}"
                    .firstname="${result.firstname}"
                    .lastname="${result.lastname}"
                    .expertise="${result.expertise}"
                    .role="${result.role}"
                    .branch="${result.branch}"
                    ></search-result>
                `)}
              </ul>
            ` 
              : html ``}
          </main>
        </centered-layout>
      </app-root>
    `
  }
}

window.customElements.define('search-employee-page', SeachEmployeePage)
import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';
import request from "../../service/connection-service";

class SeachResults extends LitElement {
  static get styles() {
    return css`
        li {
            cursor: pointer;
            padding: 10px;
            font-family: Arial, Helvetica, sans-serif;
            border-collapse: collapse;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        }

        li:hover {background-color: #ddd;}

        h3 {
          margin: 0px;
          margin-bottom: 4px;
        }   
        
        main {
          display: grid;
          grid-template-areas:
            "expertise  role  branch";
          grid-template-columns: 34% auto 33%;          
        }

        p {
          margin: 0;
        }

        p.expertise {
          grid-area: expertise;
        }

        p.role {
          grid-area: role;
        }

        p.branch {
          grid-area: branch;
        }
    `
  }

  static get properties() {
    return {
        id: {type: String, attribute: true},
        firstname: {type: String, attribute: true},
        lastname: {type: String, attribute: true},
        expertise: {type: String, attribute: true},
        role: {type: String, attribute: true},
        branch: {type: String, attribute: true},        
    }
  }

  _handleRow = () => {
    //pagina nog te maken
      console.log(`go to: /person/${this.id}`)
      request('GET', '/person/'+this.id)
      .then(r => r)
      .then(_ => Router.go(`/person/${this.id}`))
  }

  render() {
    return html`
            <li @click="${this._handleRow}">
                <h3>${this.firstname+" "+this.lastname}</h3>
                <main>
                  <p class="exp">Expertise: ${this.expertise}</p>
                  <p class="role">Role: ${this.role}</p>
                  <p class="branch">Branch: ${this.branch}</p>
                </main>
            </li>
    `
  }
}

window.customElements.define('search-result', SeachResults)
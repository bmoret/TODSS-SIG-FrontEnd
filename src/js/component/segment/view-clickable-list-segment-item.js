import {html, css, LitElement} from 'lit-element';

class ViewClickableListSegmentItem extends LitElement {
  static get styles() {
    return css`
      div {
      padding: 10px;
        display: flex;
        flex-direction:column;
      }
      
      ul {
        display: flex;
        flex-direction:row;
        list-style: none;
        padding: 0;
        margin: 0;
      }
      
      li {
        cursor: pointer;
        flex: 1 1 50%
      }
      
      h3 {
        width: 100%;
        margin: 0;
      }
      
      li:nth-child(even) p {
        text-align: right;
      } 
      
      li:nth-child(odd) p {
        text-align: left;
      }
      `
  }

  static get properties() {
    return {
      items: {type: Array, attribute: false, reflect: true},
      name: {type: String, attribute: false, reflect: true},
    }
  }

  constructor() {
    super();
    this.items = [];
    this.name = "";
  }

  _emitClick = (e, value) => {
    e.preventDefault();
    e.stopPropagation();
    let event = new CustomEvent('click', { bubbles: true, composed: true, detail: value });
    this.dispatchEvent(event);
  }

  render() {
    let count = 0;
    for(const key in this.items) {
      if(this.items.hasOwnProperty(key)) count++;
    }

    return html`
      <div> 
        <h3>${this.name}</h3>
        <ul>
        ${count === 0? html`<li><p>Geen</p></li>`
          :this.items.map(item => html`
            <li @click="${e => this._emitClick(e, item.value)}">
              <p>${item.name}</p>
            </li>`)
        }
        </ul>
      </div>
      `
  }
}

window.customElements.define('view-clickable-list-segment-item', ViewClickableListSegmentItem)
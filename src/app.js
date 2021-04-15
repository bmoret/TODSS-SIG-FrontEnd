import { LitElement, html, css } from 'https://cdn.skypack.dev/lit-element@2.3.1';
// import { router } from 'lit-element-router';


//TODO https://www.youtube.com/watch?v=mWeJnl9Ixxs

// class App extends router(LitElement) {
class App extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        margin: 0;
        padding: 0;
        top: 0;
      }
    `;
  }

  static get properties() {
    return {
      route: { type: String },
      params: { type: Object },
      query: { type: Object }
    };
  }

  static get routes() {
    return [{
      name: 'home',
      pattern: '',
      data: { title: 'Home' }
    }, {
      name: 'Create session',
      pattern: 'session/:id'
    }, {
      name: 'user',
      pattern: 'user/:id'
    }, {
      name: 'not-found',
      pattern: '*'
    }];
  }

  constructor() {
    super();
    this.route = '';
    this.params = {};
    this.query = {};
  }

  router(route, params, query, data) {
    this.route = route;
    this.params = params;
    this.query = query;
    console.log(route, params, query, data);
  }

  render() {
    return html`
        <div>
          
         <main>
           <create-session-screen></create-session-screen>
         </main>
          
        </div>
      `
  }
}

// <app-link href="/">Home</app-link>
// <app-link href="/session/123">Session</app-link>
// <app-router active-route="${this.route}">
//   <h1 route="home"> home</h1>
//   <h1 route="session">Session ${this.params.id}</h1>
//   <h1 route='not-found'>Not Found </h1>
// </app-router>

// <main>
//   <create-session-screen></create-session-screen>
// </main>


window.customElements.define('app-root', App);
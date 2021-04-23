import LightDomRootBased from "../dom/light-dom-root-based";

export default class FormReadable extends LightDomRootBased {
  static get properties() {
    return {
      label: {type: String, attribute: false, reflect: true},
      name: {type: String, attribute: false, reflect: true},
    }
  }

  constructor() {
    super();
    this.name = '';
    this.label = '';
  }
}
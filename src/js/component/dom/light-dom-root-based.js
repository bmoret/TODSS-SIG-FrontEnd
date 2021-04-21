import {LitElement} from "lit-element";

export default class LightDomRootBased extends LitElement {
  createRenderRoot() {
    return this;
  }
}
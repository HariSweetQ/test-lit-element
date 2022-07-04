import { html, LitElement } from "lit-element";

export default class MainView extends LitElement {

  render() {
    return html`<div class="main-app">Mi cuerpo</div>`;
  }
}

window.customElements.define("main-view", MainView);
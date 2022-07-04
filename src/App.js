
import { CellsComponent, html } from "./core/interfaces/cells";
import "./views/main/Main";

class AppLit extends CellsComponent {

  subscription = null;

  createRenderRoot() {
    return this;
  }
  
  beforeMount() {
    this.log(`beforeMount: ${this.innerHTML}`);
  }

  mounted() {

    setTimeout(() => {
      this.ea.trigger("invent");
    }, 1000);    
  }

  connected() {
    this.log(`connected: ${this.innerHTML}`);
  }

  disconnected() {
    this.log(`disconnected: ${this.innerHTML}`);
  }

  addSubscriptions() {
    this.subscription = this.ea.subscribe("invent", () => {
      this.log("EVENTO INVENT"); 
      console.log(this.subscriptions);
    });    

    this.addSubscription(this.subscription);
  }

  renderData() {
    return html`
<main-view></main-view>
`
  }
}

window.customElements.define("app-lit", AppLit);
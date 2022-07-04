import { LitElement, html } from "lit-element";
import { clone, iD } from "../../utils";
import { eventEmitterSvc } from "../services/eventemitter";
import Debug from "./debug";
import Subscriptions from "./subscriptions";


/**
 * Cells component class
 * @description Extends LitElement functionality
 * @extends LitElement
 */
export class CellsComponent extends LitElement {  
  __mixins = [Subscriptions, Debug];
  mixins = [];
  ea = eventEmitterSvc;

  constructor() {
    super();           
    this.__beforeMount();
    this.setData();
    setTimeout(() => {
      this.__mounted();
    }, 0);
  } 

  /**
   * Triggers when instance is connected
   */
  connectedCallback() {
    super.connectedCallback();
    this.connected();
  }

  /**
   * Triggers when instance is disconnected
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    this.disconnected();
    this.removeSubscriptions();
    console.log(this.subscriptions);
  }

  /**
  * Load mixins array
  * @param {Array} mixins
  */
  loadMixins (mixins = []) {
    if (mixins.length > 0) {
      for (const mixin of mixins) {        
        this.loadMixin(mixin);
      }
    }
  }

  /**
 * Load mixin
 * @param {Object} mixin
 */
  loadMixin (mixin) {    
    for (const method of Object.getOwnPropertyNames(mixin.prototype)) {
      if (typeof (mixin.prototype[method]) === "function") {
        if (method !== "constructor" && !iD(this[method])) {
          this[method] = mixin.prototype[method].bind(this);
        } else if (method === "constructor") {
          let obj = new mixin.prototype[method];
          Object.keys(obj).forEach(key => {
            this[key] = clone(obj[key]);            
          });
          obj = null;
        }
      }
    }
  };

  /**
   * Lifecycle private method
   */
  __beforeMount() {
    this.loadMixins(this.__mixins);    
    this.beforeMount();
  }

  /**
   * Lifecycle private method
   * @private
   */
  __mounted() {
    this.loadMixins(this.mixins);
    this.mounted();
    this.addSubscriptions();
  }

  /** 
   * Lifecycle method. Triggers before mount
   */
  beforeMount() {}

  /**
   * Lifecycle method. Triggers when mounted
   */
  mounted() {}

  /**
   * Lifecycle method. Triggers when connected
   */
  connected() {}
  /**
   * Lifecycle method. Triggers when disconnected
   */
  disconnected() { }

  /**
   * Lifecycle method. Triggers after render
   */
  afterRender() {}
  /**
   * Set data
   */
  setData() {}

  /**
   * Render data
   */
  renderData() {}
  
  render() {
    return this.renderData();
  }

}

export { html }
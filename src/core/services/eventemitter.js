import { uuid } from "../../utils";

/**
 * Event emitter core service class
 *
 * @description Use as event emitter service to populate & subscribe events
 *
 * @author Jesús García
 * @version 0.1.0
 */

export class EventEmitterCoreService {
  events = [];
  /**
   * Trigger event
   * @param {String} event Event name
   * @param {Any} data Payload
   */
  trigger(event, data) {
    if (this.events[event]) {
      return this.events[event].forEach(subscription => {
        subscription.callback(data);
      });
    }
  }

  /**
   * Subscribe to event
   * @param {String} event Event name
   * @param {Function} callback Callback function
   */
  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    const id = uuid();
    const subscription = {
      id: id,
      event: event,
      callback: callback,
      dispose: () => this.dispose({ id: id, event: event })
    };

    this.events[event].push(subscription);

    return subscription;
  }

  /**
   * Dispose subscription
   * @param {Object} subscription Subscription
   */
  dispose(subscription) {
    const index = this.events[subscription.event].findIndex(sub => sub.id === subscription.id);
    this.events[subscription.event].splice(index, 1);
    if (!this.events[subscription.event].length) {
      delete this.events[subscription.event];
    }

    return true;
  }

  /**
   * Subscribe only one time
   * @param {String} event Event name
   * @param {Function} callback Callback function
   */
  subscribeOnce(event, callback) {
    const subscription = this.subscribe(event, data => {
      callback(data);
      this.dispose(subscription);
    });
  }
}

// Singleton instance
export const eventEmitterSvc = new EventEmitterCoreService();

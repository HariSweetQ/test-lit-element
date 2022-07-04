/**
 * Subscriptions class. 
 */
export default class Subscriptions {
 subscriptions = [];

  /**
     * Add subscriptions
     */
  addSubscriptions() { console.log("TURURU")}

  /**
   * Add subscription
   * @param {Object} subscription
   */
  addSubscription(subscription) {
    this.subscriptions.push(subscription);
  }

  /**
   * Remove subscription
   * @param {Object} subscription Subscription
   */
  removeSubscription(subscription) {
    const index = this.subscriptions.findIndex(sub => sub.id === subscription.id);
    subscription.dispose();
    this.subscriptions.splice(index, 1);
  }

  /**
   * Remove all subscriptions
   */
  removeSubscriptions(event = null) {
    const indexes = [];

    this.subscriptions.map((subscription, index) => {
      if (!event || subscription.event === event) {
        subscription.dispose();
        indexes.push(index);
      }
    });

    for (let i = indexes.length - 1; i >= 0; i--) {
      this.subscriptions.splice(indexes[i], 1);
    }
  }
}
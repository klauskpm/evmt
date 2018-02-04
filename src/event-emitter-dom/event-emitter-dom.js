export default class EventEmitterDOM {
  constructor () {
    this.subscriptions = []
  }

  /**
   * Emits the arguments to all subscribed callbacks
   *
   * @param args {any} A list of values to be emitted
   */
  emit (...args) {
    this.subscriptions.forEach(subscription => {
      subscription(...args)
    })
  }

  /**
   * Subscribes an callback to receive a future emit
   *
   * @param callback {Function} A function to handle the emitted event
   * @returns {Function}
   */
  subscribe (callback) {
    this.subscriptions.push(callback)

    return {
      remove: () => {
        const index = this.subscriptions.indexOf(callback)
        this.remove(index)
      }
    }
  }

  /**
   * Removes the subscribed callback
   *
   * @param index {Number} The subscription index to be removed
   */
  remove (index) {
    this.subscriptions.splice(index, 1)
  }
}

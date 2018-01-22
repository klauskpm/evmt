export class EventEmitterDOM {
    constructor() {
        this.subscriptions = [];
    }

    /**
     * Emits the arguments to all subscribed callbacks
     *
     * @param args {any} How many and of type you want
     */
    emit(...args) {
        this.subscriptions.forEach(subscription => {
            subscription(...args);
        });
    }

    /**
     * Subscribes an callback to receive a future emit
     *
     * @param callback {Function} A callback
     * @returns {Function}
     */
    subscribe(callback) {
        const subscription = callback;

        subscription.remove = () => {
            this.remove(this.subscriptions.indexOf(subscription));
        };

        this.subscriptions.push(subscription);

        return subscription;
    }

    /**
     * Removes the subscribed callback
     *
     * @param index {Integer} The callback/subscription index
     */
    remove(index) {
        this.subscriptions.splice(index, 1);
    }
}
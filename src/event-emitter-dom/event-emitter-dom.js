export class EventEmitterDOM {
    constructor() {
        this.subscriptions = {};
        this.count = 0;
    }

    emit(...args) {
        for (var subscription in this.subscriptions) {
            if (this.subscriptions.hasOwnProperty(subscription)) {
                this.subscriptions[subscription].apply(null, args);
            }
        }
    }

    subscribe(callback) {
        var index = this.count++;
        var subscriptions = this.subscriptions;
        var subscription = subscriptions[index] = callback;

        subscription.remove = function() {
            delete subscriptions[index];
        };

        return subscription;
    }
}
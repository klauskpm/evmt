export class EventEmitterDOM {
    constructor() {
        this.subscriptions = [];
    }

    emit(...args) {
        this.subscriptions.forEach(subscription => {
            subscription(...args);
        });
    }

    subscribe(callback) {
        const subscription = callback;

        subscription.remove = () => {
            this.remove(this.subscriptions.indexOf(subscription));
        };

        this.subscriptions.push(subscription);

        return subscription;
    }

    remove(index) {
        this.subscriptions.splice(index, 1);
    }
}
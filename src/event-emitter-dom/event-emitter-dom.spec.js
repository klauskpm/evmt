import { EventEmitterDOM } from './event-emitter-dom';

let onSelect,
    subscription1,
    subscription2,
    subscriptionValue1 = null,
    subscriptionValue2 = null;

const callbacks = {
    subscription1: (firstArg) => {
        subscriptionValue1 = firstArg;
    },
    subscription2: (firstArg, secondArg) => {
        subscriptionValue2 = {[secondArg]: firstArg};
    }
};

const select = (...args) => {
    onSelect.emit(...args);
};

describe('EventEmitter', () => {

    beforeEach(() => {
        onSelect = new EventEmitterDOM();
    });

    it('should be defined', () => {
        expect(EventEmitterDOM).toBeDefined();
    });

    it('should be instance of EventEmitterDOM', () => {
        expect(onSelect instanceof EventEmitterDOM).toBe(true);
        expect(onSelect.subscriptions.length).toBe(0);
    });

    it('should have a subscription', () => {
        onSelect.subscribe(() => {});

        expect(onSelect.subscriptions.length).toBe(1);
    });

    describe('after subscribing some callbacks', () => {
        beforeEach(() => {
            spyOn(callbacks, 'subscription1').and.callThrough();
            spyOn(callbacks, 'subscription2').and.callThrough();

            onSelect = new EventEmitterDOM();
            subscriptionValue1 = null;
            subscriptionValue2 = null;

            subscription1 = onSelect.subscribe(callbacks.subscription1);
            subscription2 = onSelect.subscribe(callbacks.subscription2);
        });

        it('should have subscriptions', () => {
            expect(onSelect.subscriptions.length).toBe(2);
        });

        it('should emit the subscribed callback', () => {
            const firstArg = 'hi';
            const secondArg = 'nail';

            select(firstArg, secondArg);

            expect(callbacks.subscription1).toHaveBeenCalled();
            expect(callbacks.subscription1).toHaveBeenCalledWith(firstArg, secondArg);
            expect(subscriptionValue1).toBe(firstArg);
            expect(callbacks.subscription2).toHaveBeenCalled();
            expect(callbacks.subscription2).toHaveBeenCalledWith(firstArg, secondArg);
            expect(JSON.stringify(subscriptionValue2)).toBe(JSON.stringify({[secondArg]: firstArg}));
        });

        it('should remove the subscriptions', () => {
            const firstArg = 127;

            spyOn(onSelect, 'remove').and.callThrough();

            subscription2.remove();
            select(firstArg);
            subscription1.remove();
            select(firstArg);

            expect(onSelect.remove).toHaveBeenCalledTimes(2);
            expect(callbacks.subscription1).toHaveBeenCalledTimes(1);
            expect(callbacks.subscription1).toHaveBeenCalledWith(firstArg);
            expect(onSelect.subscriptions.length).toBe(0);
        });
    });
});
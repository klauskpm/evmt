import { EventEmitterDOM } from './event-emitter-dom';

describe('EventEmitter', () => {
    let select,
        onSelect;

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
});
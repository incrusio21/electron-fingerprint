enum EventType {
    Listeners = '_listeners',
    OnceListeners = '_onceListeners',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Listener = (...args: any[]) => unknown | Promise<unknown>;

export default class Observable<T> {
    [key: string]: unknown | T;
    _isHot: Map<string, boolean>;
    _eventQueue: Map<string, unknown[]>;
    _listeners: Map<string, Listener[]>;
    _onceListeners: Map<string, Listener[]>;

    constructor() {
        this._map = new Map();
        this._isHot = new Map();
        this._eventQueue = new Map();
        this._listeners = new Map();
        this._onceListeners = new Map();
    }

    /**
    * Triggers the event's listener function.
    *
    * @param event : name of the event to be triggered.
    * @param params : params to pass to the listeners.
    * @param throttle : wait time before triggering the event.
    */
    async trigger(event: string, params?: unknown, throttle = 0) {
        let isHot = false;
        if (throttle > 0) {
            isHot = this._throttled(event, params, throttle);
            params = [params];
        }

        if (isHot) {
            return;
        }

        await this._executeTriggers(event, params);
    }

    _throttled(event: string, params: unknown, throttle: number) {
        /**
         * Throttled events execute after `throttle` ms, during this period
         * isHot is true, i.e it's going to execute.
         */
    
        if (!this._eventQueue.has(event)) {
            this._eventQueue.set(event, []);
        }
    
        if (this._isHot.get(event)) {
            this._eventQueue.get(event)!.push(params);
            return true;
        }
    
        this._isHot.set(event, true);
    
        setTimeout(() => {
            this._isHot.set(event, false);
        
            const params = this._eventQueue.get(event);
            if (params !== undefined) {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                this._executeTriggers(event, params);
                this._eventQueue.delete(event);
            }
        }, throttle);
    
        return false;
    }

    async _executeTriggers(event: string, params?: unknown) {
        await this._triggerEvent(EventType.Listeners, event, params);
        await this._triggerEvent(EventType.OnceListeners, event, params);
        this._onceListeners.delete(event);
    }

    async _triggerEvent(type: EventType, event: string, params?: unknown) {
        const listeners = this[type].get(event) ?? [];
        for (const listener of listeners) {
            await listener(params);
        }
    }
}
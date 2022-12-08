export class EventEmitter<EventName = string, EventParam = unknown>
	implements EventEmitter.EventEmitter<EventName, EventParam>
{
	private events: Map<EventName, EventEmitter.Listeners<EventParam>>;

	public constructor() {
		this.events = new Map<EventName, EventEmitter.Listeners<EventParam>>();
	}

	public on(
		event: EventName,
		listener: EventEmitter.Listener<EventParam>
	): EventEmitter.This<EventName, EventParam> | never {
		if (typeof listener !== "function") throw new TypeError("The listener must be a function");

		let listeners: EventEmitter.Listeners<EventParam> | undefined = this.events.get(event);

		if (!listeners) {
			listeners = new Set<EventEmitter.Listener<EventParam>>();
			this.events.set(event, listeners);
		}

		listeners?.add(listener);

		return this;
	}

	public off(): EventEmitter.This<EventName, EventParam>;
	public off(event?: EventName): EventEmitter.This<EventName, EventParam>;
	public off(
		event?: EventName,
		listener?: EventEmitter.Listener<EventParam>
	): EventEmitter.This<EventName, EventParam> {
		if (!event && !listener) {
			this.events.clear();
		} else if (event && !listener) {
			this.events.delete(event);
		} else {
			const listeners: EventEmitter.Listeners<EventParam> | undefined = this.events.get(
				event!
			);

			if (listeners) {
				listeners.delete(listener!);
			}
		}

		return this;
	}

	public emit(event: EventName, ...args: any[]): this {
		const listeners = this.events.get(event);

		if (listeners) {
			for (let listener of listeners) {
				listener.apply(this, args);
			}
		}

		return this;
	}
}

export namespace EventEmitter {
	export interface EventEmitter<EventName, EventParam> {
		on(event: EventName, listener: Listener<EventParam>): This<EventName, EventParam>;
		off(): This<EventName, EventParam>;
		off(event: EventName): This<EventName, EventParam>;
		off(event: EventName, listener: Listener<EventParam>): This<EventName, EventParam>;
		emit(event: EventName, ...args: any[]): This<EventName, EventParam>;
	}

	export type This<EventType, EventParam> = EventEmitter<EventType, EventParam>;
	export type Listener<EventParam> = (event: EventParam) => void;
	export type Listeners<EventParam> = Set<Listener<EventParam>>;
}

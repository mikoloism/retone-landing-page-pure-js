export class Iterator<T> {
	private constructor(private iterates: Array<T>) {}

	private [Symbol.iterator](): Iterator.TReturn<T> {
		const { iterates } = this;
		const minimum = 0;
		const maximum = iterates.length - 1;
		let index = -1;

		return {
			next(): Iterator.TResult<T> {
				index = Math.min(index + 1, maximum);
				return { value: iterates[index], done: index >= maximum };
			},

			prev(): Iterator.TResult<T> {
				index = Math.max(index - 1, minimum);
				return { value: iterates[index], done: index <= minimum };
			},
		};
	}

	public static createIterator<T = any>(
		iterates: Array<T>
	): Iterator.TReturn<T> {
		const iterator = new Iterator<T>(iterates);
		return iterator[Symbol.iterator]();
	}
}

export namespace Iterator {
	export type TReturn<T> = { next(): TResult<T>; prev(): TResult<T> };
	export type TResult<T> = { value: T; done: boolean };
}

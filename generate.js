class obj {
	static values = [];

	static [Symbol.iterator]() {
		const values = obj.values;
		const min = 0;
		const max = values.length - 1;
		let index = -1;

		return {
			next() {
				index = Math.min(index + 1, max);
				return { value: values[index], done: index >= max };
			},
			prev() {
				index = Math.max(index - 1, min);
				return { value: values[index], done: index <= min };
			},
		};
	}

	static iterate(values) {
		obj.values = values;
		return obj[Symbol.iterator]();
	}
}

const array = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];

var it = obj.iterate(array);

console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

console.log(it.prev());
console.log(it.prev());
console.log(it.prev());
console.log(it.prev());

console.log(it.next());
console.log(it.next());
console.log(it.next());

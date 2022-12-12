export { default as anime } from "animejs";

export const $: (s: any) => HTMLElement = document.querySelector;
export const $$ = document.querySelectorAll;

export function $var(name: string, value: any, element: HTMLElement): string {
	const $this: HTMLElement = element || document.querySelector("body");
	const _style: CSSStyleDeclaration = $this.style;
	let _name = `--${name}`;

	if (value !== undefined) {
		let _value: string = String(value);
		_style.setProperty(_name, _value);
	}

	return _style.getPropertyValue(_name);
}

export function ProxyFactory(element: HTMLElement, ...variablesNames: Array<string>): object {
	let variablesMap = {};

	variablesNames.forEach((variableName: string) => {
		Object.assign(variablesMap, {
			[variableName]: getComputedStyle(element).getPropertyValue(variableName),
		});
	});

	return new Proxy(variablesMap, {
		set(_targetObject: any, property: string, newValue: any) {
			element.style.setProperty(property, String(newValue));
			return true;
		},
	});
}

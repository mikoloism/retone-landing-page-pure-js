export { default as anime } from 'animejs';

export const $: (s: any) => HTMLElement = document.querySelector;
export const $$ = document.querySelectorAll;

export function $var(name: string, value: any, element: HTMLElement): string {
	const $this: HTMLElement = element || document.querySelector('body');
	const _style: CSSStyleDeclaration = $this.style;
	let _name = `--${name}`;

	if (value !== undefined) {
		let _value: string = String(value);
		_style.setProperty(_name, _value);
	}

	return _style.getPropertyValue(_name);
}

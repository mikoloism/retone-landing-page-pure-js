import React from 'react';
import styled from 'styled-components';

export function Hamburger(
	props: React.PropsWithChildren<{
		className?: string;
		onClick?: (event: React.MouseEvent) => void;
	}>
) {
	return (
		<Hamburger.Button
			type="button"
			className={props.className}
			onClick={props.onClick}>
			<Hamburger.Svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 32 32"
				height="32"
				width="32"
				fill="none"
				stroke="inherit"
				strokeWidth="4"
				strokeLinecap="round">
				{props.children}
			</Hamburger.Svg>
		</Hamburger.Button>
	);
}

export namespace Hamburger {
	export const Button = styled.button`
		border: 0;
		outline: 0;
		stroke: inherit;
		box-shadow: none;
		background: transparent;
		padding: 0;
		margin: 0;

		-webkit-tap-highlight-color: transparent;
		user-select: none;
		touch-action: auto;
		pointer-events: fill;
		cursor: pointer;

		width: var(--svg-height);
		height: var(--svg-height);
	`;

	export const Svg = styled.svg`
		display: inline-block;
		width: var(--svg-height);
		height: var(--svg-height);
	`;
}

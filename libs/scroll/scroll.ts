import React from 'react';

export function isInStart($ref: RefElement): boolean {
	return Math.ceil($ref.current.scrollTop) <= 0;
}

export function isInEnd($ref: RefElement): boolean {
	let $current = $ref.current;
	return (
		Math.ceil($current.scrollTop + $current.clientHeight) >=
		$current.scrollHeight
	);
}

type RefElement = React.MutableRefObject<HTMLElement>;

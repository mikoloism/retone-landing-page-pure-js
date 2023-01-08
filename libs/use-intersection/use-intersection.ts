import React from 'react';

export function useIntersection<T extends HTMLElement = any>(
	options?: ConstructorParameters<typeof IntersectionObserver>[1]
) {
	const [entry, setEntry] = React.useState<IntersectionObserverEntry | null>(
		null
	);

	const observer = React.useRef<IntersectionObserver>();

	const ref = React.useCallback(
		(element: T | null) => {
			if (observer.current) {
				observer.current.disconnect();
				observer.current = undefined;
			}

			if (element === null) {
				setEntry(null);
				return;
			}

			observer.current = new IntersectionObserver(([_entry]) => {
				setEntry(_entry);
			}, options);

			observer.current.observe(element);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[options?.rootMargin, options?.root, options?.threshold]
	);

	return { ref, entry };
}

import React from 'react';

enum Status {
	Hidden = 'sidebar-hidden',
	Visible = 'sidebar-visible',
}

const Context = React.createContext<Handler | null>(null);

function Provider(props: React.PropsWithChildren) {
	const [state, setState] = React.useState<Status>(Status.Hidden);
	const handler: Handler = createHandler({ state, setState });

	return (
		<Context.Provider value={handler}>{props.children}</Context.Provider>
	);
}

function createHandler(props: { state: Status; setState: Function }): Handler {
	return {
		toggle() {
			props.setState(() =>
				props.state === Status.Hidden ? Status.Visible : Status.Hidden
			);
		},

		visible() {
			props.setState(() => Status.Visible);
		},

		isVisible() {
			return props.state === Status.Visible;
		},

		hidden() {
			props.setState(() => Status.Hidden);
		},

		isHidden() {
			return props.state === Status.Hidden;
		},

		getStatus() {
			return props.state;
		},
	};
}

export function useContext(): Handler | null {
	return React.useContext(Context);
}

export default Context;
export { Provider, Status };
export interface Handler {
	toggle(): void;
	visible(): void;
	isVisible(): boolean;
	hidden(): void;
	isHidden(): boolean;
	getStatus(): Status;
}

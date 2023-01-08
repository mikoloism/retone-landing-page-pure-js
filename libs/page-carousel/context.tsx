import React from 'react';

enum Status {
	Enable = 'page-carousel-enable',
	Disable = 'page-carousel-disable',
}

const Context = React.createContext<Handler | null>(null);

function Provider(props: React.PropsWithChildren) {
	const [state, setState] = React.useState<Status>(Status.Enable);
	const handler: Handler = createHandler({ state, setState });

	return (
		<Context.Provider value={handler}>{props.children}</Context.Provider>
	);
}

function createHandler(props: { state: Status; setState: Function }): Handler {
	return {
		enable() {
			props.setState(() => Status.Enable);
		},

		disable() {
			props.setState(() => Status.Disable);
		},

		isEnabled() {
			return props.state === Status.Enable;
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
	isEnabled(): boolean;
	disable(): void;
	enable(): void;
	getStatus(): Status;
}

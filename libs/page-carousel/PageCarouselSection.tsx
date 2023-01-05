import React from 'react';
import styled from './page-carousel.module.scss';

export class SectionComponent extends React.Component<Props, State> {
	public constructor(props: Props) {
		super(props);
	}

	public render(): JSX.Element {
		return (
			<section className={styled.pc__section}>
				{this.props.children}
			</section>
		);
	}
}

type Props = React.PropsWithChildren<{}>;

type State = {};

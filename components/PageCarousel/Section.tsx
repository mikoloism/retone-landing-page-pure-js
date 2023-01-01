import { Component, PropsWithChildren } from 'react';
import styles from './page-carousel.module.scss';

export class SectionComponent extends Component<Props, State> {
	public constructor(props: Props) {
		super(props);
	}

	public render(): JSX.Element {
		return (
			<section className={styles.pc__section}>
				{this.props.children}
			</section>
		);
	}
}

type Props = PropsWithChildren<{}>;

type State = {};

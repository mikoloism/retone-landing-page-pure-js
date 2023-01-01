import classnames from 'classnames';
import styles from './page-carousel.module.scss';
import { Component, PropsWithChildren } from 'react';
import { SectionComponent } from './Section';

export class PageCarouselComponent extends Component<Props, State> {
	public constructor(props: Props) {
		super(props);
	}

	public render() {
		return (
			<div
				className={classnames(
					styles.pc__wrapper,
					this.props.className
				)}>
				{this.props.children}
			</div>
		);
	}
}

type Props = PropsWithChildren<{
	className?: string;
	sectionList?: Array<SectionComponent>;
}>;

type State = {};

import classnames from 'classnames';
import React from 'react';
import { SectionComponent } from './PageCarouselSection';
import { PageCarousel } from './page-carousel';
import styled from './page-carousel.module.scss';

export class PageCarouselComponent extends React.Component<Props, State> {
	private readonly pageCarousel: PageCarousel;

	public constructor(props: Props) {
		super(props);
		this.pageCarousel = new PageCarousel();
	}

	public componentDidMount(): void {
		this.pageCarousel.attachEvents();
	}

	public componentWillUnmount(): void {
		this.pageCarousel.detachEvents();
	}

	public render(): JSX.Element {
		return (
			<div
				className={classnames(
					styled.pc__wrapper,
					this.props.className
				)}>
				{this.props.children}
			</div>
		);
	}
}

type Props = React.PropsWithChildren<{
	className?: string;
	sectionList?: Array<SectionComponent>;
}>;

type State = {};

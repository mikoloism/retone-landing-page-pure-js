import classnames from 'classnames';
import { Variants, motion } from 'framer-motion';
import React from 'react';
import { PageCarousel } from './page-carousel';
import styled from './page-carousel.module.scss';

export class PageCarouselComponent extends React.Component<Props, State> {
	private readonly pageCarousel: PageCarousel;

	public constructor(props: Props) {
		super(props);
		this.pageCarousel = new PageCarousel({
			animationUpdater: this.updateAnimation.bind(this),
			animationList: props.animationList,
		});

		this.state = { currentAnimation: props.animationList[0] };
	}

	private updateAnimation(currentAnimation: string) {
		this.setState(() => ({ currentAnimation }));
	}

	public componentDidMount(): void {
		this.pageCarousel.attachEvents();
	}

	public componentWillUnmount(): void {
		this.pageCarousel.detachEvents();
	}

	private readonly MOTION_PROPS = {
		initial: { transform: 'translateY(-0vh)' },
		transition: { duration: 0.4 },
	};

	public render(): JSX.Element {
		const className = classnames(styled.pc_wrapper, this.props.className);

		return (
			<motion.div
				{...this.MOTION_PROPS}
				animate={this.state.currentAnimation}
				variants={this.props.variants}
				className={className}>
				{this.props.children}
			</motion.div>
		);
	}
}

type Props = React.PropsWithChildren<{
	className?: string;
	animationList: Array<string>;
	variants: Variants;
}>;

type State = { currentAnimation: string };

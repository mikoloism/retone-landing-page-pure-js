import classnames from 'classnames';
import { Variants, motion } from 'framer-motion';
import React from 'react';
import Context, { Handler } from './context';
import { PageCarousel } from './page-carousel';
import styled from './page-carousel.module.scss';

export class PageCarouselComponent extends React.Component<Props, State> {
	private readonly pageCarousel: PageCarousel;
	public static contextType = Context;
	private readonly animations: Array<string>;

	public constructor(props: Props) {
		super(props);

		this.animations = this.getKeysFromVariants(props.variants);

		this.pageCarousel = new PageCarousel({
			animationUpdater: this.updateAnimation.bind(this),
			animationList: this.animations,
		});

		this.state = { currentAnimation: this.animations[0] };
	}

	private getKeysFromVariants(variants: Variants): Array<string> {
		return Object.keys(variants);
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
		transition: { duration: 0.7 },
	};

	public render(): JSX.Element {
		const className = classnames(styled.pc_wrapper, this.props.className);
		const context: Handler = this.context as any;

		if (context.isEnabled()) PageCarousel.enable();
		else PageCarousel.disable();

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
	variants: Variants;
}>;

type State = { currentAnimation: string };

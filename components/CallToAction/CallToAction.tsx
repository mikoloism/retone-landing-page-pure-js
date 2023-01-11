import { useHover } from '@/libs/use-hover';
import { Variants, motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

export function CallToActionComponent(props: Props) {
	const { ref, hovered: isHovered } = useHover();
	let [iconState, setIconState] = React.useState<IconState>(
		IconState.Initial
	);

	React.useEffect(() => {
		if (isHovered) {
			setIconState(IconState.Hover);
		} else if (props.isMounted && !props.isShown) {
			props.toggleShown();
			setIconState(IconState.Mount);
		} else {
			setIconState(IconState.Initial);
		}
	}, [props.isMounted, props.isShown, isHovered]);

	return (
		<Link
			ref={ref as any}
			href={props.href ?? '/'}>
			{props.children ?? 'Discover'}

			<Icon state={iconState} />
		</Link>
	);
}

type Props = React.PropsWithChildren<{
	href?: string;
	isMounted?: boolean;
	isShown: boolean;
	toggleShown: Function;
}>;

const Link = styled.a`
	display: flex;
	height: 64px;
	width: fit-content;
	flex-direction: row;
	flex-wrap: wrap;
	place-content: center;
	place-items: center;
	column-gap: 1rem;
	text-decoration: none;
	color: white;
	background: transparent;
	font-size: 2.6rem;
`;

const Svg = styled.svg.attrs(() => ({
	xmlns: 'http://www.w3.org/2000/svg',
	viewBox: '0 0 24 24',
	height: '48',
	width: '48',
	fill: 'none',
	stroke: 'currentColor',
	strokeWidth: '2',
	strokeLinecap: 'round',
	duration: 0.4,
}))``;

const Line = styled(motion.line)``;

const variants: Record<string, Variants> = {
	line1: {
		initial: {
			x1: 4,
			y1: 4,
			x2: 20,
			y2: 4,
		},
		whenHover: {
			x1: [4, 28, -20, 4],
			y1: [4, -20, 28, 4],
			x2: [20, 44, -4, 20],
			y2: [4, -20, 28, 4],
		},
		whenMount: {
			x1: [-20, 4],
			y1: [28, 4],
			x2: [-4, 20],
			y2: [28, 4],
		},
	},

	line2: {
		initial: {
			x1: 20,
			y1: 4,
			x2: 20,
			y2: 20,
		},
		whenHover: {
			x1: [20, 44, -4, 20],
			y1: [4, -20, 28, 4],
			x2: [20, 44, -4, 20],
			y2: [20, -4, 44, 20],
		},
		whenMount: {
			x1: [-4, 20],
			y1: [28, 4],
			x2: [-4, 20],
			y2: [44, 20],
		},
	},

	line3: {
		initial: {
			x1: 4,
			y1: 20,
			x2: 20,
			y2: 4,
		},
		whenHover: {
			x1: [4, 28, -20, 4],
			y1: [20, -4, 44, 20],
			x2: [20, 44, -4, 20],
			y2: [4, -20, 28, 4],
		},
		whenMount: {
			x1: [-20, 4],
			y1: [44, 20],
			x2: [-4, 20],
			y2: [28, 4],
		},
	},
};

enum IconState {
	Hover = 'whenHover',
	Mount = 'whenMount',
	Initial = 'initial',
}

export function Icon(props: { state: IconState }) {
	return (
		<Svg>
			<Line
				x1="4"
				y1="4"
				x2="20"
				y2="4"
				initial="initial"
				animate={props.state}
				transition={{
					ease: 'linear',
					duration: 0.4,
					times: [0, 0.495, 0.496, 1],
				}}
				variants={variants.line1}></Line>

			<Line
				x1="20"
				y1="4"
				x2="20"
				y2="20"
				initial="initial"
				animate={props.state}
				transition={{
					ease: 'linear',
					duration: 0.4,
					times: [0, 0.495, 0.496, 1],
				}}
				variants={variants.line2}></Line>

			<Line
				x1="4"
				y1="20"
				x2="20"
				y2="4"
				initial="initial"
				animate={props.state}
				transition={{
					ease: 'linear',
					duration: 0.4,
					times: [0, 0.495, 0.496, 1],
				}}
				variants={variants.line3}></Line>
		</Svg>
	);
}

import { Variants, motion } from 'framer-motion';
import styled from 'styled-components';

const variants: Record<string, Variants> = {
	line1: {
		initial: { x1: 4, y1: 4, x2: 20, y2: 4 },
		whenMount: { x1: [-20, 4], y1: [28, 4], x2: [-4, 20], y2: [28, 4] },
		whenHover: {
			x1: [4, 28, -20, 4],
			y1: [4, -20, 28, 4],
			x2: [20, 44, -4, 20],
			y2: [4, -20, 28, 4],
		},
	},

	line2: {
		initial: { x1: 20, y1: 4, x2: 20, y2: 20 },
		whenMount: {
			x1: [-4, 20],
			y1: [28, 4],
			x2: [-4, 20],
			y2: [44, 20],
		},
		whenHover: {
			x1: [20, 44, -4, 20],
			y1: [4, -20, 28, 4],
			x2: [20, 44, -4, 20],
			y2: [20, -4, 44, 20],
		},
	},

	line3: {
		initial: { x1: 4, y1: 20, x2: 20, y2: 4 },
		whenMount: {
			x1: [-20, 4],
			y1: [44, 20],
			x2: [-4, 20],
			y2: [28, 4],
		},
		whenHover: {
			x1: [4, 28, -20, 4],
			y1: [20, -4, 44, 20],
			x2: [20, 44, -4, 20],
			y2: [4, -20, 28, 4],
		},
	},
};

export function Icon(props: Icon.Props): JSX.Element {
	return (
		<Icon.Svg>
			<Icon.Line
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
				variants={variants.line1}></Icon.Line>

			<Icon.Line
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
				variants={variants.line2}></Icon.Line>

			<Icon.Line
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
				variants={variants.line3}></Icon.Line>
		</Icon.Svg>
	);
}

export namespace Icon {
	export const Line = styled(motion.line)``;

	export const Svg = styled.svg.attrs(() => ({
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

	export enum State {
		Hover = 'whenHover',
		Mount = 'whenMount',
		Initial = 'initial',
	}

	export type Props = { state: Icon.State };
}

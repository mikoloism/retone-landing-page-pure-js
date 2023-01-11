import { PropsWithIntersection } from '@/libs/use-intersection/use-intersection';
import { Variants, motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { CallToAction } from '../CallToAction';
import { SplitText } from '../SplitText';
import { MediaSection } from './styled';

const variants: Variants = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 0.8,
	},
};

export function CoverComponent(props: Props): JSX.Element {
	const { ref, entry } = props.intersection!;
	const [isShown, setShown] = React.useState<boolean>(false);

	const toggleShown = React.useCallback(() => setShown(!isShown), []);

	React.useEffect(() => {
		setShown(false);
	}, [entry?.isIntersecting]);

	return (
		<Cover.Wrapper ref={ref}>
			<Cover.BackgroundColor
				initial="initial"
				animate={entry?.isIntersecting ? 'animate' : 'initial'}
				variants={variants}
			/>

			<Cover.Header>
				<Cover.Title>
					<SplitText play={entry?.isIntersecting}>
						retone HERO
					</SplitText>
				</Cover.Title>
				<Cover.SubTitle>
					<SplitText play={entry?.isIntersecting}>
						Super Security Door
					</SplitText>
				</Cover.SubTitle>

				<CallToAction
					isMounted={entry?.isIntersecting}
					toggleShown={toggleShown}
					isShown={isShown}>
					<SplitText play={entry?.isIntersecting}>DISCOVER</SplitText>
				</CallToAction>
			</Cover.Header>

			<Cover.BackgroundImage
				src="/assets/images/retone-HERO.png"
				alt="retone | model hero"
			/>
		</Cover.Wrapper>
	);
}

type Props = PropsWithIntersection;

namespace Cover {
	export const Wrapper = styled(MediaSection)``;

	export const Header = styled.header`
		display: flex;
		width: 100%;
		height: 100%;
		padding: 10%;

		flex-direction: column;
		place-content: center;
		place-items: center;

		color: white;
		z-index: 3;
	`;

	export const Title = styled.h2`
		font-size: 8rem;
		font-size: viewSize(8);
		line-height: 1.3;
	`;

	export const SubTitle = styled.p`
		display: block;
		font-size: 5.4rem;
		/* font-size: viewSize(5.4); */
		line-height: 1.3;
	`;

	export const BackgroundImage = styled.img`
		position: absolute;
		z-index: 1;
	`;

	export const BackgroundColor = styled(motion.div)`
		width: 100%;
		min-height: 100%;
		display: inline-block;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #000;

		z-index: 2;
	`;
}

import { PropsWithIntersection } from '@/libs/use-intersection';
import styled from 'styled-components';
import { CallToAction, useCallToAction } from '../CallToAction';
import { SplitText } from '../SplitText';
import { MediaSection } from './styled';

export function ExplodeComponent(props: Props): JSX.Element {
	const { ref, entry } = props.intersection!;
	const ctaProps = useCallToAction({ isMounted: entry?.isIntersecting });

	return (
		<Explode.Wrapper ref={ref}>
			<Explode.Header>
				<Explode.Title>
					<SplitText play={entry?.isIntersecting}>
						retone HERO
					</SplitText>
				</Explode.Title>
				<Explode.SubTitle>
					<SplitText play={entry?.isIntersecting}>Anatomy</SplitText>
				</Explode.SubTitle>

				<CallToAction {...ctaProps}>
					<SplitText play={entry?.isIntersecting}>DISCOVER</SplitText>
				</CallToAction>
			</Explode.Header>
			<Explode.BackgroundVideo
				poster="/assets/explode/poster.png"
				src="/assets/explode/video.mp4"
			/>
		</Explode.Wrapper>
	);
}

type Props = PropsWithIntersection;

namespace Explode {
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
		z-index: 2;
	`;

	export const Title = styled.h2`
		font-size: 8rem;
		font-size: viewSize(8);
		line-height: 1.3;
	`;

	export const SubTitle = styled.p`
		display: block;
		font-size: 5rem;
		font-size: viewSize(5.4);
		line-height: 1.3;
	`;

	export const BackgroundVideo = styled.video.attrs(() => ({
		preload: 'preload',
		playsInline: true,
		muted: true,
	}))`
		position: absolute;
		z-index: 1;
	`;
}

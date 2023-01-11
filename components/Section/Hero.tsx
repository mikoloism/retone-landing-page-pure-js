import { PropsWithIntersection } from '@/libs/use-intersection/use-intersection';
import styled from 'styled-components';
import { MediaSection } from './styled';

export function HeroComponent(_props: Props): JSX.Element {
	return (
		<Hero.Wrapper>
			<Hero.Header>
				<Hero.Title>
					<Hero.Line1>return</Hero.Line1>
					<Hero.Line2>home.</Hero.Line2>
				</Hero.Title>
			</Hero.Header>
			<Hero.BackgroundVideo src="/assets/retone.mp4" />
		</Hero.Wrapper>
	);
}

type Props = PropsWithIntersection;

namespace Hero {
	export const Wrapper = styled(MediaSection)``;

	export const Header = styled.header`
		display: flex;
		flex-direction: column;
		place-content: flex-end;
		place-items: flex-start;
		padding: 1.09375rem;
		position: absolute;
		top: 50%;
		left: 50%;
		width: viewWidth(100);
		width: 100%;
		height: viewHeight(100);
		height: 100%;
		transform: translate(-50%, -50%);
		overflow: hidden;
		z-index: 7;
	`;

	export const Title = styled.h1`
		display: flex;
		flex-direction: column;
		font-size: 8rem;
		color: white;
		row-gap: 1rem;
		margin-bottom: 1.09375rem;
	`;

	export const Line1 = styled.span`
		display: block;
	`;

	export const Line2 = styled.span`
		display: block;
	`;

	export const BackgroundVideo = styled.video.attrs(() => ({
		autoPlay: true,
		playsInline: true,
		preload: 'auto',
		muted: true,
		loop: true,
	}))``;
}

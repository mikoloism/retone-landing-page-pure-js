import { PropsWithIntersection } from '@/libs/use-intersection/use-intersection';
import styled from 'styled-components';
import { SplitText } from '../SplitText';
import { MediaSection } from './styled';

export function CoverComponent(props: Props): JSX.Element {
	const { ref, entry } = props.intersection!;

	return (
		<Cover.Wrapper ref={ref}>
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

		color: black;
		z-index: 2;
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
}

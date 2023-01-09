import { PropsWithIntersection } from '@/libs/use-intersection/use-intersection';
import styled from 'styled-components';
import { SplitText } from '../SplitText';
import { TextSection } from './styled';

export function StoryComponent(props: Props): JSX.Element {
	const { ref, entry } = props.intersection!;

	return (
		<Story.Wrapper ref={ref}>
			<Story.BackgroundColor />
			<Story.Header>
				<Story.Title>
					<SplitText play={entry?.isIntersecting}>
						retone HERO
					</SplitText>
				</Story.Title>
				<Story.SubTitle>
					<SplitText play={entry?.isIntersecting}>Story</SplitText>
				</Story.SubTitle>
			</Story.Header>
			<Story.BackgroundImage
				src="/assets/images/story.jpg"
				alt="retone-hero | story cover"
			/>
		</Story.Wrapper>
	);
}

type Props = PropsWithIntersection;

namespace Story {
	export const Wrapper = styled(TextSection)``;

	export const Header = styled.header`
		display: flex;
		min-width: 250px;
		width: 100%;
		padding: 0 10%;

		flex-direction: column;
		flex-wrap: wrap;

		place-items: center;
		justify-content: center;
		row-gap: 1rem;

		line-height: 1.35;

		z-index: 5;
	`;

	export const Title = styled.h2`
		color: white;
		font-size: 6rem;
		font-size: viewSize(6);
		font-size: viewSize(8);
		line-height: 1.3;
	`;

	export const SubTitle = styled.p`
		text-align: center;
		display: block;
		font-size: 5.4rem;
		font-size: viewSize(5.4);
		line-height: 1.3;
	`;

	export const BackgroundColor = styled.span`
		display: block;
		position: absolute;
		background: transparent;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 5;
	`;

	export const BackgroundImage = styled.img`
		height: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
	`;
}

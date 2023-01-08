import { PropsWithIntersection } from '@/libs/use-intersection/use-intersection';
import { SplitText } from '../SplitText';
import { Story } from './styled';

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

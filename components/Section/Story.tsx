import { SplitText } from '../SplitText';
import { Story } from './styled';

export function StoryComponent() {
	return (
		<Story.Wrapper>
			<Story.BackgroundColor />
			<Story.Header>
				<Story.Title>
					<SplitText>retone HERO</SplitText>
				</Story.Title>
				<Story.SubTitle>
					<SplitText>Story</SplitText>
				</Story.SubTitle>
			</Story.Header>
			<Story.BackgroundImage
				src="/assets/images/story.jpg"
				alt="retone-hero | story cover"
			/>
		</Story.Wrapper>
	);
}

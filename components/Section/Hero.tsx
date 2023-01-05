import { SplitText } from '../SplitText';
import { Hero } from './styled';

export function HeroComponent() {
	return (
		<Hero.Wrapper>
			<Hero.Header>
				<Hero.Title>
					<SplitText>return home.</SplitText>
				</Hero.Title>
			</Hero.Header>
			<Hero.BackgroundVideo src="/assets/retone.mp4" />
		</Hero.Wrapper>
	);
}

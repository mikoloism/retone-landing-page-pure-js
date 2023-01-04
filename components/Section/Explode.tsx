import { SplitText } from '../SplitText';
import { Explode } from './styled';

export function ExplodeComponent() {
	return (
		<Explode.Wrapper>
			<Explode.Header>
				<Explode.Title>
					<SplitText>retone HERO</SplitText>
				</Explode.Title>
				<Explode.SubTitle>
					<SplitText>Anatomy</SplitText>
				</Explode.SubTitle>
			</Explode.Header>
			<Explode.BackgroundVideo
				poster="/assets/images/explode.png"
				src="/assets/explode.mp4"
				preload="preload"
				playsInline
				muted
			/>
		</Explode.Wrapper>
	);
}

import { SplitText } from '../SplitText';
import { Cover } from './styled';

export function CoverComponent() {
	return (
		<Cover.Wrapper>
			<Cover.Header>
				<Cover.Title>
					<SplitText>retone HERO</SplitText>
				</Cover.Title>
				<Cover.SubTitle>
					<SplitText>Super Security Door</SplitText>
				</Cover.SubTitle>
			</Cover.Header>
			<Cover.BackgroundImage
				src="/assets/images/retone-HERO.png"
				alt="retone | model hero"
			/>
		</Cover.Wrapper>
	);
}

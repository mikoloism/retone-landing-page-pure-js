import { PropsWithIntersection } from '@/libs/use-intersection/use-intersection';
import { SplitText } from '../SplitText';
import { Cover } from './styled';

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

import { PropsWithIntersection } from '@/libs/use-intersection/use-intersection';
import { SplitText } from '../SplitText';
import { Explode } from './styled';

export function ExplodeComponent(props: Props): JSX.Element {
	const { ref, entry } = props.intersection!;

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
			</Explode.Header>
			<Explode.BackgroundVideo
				poster="/assets/explode/poster.png"
				src="/assets/explode/video.mp4"
			/>
		</Explode.Wrapper>
	);
}

type Props = PropsWithIntersection;

import { PropsWithIntersection } from '@/libs/use-intersection/use-intersection';
import { Hero } from './styled';

export function HeroComponent(props: Props): JSX.Element {
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

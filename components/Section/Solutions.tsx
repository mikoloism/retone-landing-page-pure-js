import { PropsWithIntersection } from '@/libs/use-intersection/use-intersection';
import { SplitText } from '../SplitText';
import { Solutions } from './styled';

export function SolutionsComponent(props: Props) {
	const { ref, entry } = props.intersection!;

	return (
		<Solutions.Wrapper>
			<Solutions.Header>
				<Solutions.Title>
					<SplitText play={entry?.isIntersecting}>
						our solutions
					</SplitText>
				</Solutions.Title>
				<Solutions.SubTitle>
					<SplitText play={entry?.isIntersecting}>
						How can natural resources be used to produce doors but
						with the least amount of land harvested?
					</SplitText>
				</Solutions.SubTitle>
			</Solutions.Header>
		</Solutions.Wrapper>
	);
}

type Props = PropsWithIntersection;

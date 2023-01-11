import { PropsWithIntersection } from '@/libs/use-intersection/use-intersection';
import styled from 'styled-components';
import { SplitText } from '../SplitText';
import { TextSection } from './styled';

export function SolutionsComponent(props: Props) {
	const { ref, entry } = props.intersection!;

	return (
		<Solutions.Wrapper ref={ref}>
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

namespace Solutions {
	export const Wrapper = styled(TextSection)`
		background-color: gray;
	`;

	export const Header = styled.header`
		display: flex;
		min-width: 250px;
		width: 100%;
		padding: 0 10%;
		flex-direction: column;
		flex-wrap: wrap;
		place-items: flex-start;
		justify-content: center;
		row-gap: 1rem;
		color: white;
		line-height: 1.35;
	`;

	export const Title = styled.h2`
		font-size: viewSize(3.3);
		font-size: 3.3rem;
	`;

	export const SubTitle = styled.strong`
		font-size: viewSize(6);
		font-size: 6rem;
	`;
}

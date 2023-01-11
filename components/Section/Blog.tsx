import { PropsWithIntersection } from '@/libs/use-intersection/use-intersection';
import styled from 'styled-components';
import { SplitText } from '../SplitText';
import { TextSection } from './styled';

export function BlogComponent(props: Props): JSX.Element {
	const { ref, entry } = props.intersection!;

	return (
		<Blog.Wrapper ref={ref}>
			<Blog.Header>
				<Blog.Title>
					<SplitText play={entry?.isIntersecting}>Blog</SplitText>
				</Blog.Title>

				<Blog.SubTitle>
					<SplitText play={entry?.isIntersecting}>
						Best Door In The World !!!
					</SplitText>
				</Blog.SubTitle>
			</Blog.Header>
		</Blog.Wrapper>
	);
}

type Props = PropsWithIntersection;

namespace Blog {
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
		color: black;
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

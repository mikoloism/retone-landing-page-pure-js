import { PropsWithIntersection } from '@/libs/use-intersection/use-intersection';
import { SplitText } from '../SplitText';
import { Blog } from './styled';

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
						Best Door In The World !!!Best Door In The World !!!
					</SplitText>
				</Blog.SubTitle>
			</Blog.Header>
		</Blog.Wrapper>
	);
}

type Props = PropsWithIntersection;

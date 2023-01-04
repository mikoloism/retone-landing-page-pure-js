import { SplitText } from '../SplitText';
import { Blog } from './styled';

export function BlogComponent() {
	return (
		<Blog.Wrapper>
			<Blog.Header>
				<Blog.Title>
					<SplitText>Blog</SplitText>
				</Blog.Title>

				<Blog.SubTitle>
					<SplitText>
						Best Door In The World !!!Best Door In The World !!!
					</SplitText>
				</Blog.SubTitle>
			</Blog.Header>
		</Blog.Wrapper>
	);
}

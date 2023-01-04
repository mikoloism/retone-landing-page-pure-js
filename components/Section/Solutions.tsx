import { SplitText } from '../SplitText';
import { Solutions } from './styled';

export function SolutionsComponent() {
	return (
		<Solutions.Wrapper>
			<Solutions.Header>
				<Solutions.Title>
					<SplitText>our solutions</SplitText>
				</Solutions.Title>
				<Solutions.SubTitle>
					<SplitText>
						How can natural resources be used to produce doors but
						with the least amount of land harvested?
					</SplitText>
				</Solutions.SubTitle>
			</Solutions.Header>
		</Solutions.Wrapper>
	);
}

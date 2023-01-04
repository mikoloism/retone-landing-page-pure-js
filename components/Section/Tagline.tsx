import { Tagline } from './styled';

export function TaglineComponent() {
	return (
		<Tagline.Wrapper>
			<Tagline.Video
				poster="/assets/images/tagline.jpg"
				src="/assets/tagline.mp4"
				controls
			/>
		</Tagline.Wrapper>
	);
}

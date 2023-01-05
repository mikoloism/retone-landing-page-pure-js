import { Tagline } from './styled';

export function TaglineComponent() {
	return (
		<Tagline.Wrapper>
			<Tagline.Video
				poster="/assets/tagline/poster.jpg"
				src="/assets/tagline/video.mp4"
				controls
			/>
		</Tagline.Wrapper>
	);
}

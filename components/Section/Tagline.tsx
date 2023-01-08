import { PropsWithIntersection } from '@/libs/use-intersection/use-intersection';
import { Tagline } from './styled';

export function TaglineComponent(_props: Props): JSX.Element {
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

type Props = PropsWithIntersection;

import { PropsWithIntersection } from '@/libs/use-intersection/use-intersection';
import styled from 'styled-components';
import { MediaSection } from './styled';

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

namespace Tagline {
	export const Video = styled.video`
		position: absolute;
		z-index: 1;
	`;

	export const Wrapper = styled(MediaSection)`
		& ${Tagline.Video} {
			/* width: viewWidth(100); */
			/* height: viewHeight(100); */
			width: 100vw;
			height: 100vh;
			object-fit: cover;
		}
	`;
}

import { useContext as usePageCarouselContext } from '@/libs/page-carousel';
import { useFullscreen } from '@/libs/use-fullscreen';
import { PropsWithIntersection } from '@/libs/use-intersection';
import React from 'react';
import styled from 'styled-components';
import { MediaSection } from './styled';

export function TaglineComponent(_props: Props): JSX.Element {
	return (
		<Tagline.Wrapper>
			<TaglineVideo />
		</Tagline.Wrapper>
	);
}

type Props = PropsWithIntersection;

namespace Tagline {
	export const Video = styled.video<{ $isFullscreen: boolean }>`
		position: absolute;
		z-index: 1;
		object-fit: ${(props) => (props.$isFullscreen ? 'contain' : 'cover')};
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

function TaglineVideo() {
	const videoRef = React.useRef<HTMLVideoElement>(null);
	const pageCarousel = usePageCarouselContext();
	const { ref, isFullscreen, enterFullscreen, exitFullscreen } =
		useFullscreen({
			onEnter() {
				pageCarousel?.disable();
			},

			onExit() {
				if (!videoRef.current) return;

				if (isVideoPlaying(videoRef)) {
					videoRef.current?.pause();
					videoRef.current.currentTime = 0;
					pageCarousel?.enable();
				}
			},
		});

	const handlePlaying = () => {
		if (isFullscreen) return;

		enterFullscreen();
	};

	const handlePause = () => {
		if (!isFullscreen) return;

		exitFullscreen().then(() => {
			if (isVideoPlaying(videoRef)) {
				videoRef.current?.pause();
				videoRef.current!.currentTime = 0;
				pageCarousel?.enable();
			}
		});
	};

	React.useEffect(() => {
		ref(videoRef.current);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [videoRef.current]);

	return (
		<Tagline.Video
			ref={videoRef}
			$isFullscreen={isFullscreen}
			onPlay={handlePlaying}
			onPause={handlePause}
			poster="/assets/tagline/poster.jpg"
			src="/assets/tagline/video.mp4"
			controls
		/>
	);
}

function isVideoPlaying(video: React.RefObject<HTMLVideoElement>): boolean {
	if (!video.current) return false;
	return !!(
		video.current.currentTime > 0 &&
		!video.current.paused &&
		!video.current.ended &&
		video.current.readyState > 2
	);
}

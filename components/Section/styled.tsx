import styled from 'styled-components';

// function ViewSizeHandler(_event: UIEvent | Event): void {}

// if (window) {
// 	window.addEventListener('orientationchange', ViewSizeHandler);
// 	window.addEventListener('resize', ViewSizeHandler);
// }

const BaseSection = styled.section`
	position: relative;
	width: 100%;
	/* height: viewHeight(100); */
	height: 100vh;
	overflow: hidden;

	display: flex;
	flex-wrap: wrap;
	place-items: center;
	place-content: center;
`;

// solutions, blog, story
const TextSection = styled(BaseSection)`
	flex-direction: column;
	background: linear-gradient(225deg, gray, rgba(black, 50%));
`;

// hero, cover, tagline, explode
const MediaSection = styled(BaseSection)`
	flex-direction: row;

	& img,
	& video {
		height: 100%;
	}
`;

export namespace Hero {
	export const Wrapper = styled(MediaSection)``;

	export const Header = styled.header`
		display: flex;

		flex-direction: column;
		place-content: flex-end;
		place-items: flex-start;
		padding: 1.09375rem;

		position: absolute;
		top: 50%;
		left: 50%;
		width: viewWidth(100);
		height: viewHeight(100);
		transform: translate(-50%, -50%);
		overflow: hidden;
		z-index: 7;
	`;

	export const Title = styled.h1`
		display: flex;
		flex-wrap: wrap;
		/* height: viewSize(12); */
		color: white;
		row-gap: 1rem;
		margin-bottom: 1.09375rem;
	`;

	export const BackgroundVideo = styled.video.attrs(() => ({
		autoPlay: true,
		playsInline: true,
		preload: 'auto',
		muted: true,
		loop: true,
	}))``;
}

export namespace Cover {
	export const Wrapper = styled(MediaSection)``;

	export const Header = styled.header`
		display: flex;
		width: 100%;
		height: 100%;
		padding: 10%;

		flex-direction: column;
		place-content: center;
		place-items: center;

		color: black;
	`;

	export const Title = styled.h2`
		font-size: viewSize(8);
		line-height: 1.3;
	`;

	export const SubTitle = styled.p`
		display: block;
		/* font-size: viewSize(5.4); */
		line-height: 1.3;
	`;

	export const BackgroundImage = styled.img`
		position: absolute;
		z-index: 1;
	`;
}

export namespace Explode {
	export const Wrapper = styled(MediaSection)``;

	export const Header = styled.header`
		display: flex;
		width: 100%;
		height: 100%;
		padding: 10%;

		flex-direction: column;
		place-content: center;
		place-items: center;

		color: black;
	`;

	export const Title = styled.h2`
		font-size: viewSize(8);
		line-height: 1.3;
	`;

	export const SubTitle = styled.p`
		display: block;
		/* font-size: viewSize(5.4); */
		line-height: 1.3;
	`;

	export const BackgroundVideo = styled.video.attrs(() => ({
		preload: 'preload',
		playsInline: true,
		muted: true,
	}))`
		position: absolute;
		z-index: 1;
	`;
}

export namespace Tagline {
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

export namespace Solutions {
	export const Wrapper = styled(TextSection)``;

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

		line-height: 1.35;
	`;

	export const Title = styled.h2`
		font-size: viewSize(3.3);
	`;

	export const SubTitle = styled.p`
		font-size: viewSize(6);
	`;
}

export namespace Story {
	export const Wrapper = styled(TextSection)``;

	export const Header = styled.header`
		display: flex;
		min-width: 250px;
		width: 100%;
		padding: 0 10%;

		flex-direction: column;
		flex-wrap: wrap;

		place-items: center;
		justify-content: center;
		row-gap: 1rem;

		line-height: 1.35;

		z-index: 5;
	`;

	export const Title = styled.h2`
		color: white;
		font-size: viewSize(6);

		font-size: viewSize(8);
		line-height: 1.3;
	`;

	export const SubTitle = styled.p`
		text-align: center;
		display: block;
		font-size: viewSize(5.4);
		line-height: 1.3;
	`;

	export const BackgroundColor = styled.span`
		display: block;
		position: absolute;
		background: transparent;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 5;
	`;

	export const BackgroundImage = styled.img`
		height: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	`;
}

export namespace Blog {
	export const Wrapper = styled(TextSection)``;

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

		line-height: 1.35;
	`;

	export const Title = styled.h2`
		font-size: viewSize(3.3);
	`;

	export const SubTitle = styled.p`
		font-size: viewSize(6);
	`;
}

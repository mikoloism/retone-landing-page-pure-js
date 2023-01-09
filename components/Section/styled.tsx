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
export const TextSection = styled(BaseSection)`
	flex-direction: column;
	background: linear-gradient(225deg, gray, rgba(black, 50%));
`;

// hero, cover, tagline, explode
export const MediaSection = styled(BaseSection)`
	flex-direction: row;

	& img,
	& video {
		height: 100%;
	}
`;

import { Footer } from '@/components/Footer';
import * as Section from '@/components/Section';
import { PageCarousel } from '@/libs/page-carousel';
import { useIntersection } from '@/libs/use-intersection';
import { Variant } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

const App = styled.div`
	width: 100%;
	height: 100vh;
	max-height: 99.9999vh;
	overflow: hidden;
`;

const variants: Record<string, Variant> = {
	hero: { transform: 'translateY(-0vh)' },
	cover: { transform: 'translateY(-100vh)' },
	explode: { transform: 'translateY(-200vh)' },
	tagline: { transform: 'translateY(-300vh)' },
	solutions: { transform: 'translateY(-400vh)' },
	story: { transform: 'translateY(-500vh)' },
	blog: { transform: 'translateY(-600vh)' },
};

export default function LandingPage() {
	const containerRef = React.useRef<HTMLDivElement>(null);

	const $hero = useIntersection({
		root: containerRef.current,
		threshold: 1,
	});
	const $cover = useIntersection({
		root: containerRef.current,
		threshold: 1,
	});
	const $explode = useIntersection({
		root: containerRef.current,
		threshold: 1,
	});
	const $tagline = useIntersection({
		root: containerRef.current,
		threshold: 1,
	});
	const $solutions = useIntersection({
		root: containerRef.current,
		threshold: 1,
	});
	const $story = useIntersection({
		root: containerRef.current,
		threshold: 1,
	});
	const $blog = useIntersection({ root: containerRef.current, threshold: 1 });

	return (
		<App ref={containerRef}>
			<PageCarousel variants={variants}>
				<Section.Hero intersection={$hero} />
				<Section.Cover intersection={$cover} />
				<Section.Explode intersection={$explode} />
				<Section.Tagline intersection={$tagline} />
				<Section.Solutions intersection={$solutions} />
				<Section.Story intersection={$story} />
				<Section.Blog intersection={$blog} />
				<Footer />
			</PageCarousel>
		</App>
	);
}

export async function getStaticProps() {
	return { props: {} };
}

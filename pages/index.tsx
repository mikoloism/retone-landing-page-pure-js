import { Footer } from '@/components/Footer';
import * as Section from '@/components/Section';
import { Header, Sidebar } from '@/components/index';
import { PageCarousel } from '@/libs/page-carousel';
import { Variant } from 'framer-motion';
import styled from 'styled-components';

const App = styled.div`
	width: 100%;
	height: 100vh;
	max-height: 98vh;
	overflow: hidden;
`;

const variants: Record<string, Variant> = {
	startup: { opacity: 1 },
	hero: { transform: 'translateY(-0vh)' },
	cover: { transform: 'translateY(-100vh)' },
	explode: { transform: 'translateY(-200vh)' },
	tagline: { transform: 'translateY(-300vh)' },
	solutions: { transform: 'translateY(-400vh)' },
	story: { transform: 'translateY(-500vh)' },
	blog: { transform: 'translateY(-700vh)' },
};

const sectionList: string[] = [
	'hero',
	'cover',
	'explode',
	'tagline',
	'solutions',
	'story',
	'blog',
];

export default function LandingPage() {
	return (
		<>
			<Header isOverlay={false} />
			<Sidebar isOpen={false} />

			<App>
				<PageCarousel
					variants={variants}
					animationList={sectionList}>
					<Section.Hero />
					<Section.Cover />
					<Section.Explode />
					<Section.Tagline />
					<Section.Solutions />
					<Section.Story />
					<Section.Blog />
					<Footer />
				</PageCarousel>
			</App>
		</>
	);
}

export async function getStaticProps() {
	return { props: {} };
}

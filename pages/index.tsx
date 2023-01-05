import { Footer } from '@/components/Footer';
import * as Section from '@/components/Section';
import { Header, Sidebar } from '@/components/index';
import { PageCarousel } from '@/libs/page-carousel';

export default function LandingPage() {
	return (
		<>
			<Header isOverlay={false} />
			<Sidebar isOpen={false} />

			<PageCarousel>
				<Section.Hero />
				<Section.Cover />
				<Section.Explode />
				<Section.Tagline />
				<Section.Solutions />
				<Section.Story />
				<Section.Blog />
				<Footer />
			</PageCarousel>
		</>
	);
}

export async function getStaticProps() {
	return { props: {} };
}

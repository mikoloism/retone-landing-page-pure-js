import { Footer } from '@/components/Footer';
import PageCarousel from '@/components/PageCarousel';
import * as Section from '@/components/Section';
import { Header, Sidebar } from '@/components/index';

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

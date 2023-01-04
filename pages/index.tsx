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

function Footer() {
	return (
		<footer
			id="fs-section-9"
			data-full-section="9"
			className="footer">
			<section className="footer__about about">
				<section className="about__inner">
					<header className="about__header">
						<h3 className="about__title">About Retone</h3>
					</header>
					<p className="about__paragraph">
						In order to reduce deforestation and reach the
						potentials of the door manufacturing industry, the
						objective of our brand is to fulfill the needs of man
						while considering the rights of nature...
						{/* <a
									className="about__link"
									href="/about">
									read more
								</a> */}
					</p>
				</section>
			</section>

			<section className="footer__navigation navigation">
				{/* <div className="navigation__inner">
							<header className="navigation__header">
								<h3 className="navigation__title">
									Navigation
								</h3>
							</header>

							<nav className="navigation__wrapper">
								<ul className="navigation__list">
									<li className="navigation__item">
										<a
											href="/v0.2/anatomy"
											className="navigation__link">
											<span className="navigation__text">
												Retone Hero Anatomy
											</span>
										</a>
									</li>
									<li className="navigation__item">
										<link
											href="/"
											className="navigation__link">
											<span className="navigation__text">
												Retone Hero Plus
											</span>
										</link>
									</li>
									<li className="navigation__item">
										<a
											href="/about/index.html"
											className="navigation__link">
											<span className="navigation__text">
												About Retone
											</span>
										</a>
									</li>

									<li className="navigation__item">
										<a
											href="/solutions/index.html"
											className="navigation__link">
											<span className="navigation__text">
												Solutions
											</span>
										</a>
									</li>

									<li className="navigation__item">
										<a
											href="/story/index.html"
											className="navigation__link">
											<span className="navigation__text">
												Retone Hero Story
											</span>
										</a>
									</li>

									<li className="navigation__item">
										<a
											href="/blog/index.html"
											className="navigation__link">
											<span className="navigation__text">
												Blog
											</span>
										</a>
									</li>

									<li className="navigation__item">
										<a
											href="/concat/"
											className="navigation__link">
											<span className="navigation__text">
												Contacts
											</span>
										</a>
									</li>

									<li className="navigation__item">
										<a
											href="/concat/"
											className="navigation__link">
											<span className="navigation__text">
												Ordering
											</span>
										</a>
									</li>
								</ul>
							</nav>
						</div> */}
			</section>

			<section className="footer__socials socials">
				<div className="socials__inner">
					<header className="socials__header">
						<h3 className="socials__title">Follow Us</h3>
					</header>

					<div className="socials__links">
						<a
							href="#"
							className="socials__link">
							<span className="socials__text">YouTube</span>
						</a>

						<a
							href="#"
							className="socials__link">
							<span className="socials__text">Twitter</span>
						</a>

						<a
							href="#"
							className="socials__link">
							<span className="socials__text">Linkedin</span>
						</a>

						<a
							href="#"
							className="socials__link">
							<span className="socials__text">Instagram</span>
						</a>

						<a
							href="#"
							className="socials__link">
							<span className="socials__text">Pinterest</span>
						</a>
					</div>
				</div>
			</section>
		</footer>
	);
}

export async function getStaticProps() {
	return { props: {} };
}

import { About, Footer, Navigation, Socials } from './styled';

export function FooterComponent(): JSX.Element {
	return (
		<Footer>
			<AboutComponent />
			<NavigationComponent />
			<SocialsComponent />
		</Footer>
	);
}

function AboutComponent(): JSX.Element {
	return (
		<About.Wrapper>
			<About.Inner>
				<About.Header>
					<About.Title>About Retone</About.Title>
				</About.Header>
				<About.Paragraph>
					In order to reduce deforestation and reach the potentials of
					the door manufacturing industry, the objective of our brand
					is to fulfill the needs of man while considering the rights
					of nature...
					{/* <About.ReadMore /> */}
				</About.Paragraph>
			</About.Inner>
		</About.Wrapper>
	);
}

function SocialsComponent(): JSX.Element {
	return (
		<Socials.Wrapper>
			<Socials.Header>
				<Socials.HeaderInner>
					<Socials.Title>Follow Us</Socials.Title>
				</Socials.HeaderInner>
			</Socials.Header>

			<Socials.LinkList
				items={[
					{ href: '#', text: 'YouTube' },
					{ href: '#', text: 'Twitter' },
					{ href: '#', text: 'LinkedIn' },
					{ href: '#', text: 'Instagram' },
					{ href: '#', text: 'Pinterest' },
				]}
			/>
		</Socials.Wrapper>
	);
}

function NavigationComponent(): JSX.Element {
	const navigationItems = [
		{ href: '/v0.2/anatomy', text: 'Retone Hero Anatomy' },
		{ href: '/', text: 'Retone Hero Plus' },
		{ href: '/about', text: 'About Retone' },
		{ href: '/solutions', text: 'Solutions' },
		{ href: '/story', text: 'Retone Hero Story' },
		{ href: '/blog', text: 'Blog' },
		{ href: '/', text: 'Contacts' },
		{ href: '/', text: 'Ordering' },
	];

	return (
		<Navigation.Wrapper>
			<Navigation.Inner>
				<Navigation.Header>
					<Navigation.Title>Navigation</Navigation.Title>
				</Navigation.Header>

				<Navigation.Navigation navigationItems={navigationItems} />
			</Navigation.Inner>
		</Navigation.Wrapper>
	);
}

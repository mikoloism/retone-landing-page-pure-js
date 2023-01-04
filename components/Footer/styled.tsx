import React from 'react';
import styled from 'styled-components';

export const Footer = styled.footer``;

export namespace About {
	export const Wrapper = styled.section``;

	export const Inner = styled.section``;

	export const Header = styled.header``;

	export const Title = styled.h3``;

	export const Paragraph = styled.p``;

	export const ReadMore = styled.a``;
}

export namespace Socials {
	export const Wrapper = styled.section``;

	export const Header = styled.div``;

	export const HeaderInner = styled.header``;

	export const Title = styled.h3``;

	export function LinkList(props: Link.ListProps) {
		return (
			<Link.List>
				{React.Children.toArray(
					props.items.map((link: Link.ItemProps) => (
						<LinkItem
							href={link.href}
							text={link.text}
						/>
					))
				)}
			</Link.List>
		);
	}

	export function LinkItem(props: { href: string; text: string }) {
		return (
			<Link.Item href={props.href}>
				<Link.Text>{props.text}</Link.Text>
			</Link.Item>
		);
	}

	export namespace Link {
		export const List = styled.div``;

		export const Item = styled.a``;

		export const Text = styled.span``;

		export type ListProps = { items: Array<Link.ItemProps> };
		export type ItemProps = { href: string; text: string };
	}
}

export namespace Navigation {
	export const Wrapper = styled.section``;

	export const Inner = styled.div``;

	export const Header = styled.header``;

	export const Title = styled.h3``;

	export function Navigation(props: Props): JSX.Element {
		return (
			<Styled.Navigation>
				<Styled.List>
					{React.Children.toArray(
						props.navigationItems.map((item) => (
							<Styled.Item>
								<Styled.Link href={item.href}>
									<Styled.Text>{item.text}</Styled.Text>
								</Styled.Link>
							</Styled.Item>
						))
					)}
				</Styled.List>
			</Styled.Navigation>
		);
	}

	namespace Styled {
		export const Navigation = styled.nav``;

		export const List = styled.ul``;

		export const Item = styled.li``;

		export const Link = styled.a``;

		export const Text = styled.span``;
	}

	type Props = {
		navigationItems: Array<{ href: string; text: string }>;
	};
}

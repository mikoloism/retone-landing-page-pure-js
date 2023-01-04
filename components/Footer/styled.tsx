import React from 'react';
import styled from 'styled-components';

export const Footer = styled.footer`
	display: flex;
	width: 100%;
	height: calc((var(--view-height, 1vh) * 100) - 64px);
	flex-direction: column;
	overflow: hidden;
	overflow-y: auto;

	/* @include use-tablet(640px) {
		height: unset !important;
		flex-direction: row;
		overflow: unset;
	} */
`;

const BaseInner = styled.section`
	display: flex;
	width: 100%;
	height: 100%;
	padding: 5% 10%;
	flex-direction: column;
	line-height: 1.6;
`;

const BaseHeader = styled.header`
	display: block;
`;

const BaseTitle = styled.h3`
	display: block;
	font-size: 1.6rem;
`;

export namespace About {
	export const Wrapper = styled.section`
		width: 100%;
		height: max-content;

		/* @include use-tablet(640px) {
			width: 40%;
			height: 100%;
		} */
	`;

	export const Inner = styled(BaseInner)``;
	export const Header = styled(BaseHeader)``;
	export const Title = styled(BaseTitle)``;

	export const Paragraph = styled.p`
		display: block;
		font-size: 1.2rem;
		padding: 1.5rem 0;
		overflow: hidden;
		overflow-y: hidden;
	`;

	export const ReadMore = styled.a`
		color: inherit;
		transition: 0.3s ease all;
		padding: 0 6px;
	`;
}

export namespace Socials {
	export const Header = styled(BaseInner)``;
	export const HeaderInner = styled(BaseHeader)``;
	export const Title = styled(BaseTitle)``;

	export const Wrapper = styled.section`
		width: 100%;
		height: 100%;

		/* @include use-tablet(640px) {
			width: 30%;
		} */
	`;

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
		export const List = styled.div`
			display: inline-block;
			width: 100%;
			max-height: 100%;

			overflow: hidden;
			overflow-y: visible;
		`;

		export const Item = styled.a`
			display: flex;
			width: 100%;
			height: 2.5rem;

			font-size: 1.2rem;
			line-height: 2rem;

			padding: 1rem 0;

			place-items: center;
			place-content: flex-start;

			color: inherit;
			user-select: none;
			touch-action: auto;
			pointer-events: fill;
			cursor: pointer;
			text-decoration: none;
		`;

		export const Text = styled.span`
			display: inline-block;
			text-transform: capitalize;
		`;

		export type ListProps = { items: Array<Link.ItemProps> };
		export type ItemProps = { href: string; text: string };
	}
}

export namespace Navigation {
	export const Inner = styled(BaseInner)``;
	export const Header = styled(BaseHeader)``;
	export const Title = styled(BaseTitle)``;

	export const Wrapper = styled.section`
		width: 100%;
		height: max-content;

		/* @include use-tablet(640px) {
			width: 30%;
			height: 100%;
		} */
	`;

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
		export const Navigation = styled.nav`
			display: inline-flex;
			width: 100%;

			place-items: center;
			place-content: center;
		`;

		export const List = styled.ul`
			list-style: none;

			display: inline-block;
			width: 100%;
			max-height: 100%;

			overflow: hidden;
			overflow-y: auto;

			/* @include use-tablet(640px) {
				overflow: unset;
			} */
		`;

		export const Item = styled.li`
			display: flex;
			width: 100%;
			height: 2.5rem;

			font-size: 1.2rem;
			line-height: 2rem;

			place-items: center;
			place-content: center;
		`;

		export const Link = styled.a`
			display: flex;
			width: 100%;
			height: 100%;

			padding: 1rem 0;

			place-items: center;
			place-content: flex-start;

			color: inherit;
			user-select: none;
			touch-action: auto;
			pointer-events: fill;
			cursor: pointer;
			text-decoration: none;
		`;

		export const Text = styled.span`
			display: inline-block;
		`;
	}

	type Props = {
		navigationItems: Array<{ href: string; text: string }>;
	};
}

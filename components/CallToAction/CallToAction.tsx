import React from 'react';
import styled from 'styled-components';
import { Icon } from './Icon';
import { useComputeIconState as useIconState } from './hooks';

export function CallToActionComponent({ href, children, ...props }: Props) {
	const { ref, iconState } = useIconState(props);

	return (
		<Link
			ref={ref as any}
			href={href ?? '/'}>
			{children ?? 'Discover'}

			<Icon state={iconState} />
		</Link>
	);
}

type Props = React.PropsWithChildren<{
	href?: string;
	isMounted?: boolean;
	isShown: boolean;
	toggleShown: Function;
}>;

const Link = styled.a`
	display: flex;
	height: 64px;
	width: fit-content;
	flex-direction: row;
	flex-wrap: wrap;
	place-content: center;
	place-items: center;
	column-gap: 1rem;
	text-decoration: none;
	color: white;
	background: transparent;
	font-size: 2.6rem;
`;

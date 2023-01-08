import { useContext as usePageCarouselContext } from '@/libs/page-carousel';
import classnames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { useContext as useSidebarContext } from '../Sidebar/context';
import styles from './header.module.scss';
import { Variants, motion } from 'framer-motion';
import { Hamburger } from './styled';

const styled: Record<string, string> = {
	header: styles.header,
	brand: classnames(styles.header__brand, styles.brand),
	brand__link: classnames(styles.brand__link),
	brand__logo: classnames(styles.brand__logo),
	hamburger: classnames(styles.header__hamburger, styles.hamburger),
	hamburger__icon: classnames(styles.hamburger__icon),
};

const variants: Record<string, Variants> = {
	line1: {
		whenOpen: {
			x1: [2, 2, 2],
			y1: [4, 16, 30],
			x2: [30, 30, 30],
			y2: [4, 16, 2],
		},

		whenClose: {
			x1: [2, 2, 2],
			y1: [30, 16, 4],
			x2: [30, 30, 30],
			y2: [2, 16, 4],
		},
	},

	line2: {
		whenOpen: {
			opacity: [1, 1, 0],
		},
		whenClose: {
			opacity: [0, 0, 1],
		},
	},

	line3: {
		whenOpen: {
			x1: [2, 2, 2],
			y1: [28, 16, 2],
			x2: [30, 30, 30],
			y2: [28, 16, 30],
		},
		whenClose: {
			x1: [2, 2, 2],
			y1: [2, 16, 28],
			x2: [30, 30, 30],
			y2: [30, 16, 28],
		},
	},
};

export const HeaderComponent = React.memo(function HeaderComponent(
	_props: Props
): JSX.Element {
	const sidebar = useSidebarContext()!;
	const pageCarousel = usePageCarouselContext()!;

	const handleClickHamburger = (_event: React.MouseEvent): void => {
		sidebar?.toggle();
		if (sidebar?.isVisible()) {
			pageCarousel?.enable();
		} else if (sidebar?.isHidden()) {
			pageCarousel?.disable();
		}
	};

	return (
		<header className={styled.header}>
			<Brand />

			<Hamburger onClick={handleClickHamburger}>
				<motion.line
					x1="2"
					y1="4"
					x2="30"
					y2="4"
					animate={sidebar.isVisible() ? 'whenOpen' : 'whenClose'}
					variants={variants.line1}
					transition={{
						duration: 1,
						ease: 'easeInOut',
					}}></motion.line>

				<motion.line
					x1="2"
					y1="16"
					x2="30"
					y2="16"
					animate={sidebar.isVisible() ? 'whenOpen' : 'whenClose'}
					variants={variants.line2}
					transition={{
						duration: 0.5,
						ease: 'easeInOut',
					}}></motion.line>

				<motion.line
					x1="2"
					y1="28"
					x2="30"
					y2="28"
					animate={sidebar.isVisible() ? 'whenOpen' : 'whenClose'}
					variants={variants.line3}
					transition={{
						duration: 1,
						ease: 'easeInOut',
					}}></motion.line>
			</Hamburger>
		</header>
	);
});

function Brand() {
	return (
		<div className={styled.brand}>
			<Link
				href="/"
				className={styled.brand__link}>
				Retone Home
			</Link>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 330 64"
				height="32"
				className={styled.brand__logo}
				fill="none"
				stroke="inherit"
				strokeWidth="8">
				<path d="M4,63v-37a22,22,0,0,1,22,-22"></path>
				<path d="M46,32h32v-6a22,22,0,0,0,-44,0v12a22,22,0,0,0,41.6021,9.9878"></path>
				<path d="M98,4v34a22,22,0,0,0,41.6021,9.9878M98,32h28"></path>
				<path d="M154,26a22,22,0,0,1,44,0v12a22,22,0,0,1,-44,0z"></path>
				<path d="M218,63v-37a22,22,0,0,1,44,0v37"></path>
				<path d="M294,32h32v-6a22,22,0,0,0,-44,0v12a22,22,0,0,0,41.6021,9.9878"></path>
			</svg>
		</div>
	);
}

type Props = {};

import classnames from 'classnames';
import { Variants, motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import Context, { Handler, Status } from './context';
import styles from './sidebar.module.scss';

const variants: Variants = {
	[Status.Hidden]: { translateX: '100vw' },
	[Status.Visible]: { translateX: '0vw' },
};

export class SidebarComponent extends React.Component<Props, State> {
	public static contextType = Context;
	public constructor(props: Props) {
		super(props);

		this.state = {};
	}

	private readonly navigationItems: Array<NavigationItemType> = [
		{ href: '/v0.2/anatomy', label: 'Retone Hero Anatomy' },
		{ href: '/', label: 'Retone Hero Plus' },
		{ href: '/about/index.html', label: 'About Retone' },
		{ href: '/solutions/index.html', label: 'Solutions' },
		{ href: '/story/index.html', label: 'Retone Hero Story' },
		{ href: '/blog/index.html', label: 'Blog' },
		{ href: '/', label: 'Contacts' },
		{ href: '/', label: 'Ordering' },
	];

	public render(): JSX.Element {
		const sidebar: Handler = this.context as any;

		return (
			<motion.aside
				initial={Status.Hidden}
				animate={sidebar.getStatus()}
				variants={variants}
				transition={{ duration: 1, ease: 'easeInOut' }}
				className={styles['sidebar']}>
				<div className={styles['sidebar__close']}></div>

				<div className={styles['sidebar__inner']}>
					<header className={styles['sidebar__header']}></header>

					<nav
						className={classnames(
							styles['sidebar__navigation'],
							styles['navigation']
						)}>
						<ul className={styles['navigation__list']}>
							{React.Children.toArray(
								this.navigationItems.map(
									(item: NavigationItemType) => (
										<NavigationItem {...item} />
									)
								)
							)}
						</ul>
					</nav>
				</div>
			</motion.aside>
		);
	}
}

type Props = {};

type State = {};

function NavigationItem(props: NavigationItemType): JSX.Element {
	return (
		<li className={styles.navigation__item}>
			<Link
				href={props.href}
				passHref
				className={styles.navigation__link}>
				<span className={styles.navigation__text}>{props.label}</span>
			</Link>
		</li>
	);
}

type NavigationItemType = { href: string; label: string };

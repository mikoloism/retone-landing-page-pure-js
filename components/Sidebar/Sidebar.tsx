import classnames from 'classnames';
import { Children, Component } from 'react';
import styles from './sidebar.module.scss';
import Link from 'next/link';

export class SidebarComponent extends Component<Props, State> {
	public constructor(props: Props) {
		super(props);

		this.state = { isOpen: props?.isOpen ?? false };
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
		return (
			<aside className={styles['sidebar']}>
				{/* TODO : replace by <button> */}
				<div className={styles['sidebar__close']}></div>

				<div className={styles['sidebar__inner']}>
					<header className={styles['sidebar__header']}></header>

					<nav
						className={classnames(
							styles['sidebar__navigation'],
							styles['navigation']
						)}>
						<ul className={styles['navigation__list']}>
							{Children.toArray(
								this.navigationItems.map(
									(item: NavigationItemType) => (
										<NavigationItem {...item} />
									)
								)
							)}
						</ul>
					</nav>
				</div>
			</aside>
		);
	}
}

type Props = { isOpen?: boolean /* default = undefined(false) */ };

type State = { isOpen: boolean };

function NavigationItem(props: NavigationItemType): JSX.Element {
	return (
		<li className={styles.navigation__item}>
			<Link
				href={props.href}
				className={styles.navigation__link}>
				<span className={styles.navigation__text}>{props.label}</span>
			</Link>
		</li>
	);
}

type NavigationItemType = { href: string; label: string };

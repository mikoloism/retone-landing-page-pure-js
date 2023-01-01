import classnames from 'classnames';
import Link from 'next/link';
import { Component } from 'react';
import styles from './header.module.scss';

export class HeaderComponent extends Component<Props, State> {
	public constructor(props: Props) {
		super(props);

		this.state = { isOverlay: props?.isOverlay ?? false };
	}

	private readonly styles: Record<string, string> = {
		header: classnames(
			styles.header,
			this.state?.isOverlay && styles['header--overlay']
		),
		brand: classnames(styles.header__brand, styles.brand),
		brand__link: classnames(styles.brand__link),
		brand__logo: classnames(styles.brand__logo),
		hamburger: classnames(styles.header__hamburger, styles.hamburger),
		hamburger__icon: classnames(styles.hamburger__icon),
	};

	public render(): JSX.Element {
		return (
			<header className={this.styles.header}>
				<div className={this.styles.brand}>
					<Link
						href="/"
						className={this.styles.brand__link}>
						Retone Home
					</Link>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 330 64"
						height="32"
						className={this.styles.brand__logo}
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

				<button
					type="button"
					className={this.styles.hamburger}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 32 32"
						height="32"
						width="32"
						className={this.styles.hamburger__icon}
						fill="none"
						stroke="inherit"
						strokeWidth="4"
						strokeLinecap="round">
						<line
							id="hamburger-icon-line-1"
							x1="2"
							y1="4"
							x2="30"
							y2="4"></line>
						<line
							id="hamburger-icon-line-2"
							x1="2"
							y1="16"
							x2="30"
							y2="16"></line>
						<line
							id="hamburger-icon-line-3"
							x1="2"
							y1="28"
							x2="30"
							y2="28"></line>
					</svg>
				</button>
			</header>
		);
	}
}

type Props = { isOverlay?: boolean /* default = undefined(false) */ };

type State = { isOverlay: boolean };

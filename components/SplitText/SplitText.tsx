import React from 'react';
import Word from './styled';
import { useAnimation } from 'framer-motion';

export function SplitText(props: Props): JSX.Element {
	const controls = useAnimation();

	if (typeof props.children !== 'string') return <></>;

	const words = props.children.split(' ')!;

	controls.start('initial');
	if (!!props.play) controls.start('visible');

	return (
		<React.Fragment>
			{React.Children.toArray(
				words.map((word: string, index: number) => {
					return (
						<Word.Outer>
							<Word.Inner
								initial="initial"
								animate={controls}
								variants={{
									initial: { y: '100%' },
									visible: { y: 0 },
								}}
								transition={{
									duration: 0.4,
									ease: 'easeInOut',
								}}>
								{word}
								{index !== words.length - 1 ? '\u00A0' : ''}
							</Word.Inner>
						</Word.Outer>
					);
				})
			)}
		</React.Fragment>
	);
}

type Props = React.PropsWithChildren<{ play?: boolean }>;

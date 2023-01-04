import React, { Children, Component } from 'react';
import Word from './styled';

export class SplitText extends Component<Props, State> {
	public constructor(props: Props) {
		super(props);
	}

	public render(): JSX.Element | undefined {
		if (typeof this.props.children === 'string') {
			return (
				<React.Fragment>
					{Children.toArray(
						this.props.children.split(' ').map(this.mapToWord)
					)}
				</React.Fragment>
			);
		}
	}

	public mapToWord(word: string): JSX.Element {
		return (
			<Word.Wrapper>
				<Word.Inner>{word}</Word.Inner>
			</Word.Wrapper>
		);
	}
}

type Props = React.PropsWithChildren<{}>;

type State = {};

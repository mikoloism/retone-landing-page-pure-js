import { Children, Component } from 'react';

export class SplitText extends Component<Props, State> {
	public constructor(props: Props) {
		super(props);
	}

	public render(): JSX.Element {
		return (
			<>
				{Children.toArray(
					this.props.text.split(' ').map(this.mapToCharacter)
				)}
			</>
		);
	}

	public mapToCharacter(character: string): JSX.Element {
		return (
			<span
				className="word"
				aria-hidden="true">
				<span className="word__inner">{character}</span>
			</span>
		);
	}
}

type Props = { text: string };

type State = {};

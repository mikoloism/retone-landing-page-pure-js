import classnames from 'classnames';
import styled from 'styled-components';

namespace Word {
	export const Wrapper = styled.span.attrs((props) => ({
		className: classnames('word', props.className),
	}))`
		display: inline-block;
		overflow: hidden;
	`;

	export const Inner = styled.span.attrs((props) => ({
		className: classnames('word__inner', props.className),
	}))`
		display: inline-block;
		transform: translateY(100%);
		transition: 0.7s ease all;
	`;
}

export default Word;

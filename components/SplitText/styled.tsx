import { motion } from 'framer-motion';
import styled from 'styled-components';

namespace Word {
	export const Outer = styled.span`
		display: inline-block;
		overflow: hidden;
	`;

	export const Inner = styled(motion.span)`
		display: inline-block;
		will-change: transform;
	`;
}

export default Word;

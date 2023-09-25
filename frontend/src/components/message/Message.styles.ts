import { motion } from "framer-motion";
import { styled } from "styled-components";

export const MessageBox = styled(motion.div)<{ $percept: string }>`
    display: flex;
    width: 100%;
    justify-content: ${props => (props.$percept === 'reader' ? 'flex-start' : 'flex-end')};
`

export const MessageWrapper = styled.div<{ $percept: string }>`
    max-width: 80%;
    background: ${ props => props.theme.messageGradient };
    color: ${ props => props.theme.background };
    font-weight: 600;
    font-size: 1.1em;
    word-break: break-word;
    padding: ${ props => props.$percept === 'reader' ? '1rem 3rem 1rem 1.5rem' : '1rem 1.5rem 1rem 3rem' };
    box-sizing: border-box;
    border-radius: ${ props => props.$percept === 'reader' ? '0.5rem 0.5rem 2rem 0.5rem' : '0.5rem 0.5rem 0.5rem 2rem' };

    .message__left {
        text-align: left;
    }
    .message__right {
        text-align: right;
    }
`
import { motion } from "framer-motion";
import { styled } from "styled-components";

export const MessageBox = styled(motion.div)<{ $percept: string }>`
    display: flex;
    flex-direction: column;
    align-items: ${props => (props.$percept === 'reader' ? 'flex-start' : 'flex-end')};
    width: 100%;
`

export const MessageWrapper = styled(motion.div)<{ $percept: string }>`
    touch-action: none;
    max-width: 80%;
    background: ${ props => props.theme.messageGradient };
    color: ${ props => props.theme.background };
    font-weight: 600;
    font-size: 1.1em;
    word-break: break-word;
    padding: ${ props => props.$percept === 'reader' ? '1rem 3rem 1rem 1.5rem' : '1rem 1.5rem 1rem 3rem' };
    box-sizing: border-box;
    border-radius: ${ props => props.$percept === 'reader' ? '0 0.5rem 2rem 0.5rem' : '0.5rem 0 0.5rem 2rem' };

    .message__left {
        text-align: left;
    }
    .message__right {
        text-align: right;
    }
`

export const MessageReply = styled.div<{ $percept: string }>`
    cursor: pointer;
    max-width: 15rem;
    color: ${ props => props.theme.text };
    background-color: ${ props => props.theme.background };
    border-radius: 1rem;;
    padding: 1rem;
    box-sizing: border-box;
    user-select: none;
    border-radius: ${ props => props.$percept === 'reader' ? '1rem 1rem 1rem 0' : '1rem 1rem 0 1rem' };

    span {
        font-size: 0.8em;
        font-weight: 800;
        color: ${ props => props.theme.text };
    }
    p {
        max-width: 15rem;
        font-size: 0.9em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`
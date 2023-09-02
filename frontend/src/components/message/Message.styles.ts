import { styled } from "styled-components";

export const MessageWrapper = styled.div<{ $percept: string }>`
    max-width: 80%;
    background: ${ props => props.theme.messageGradient };
    padding: 2rem;
    box-sizing: border-box;
    float: ${ props => props.$percept === 'reader' ? 'left' : 'right' };
    border-radius: ${ props => props.$percept === 'reader' ? '0.5rem 2rem 0.5rem 0.5rem' : '0.5rem 0.5rem 0.5rem 2rem' };

    .message__left {
        text-align: left;
    }
    .message__right {
        text-align: right;
    }
`
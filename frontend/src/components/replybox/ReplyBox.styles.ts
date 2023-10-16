import { motion } from "framer-motion";
import styled from "styled-components";

export const ReplyBoxWrapper = styled(motion.div)`
    position: absolute;
    display: flex;
    width: 100%;
    bottom: 5rem;
    left: 0;
    right: 0;
    height: 6rem;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    background: ${ props => props.theme.messageGradient };
    color: ${ props => props.theme.background };
    border: 2px solid ${ props => props.theme.background };
    box-sizing: border-box;
    border-radius: 1rem;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    overflow: hidden;
`

export const ReplyBoxContent = styled.div`
    width: 90%;
    max-width: calc(100% - 8rem);
    padding: 1rem 2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem; 
    cursor: pointer;

    p, span {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    p{
        font-size: 1.1em;
        font-weight: 700;
        color: ${ props => props.theme.background };
    }

    span {
        font-size: 1.2em;
        font-weight: 400;
    }
`

export const ReplyBoxClose = styled.div`
    width: 9%;
    min-width: 5rem;
    height: 100%;
    background: ${ props => props.theme.text };
    font-size: 1em;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer; 
`
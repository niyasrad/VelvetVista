import { motion } from "framer-motion";
import styled from "styled-components";

export const ChatWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    background-color: ${props => props.theme.wrapperBG};
`

export const ChatContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 80%;
    margin: auto;
    max-width: 80rem;
    border-radius: 1rem;
    padding: 2rem 3rem;
    box-sizing: border-box;
    background: ${props => props.theme.glassGradient};

    @media only screen and (max-width: 990px) {
        width: 100%;
        height: 100%;
        border-radius: 0;
        padding: 1rem 2rem;
    }
`

export const ChatOpener = styled.div`
    display: flex;
    align-items: center;
    min-height: 3rem;
    gap: 0.5rem;

    svg {
        width: 3rem;
        height: 3rem;
        cursor: pointer;
        color: ${props => props.theme.text};
    }
`

export const ChatTitle = styled.p`
    font-weight: 500;
    font-size: 0.9em;
    color: ${props => props.theme.text};

    .chat__title {
        display: block;
        font-weight: 900;
        font-size: 2em;
        height: 100%;
        max-width: 20vw;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`

export const ChatIndicator = styled(motion.div)`
    min-height: 2rem;
    color: ${ props => props.theme.text };
    font-weight: 500;
    font-size: 1em;

    .chat__title {
        font-weight: 900;
        font-size: 1.2em;
    }
`

export const ChatEntry = styled.div`
    width: 100%;
    display: flex;
    gap: 1rem;
    min-height: 3rem;
    box-sizing: border-box;
    background: ${ props => props.theme.wrapperBG };
    overflow: hidden;
    border-radius: 1rem;

    input {
        width: 100%;
        height: 100%;
        border: none;
        padding-left: 1rem;
        outline: none;
        background: none;
        color: ${ props => props.theme.background };
        font-size: 1em;
        font-weight: 500;
    }

    ::placeholder {
        color: ${ props => props.theme.background };
        opacity: 1;
    }

    ::-ms-input-placeholder { 
        color: ${ props => props.theme.background };
    }

    button {
        width: 10%;
        min-width: 5rem;
        height: 100%;
        border: none;
        outline: none;
        color: ${ props => props.theme.background };
        font-weight: 700;
        background: ${ props => props.theme.text };
        cursor: pointer;
        font-size: 1em;
    }
`
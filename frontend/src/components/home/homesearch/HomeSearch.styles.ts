import { styled } from "styled-components"

export const HomeSearchWrapper = styled.div`
    width: 50rem;
    max-width: 100%;
    min-height: 3rem;
    display: flex;
    flex-direction: row;
    gap: none;
    padding-left: 2rem;
    box-sizing: border-box;
    justify-content: space-between;
    background: ${ props => props.theme.glassGradient };
    border-radius: 1rem;

    ::placeholder {
        color: ${ props => props.theme.text };
        opacity: 1;
    }

    ::-ms-input-placeholder { 
        color: ${ props => props.theme.text };
    }
`

export const HomeSearchInput = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: none;
    color: ${ props => props.theme.text };
    font-size: 1em;
    font-weight: 500;
`

export const HomeSearchButton = styled.button<{ $usernameExists: boolean }>`
    width: 10%;
    min-width: 5rem;
    height: 100%;
    border: none;
    border-radius: 1rem;
    outline: none;
    color: ${ props => props.theme.background };
    background: ${ props => props.theme.messageGradient };
    cursor: pointer;
    font-size: 1em;
    font-weight: ${ props => props.$usernameExists ? 400 : 600 };
    opacity: ${ props => props.$usernameExists ? 1 : 0.2 };
    transition: all 0.3s ease-in-out;
`
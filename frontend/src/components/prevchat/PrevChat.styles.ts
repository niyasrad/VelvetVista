import { styled } from "styled-components";

export const PrevChatWrapper = styled.div`
    width: 90%;
    max-width: 40rem;
    display: flex;
    gap: 1.5rem;
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 0.5rem 0.5rem 2rem 0.5rem;
    background: ${ props => props.theme.messageGradient };
    box-shadow: 0px 4px 15px -4px rgba(0, 0, 0, 0.25);
    cursor: pointer;

    @media only screen and (max-width: 990px) {
        width: 100%;
        max-width: 20rem;
    }
`

export const PrevChatEmotion = styled.img`
    width: 5rem;
    max-width: 30%;
    object-fit: contain;
    height: 100%;
`

export const PrevChatContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
    color: ${ props => props.theme.background };
`

export const PrevChatName = styled.p`
    font-size: 1.1em;
    font-weight: 800;
    max-width: 70%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const PrevChatMessage = styled.p`
    font-size: 1em;
    font-weight: 500;
    max-width: 70%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

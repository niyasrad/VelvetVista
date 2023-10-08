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
    cursor: pointer;

    @media only screen and (max-width: 990px) {
        width: 100%;
        max-width: 20rem;
    }
`

export const PrevChatEmotion = styled.div<{ $status: 'online' | 'offline' }>`
    width: 4rem;
    min-width: 4rem;
    max-width: 30%;
    height: 100%;
    position: relative;

    img {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }

    &::after {
        position: absolute;
        content: '';
        width: 1rem;
        height: 1rem;
        background: ${ props => props.$status === 'online' ? 'green' : 'grey' };
        border: 1px solid ${ props => props.$status === 'online' ? 'grey' : 'white' };
        border-radius: 50%;
        bottom: 0.2rem;
        right: 0.2rem;
        transition: all ease-in-out 0.3s;
    }
`

export const PrevChatContent = styled.div`
    min-width: 60%;
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

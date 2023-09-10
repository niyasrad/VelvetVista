import { styled } from "styled-components"

export const HomeContactsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;
    box-sizing: border-box;
    height: 100%;
    max-height: 100%;
`

export const HomeContactsChats = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    gap: 2rem;
    overflow-y: auto;
    overscroll-behavior: contain;

    @media only screen and (max-width: 690px) {
        width: 100%;
    }
`

export const HomeContactsNone = styled.div<{ $loading ?: boolean, $noContacts ?: boolean }>`
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    img {
        width: 10rem;
        max-width: 100%;
        height: 10rem;
        object-fit: contain;
    }
    p {
        color: ${ props => props.theme.text };
        text-align: center;
        max-width: 10rem;
    }

    @media only screen and (max-width: 690px) {
        display: ${ props => (props.$loading || props.$noContacts) ? 'flex' : 'none'};
    }
`
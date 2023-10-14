import styled from "styled-components";

export const InfoWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;
    background-color: ${props => props.theme.wrapperBG};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;

    img {
        width: 8rem;
        height: 8rem;
        max-width: 50%;
        max-height: auto;
        object-fit: contain;
    }
`

export const InfoBar = styled.div`
    width: 30rem;
    max-width: 90%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 4rem;
    box-sizing: border-box;
    text-align: center;
    border-radius: 0.5rem;
    background-color: ${props => props.theme.background};
`

export const InfoTitle = styled.h1`
    font-size: 1.5rem;
    font-weight: 600;
    color: ${props => props.theme.text};
`

export const InfoDesc = styled.p`
    font-size: 1em;
    color: ${props => props.theme.wrapperBG};
`
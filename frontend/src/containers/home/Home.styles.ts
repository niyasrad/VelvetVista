import { styled } from "styled-components";

export const HomeWrapper = styled.div`
    width: 100%;
    height: 100vh;
    padding: 1rem;
    box-sizing: border-box;
`

export const HomeTitle = styled.div`
    font-weight: 500;
    font-size: 0.9em;
    color: ${props => props.theme.text};
    min-height: 3rem;

    .home__title {
        font-weight: 900;
        font-size: 2em;
    }
`

export const HomeContent = styled.div`
    width: 80%;
    max-width: 80rem;
    height: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    padding: 2rem 3rem;
    box-sizing: border-box;
    gap: 1rem;
    background: ${ props => props.theme.glassGradient};
    border-radius: 2rem;
    margin: auto;

    @media only screen and (max-width: 990px) {
        width: 100%;
        padding: 2.5rem 3rem;
        border-radius: 0;
    }
`

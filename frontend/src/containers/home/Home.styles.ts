import { styled } from "styled-components";

export const HomeWrapper = styled.div`
    width: 100%;
    height: 100vh;
    padding: 1rem;
    box-sizing: border-box;

    @media only screen and (max-width: 990px) {
        padding: 0;
    }
`

export const HomeContent = styled.div`
    width: 80%;
    max-width: 80rem;
    height: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    box-sizing: border-box;
    gap: 2rem;
    background: ${ props => props.theme.glassGradient};
    border-radius: 2rem;
    margin: auto;

    @media only screen and (max-width: 690px) {
        width: 95%;
        padding: 1.5rem;
    }
`

export const HomeRest = styled.div`
    overflow-y: auto;
    min-height: calc(100% - 6rem);
    width: 100%;
    box-sizing: border-box;
`


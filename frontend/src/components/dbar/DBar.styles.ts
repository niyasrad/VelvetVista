import styled from "styled-components";

export const DBarWrapper = styled.div`
    width: 100%;
    min-height: 3rem;
    margin-bottom: 2rem;
    display: flex;
    gap: 2rem;
    justify-content: space-between;
    overflow: hidden;

    @media only screen and (max-width: 990px) {
        gap: 1rem;
    }
`

export const DBarSO = styled.div`
    display: flex;
    gap: 2rem;
    cursor: pointer;

    @media only screen and (max-width: 990px) {
        gap: 1rem;
    }
`

export const DBarChild = styled.div`
    display: flex;
    align-items: center;
    background-color: ${ props => props.theme.text };
    width: 3rem;
    height: 3rem;
    border-radius: 50%;

    svg {
        width: 1.5rem;
        height: 1.5rem;
        margin: auto;
        color: ${ props => props.theme.background };
    }
`
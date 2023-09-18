import styled from "styled-components";

export const DBarWrapper = styled.div`
    width: 100%;
    min-height: 3rem;
    display: flex;
    gap: 2rem;
    justify-content: space-between;
`

export const DBarSO = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;

    p {
        font-size: 1em;
        display: block;
        color: ${props => props.theme.text};
        font-weight: 600;
    }

    svg {
        width: 2rem;
        height: 2rem;
    }

    @media only screen and (max-width: 990px) {
        p {
            display: none;
        }
    }
`
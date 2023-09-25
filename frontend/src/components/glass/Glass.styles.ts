import { styled } from "styled-components";

export const GlassWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    box-sizing: border-box;
    background: ${ props => props.theme.glassGradient };

    @media only screen and (max-width: 990px) {
        border-radius: 0;
    }
`
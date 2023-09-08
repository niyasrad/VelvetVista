import { styled } from "styled-components";

export const GlassWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 2rem;
    box-sizing: border-box;
    background: ${ props => props.theme.glassGradient };
`
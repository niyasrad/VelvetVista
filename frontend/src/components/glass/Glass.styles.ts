import { styled } from "styled-components";

export const GlassWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 3rem;
    padding: 2rem 0;
    box-sizing: border-box;
    background: ${ props => props.theme.glassGradient };
    box-shadow: 0px 4px 21px -3px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`
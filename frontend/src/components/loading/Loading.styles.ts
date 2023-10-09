import styled from "styled-components";

export const LoadingWrapper = styled.div<{ $loaded: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    transition: all 0.4s ease-in-out;
    background-color:  ${ props => (props.$loaded) ? props.theme.wrapperBG :props.theme.background };

    img {
        width: 8rem;
        height: 8rem;
        max-width: 50%;
        max-height: auto;
        object-fit: contain;
    }
`
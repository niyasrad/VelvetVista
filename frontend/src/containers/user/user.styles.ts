import { styled } from "styled-components";

export const SignWrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 2rem 0;
    box-sizing: border-box;
`

export const SignContent = styled.div`
    width: 60%;
    height: 80%;
    max-height: 80%;
    max-width: 80rem;
    margin: 3rem auto;

    img {
        height: 2rem;
        width: auto;
        filter: ${ props => props.theme.dropshadow }
    }

    @media only screen and (max-width: 990px) {
        width: 100%;
        height: 90%;
        max-height: 90%;
    }
`

export const SignerInsance = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 3rem 1rem;
    gap: 2rem;
    color: #9F9F9F;
    text-align: center;

    a {
        text-decoration: none;
        color: ${ props => props.theme.text };
        font-weight: 600;
    }
`

export const SignFieldsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    width: 100%;
`

export const SignFieldInstance = styled.input`
    background: ${ props => props.theme.glassGradient };
    border-radius: 1rem;
    padding: 0.8rem 1rem;
    box-sizing: border-box;
    color: #9F9F9F;
    width: 20rem;
    max-width: 90%;
    border: none;
    box-shadow: ${ props => props.theme.boxshadow };
    font-size: 1em;
    font-weight: 400;
`

export const SignFieldSubmit = styled.button`
    background: ${ props => props.theme.messageGradient };
    border-radius: 2rem;
    text-align: center;
    padding: 1rem;
    color: ${ props => props.theme.text };
    width: 18rem;
    max-width: 100%;
    border: none;
    box-shadow: ${ props => props.theme.boxshadow };
    font-size: 1.1em;
    font-weight: 500;
    cursor: pointer;
`
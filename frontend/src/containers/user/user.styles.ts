import { styled } from "styled-components";

export const SignWrapper = styled.div`
    width: 100%;
    padding: 2rem 0;
    box-sizing: border-box;
`

export const SignContent = styled.div`
    width: 60%;
    max-width: 80rem;
    margin: 3rem auto;

    img {
        height: 2rem;
        width: auto;
        filter: ${ props => props.theme.dropshadow }
    }

    @media only screen and (max-width: 990px) {
        width: 100%;
    }
`

export const SignerInsance = styled.div`
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 3rem 0;
    color: #9F9F9F;

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
    max-width: 80%;
    border: none;
    box-shadow: 0px 4px 21px -3px rgba(0, 0, 0, 0.25);
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
    max-width: 85%;
    border: none;
    box-shadow: 0px 4px 21px -3px rgba(0, 0, 0, 0.25);
    font-size: 1.1em;
    font-weight: 500;
    cursor: pointer;
`
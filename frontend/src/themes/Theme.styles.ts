import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
    text: 'black',
    background: 'white',
    glassGradient: 'linear-gradient(0deg, #D9D9D9 0%, rgba(217, 217, 217, 0.50) 100%)',
    messageGradient: 'linear-gradient(180deg, #424242 0%, rgba(66, 66, 66, 0.00) 100%)',
    dropshadow: 'drop-shadow(0px 20px 20px white)'
}

export const darkTheme: DefaultTheme = {
    text: 'white',
    background: 'black',
    glassGradient: 'linear-gradient(0deg, #000 0%, rgba(0, 0, 0, 0.30) 100%)',
    messageGradient: 'linear-gradient(180deg, #D9D9D9 0%, rgba(66, 66, 66, 0.50) 100%)',
    dropshadow: 'drop-shadow(0px 20px 20px black)'
}
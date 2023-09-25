import { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
    text: 'black',
    background: 'white',
    wrapperBG: 'grey',
    glassGradient: 'linear-gradient(0deg, #D9D9D9 0%, rgba(217, 217, 217, 0.50) 100%)',
    messageGradient: 'linear-gradient(180deg, #424242 0%, rgba(66, 66, 66, 0.8) 100%)',
    dropshadow: 'drop-shadow(0px 2px 2px white)',
    boxshadow: '0px 4px 5px -3px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
}

export const darkTheme: DefaultTheme = {
    text: 'white',
    background: 'black',
    wrapperBG: 'grey',
    glassGradient: 'linear-gradient(0deg, #252525 0%, rgba(50, 50, 50, 1) 100%)',
    messageGradient: 'linear-gradient(180deg, #D9D9D9 0%, rgba(99, 99, 99, 1) 100%)',
    dropshadow: 'drop-shadow(0px 2px 2px black)',
    boxshadow: '0px 4px 5px -3px rgba(255, 255, 255, 0.25), 0px 4px 4px 0px rgba(255, 255, 255, 0.25)'
}
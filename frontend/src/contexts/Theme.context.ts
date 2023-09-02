import { Dispatch, SetStateAction, createContext, useContext } from "react";

export enum ThemeEnum {
    LIGHT = 'light',
    DARK = 'dark'
}

interface ThemeContextInterface {
    theme: ThemeEnum,
    setTheme?: Dispatch<SetStateAction<ThemeEnum>>,
    toggleTheme?: () => void
}

const defaultValue = {
    theme: localStorage.getItem('theme') as ThemeEnum || 'light'
}

export const ThemeContext = createContext<ThemeContextInterface>(defaultValue)

export const useThemeContext = () => useContext(ThemeContext)
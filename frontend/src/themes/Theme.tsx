import React, { useLayoutEffect, useState } from "react";
import { ThemeContext, ThemeEnum } from "../contexts/Theme.context";

export default function Theme({ children }: { children : React.ReactNode }) {

    const [theme, setTheme] = useState<ThemeEnum>(ThemeEnum.LIGHT)

    const toggleTheme = () => {
        if (theme === ThemeEnum.LIGHT) {
            setTheme(ThemeEnum.DARK)
            localStorage.setItem('theme', 'dark')
            return
        } 
        setTheme(ThemeEnum.LIGHT)
        localStorage.setItem('theme', 'light')
    }

    useLayoutEffect(() => {
        const cachedTheme = localStorage.getItem('theme')
        if (cachedTheme) {
            setTheme(cachedTheme as ThemeEnum)
        }
    }, [])

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
                toggleTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
    
}
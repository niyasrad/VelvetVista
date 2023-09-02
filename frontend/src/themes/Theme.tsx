import React, { useLayoutEffect, useState } from "react";
import { ThemeContext } from "styled-components";
import { ThemeEnum } from "../contexts/Theme.context";

export default function Theme({ children }: { children : React.ReactNode }) {

    const [theme, setTheme] = useState<string>('light')

    const toggleTheme = () => {
        if (theme === ThemeEnum.LIGHT) {
            setTheme(ThemeEnum.DARK)
            return
        } 
        setTheme(ThemeEnum.LIGHT)
    }

    useLayoutEffect(() => {
        const cachedTheme = localStorage.getItem('theme')
        if (theme) {
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
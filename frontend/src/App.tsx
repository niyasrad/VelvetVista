import { ThemeProvider } from "styled-components"
import { ThemeEnum, useThemeContext } from "./contexts/Theme.context"
import { darkTheme, lightTheme } from "./themes/Theme.styles"
import { Navigate, RouterProvider } from "react-router"
import { createBrowserRouter } from "react-router-dom"
import SignIn from "./containers/user/SignIn"
import SignUp from "./containers/user/SignUp"

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from "react"
import axios from "axios"
import { GlobalContext } from "./contexts/Global.context"

function AppWrapper({ children } : { children: React.ReactNode }) {

    const [username, setUsername] = useState<string>('')
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    const handleLogIn = (token: string) => {
        
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setIsLoggedIn(true)

    }   

    const handleSignOut = () => {
        
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        setIsLoggedIn(false)

    }

    useEffect(() => {

        const token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        if (token) {
            axios.get(import.meta.env.VITE_BASE_API + '/user/checkauth')
            .then((res) => {
                setUsername(res.data.username)
                setIsLoggedIn(true)
                toast(res.data.message, { type: 'success' })
            })
            .catch(() => {
                handleSignOut()
            })
        }

    }, [])

    return (
        <GlobalContext.Provider
            value={{
                username,
                isLoggedIn,
                setUsername,
                setIsLoggedIn,
                handleLogIn,
                handleSignOut
            }}
        >
            {children}
        </GlobalContext.Provider>
    )

}

export default function App() {

    const { theme } = useThemeContext()

    const router = createBrowserRouter([
        {
            path: '/login',
            element: <Navigate to={'/signin'}/>
        },
        {
            path: '/signin',
            element: <SignIn />
        },
        {
            path: '/signup',
            element: <SignUp />
        },
        {
            path: '/',
            element: <div></div>
        },
        {
            path: '*',
            element: <div>Not Found</div>
        }
    ])

    return (
        <ThemeProvider 
            theme={ theme === ThemeEnum.LIGHT ? lightTheme : darkTheme }
        >
            <AppWrapper>
                <RouterProvider router={router} />
                <ToastContainer
                    theme={theme}
                />
            </AppWrapper>
        </ThemeProvider>
    )
}
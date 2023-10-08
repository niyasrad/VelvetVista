import { ThemeProvider } from "styled-components"
import { darkTheme, lightTheme } from "./themes/Theme.styles"

import { ThemeEnum, useThemeContext } from "./contexts/Theme.context"
import { GlobalContext } from "./contexts/Global.context"

import { Navigate, RouterProvider } from "react-router"
import { createBrowserRouter } from "react-router-dom"

import SignIn from "./containers/user/SignIn"
import SignUp from "./containers/user/SignUp"
import Home from "./containers/home/Home"

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useLayoutEffect, useState } from "react"
import axios from "axios"
import Chat from "./containers/chat/Chat"
import { Socket, io } from "socket.io-client"

function AppWrapper({ children } : { children: React.ReactNode }) {

    const [username, setUsername] = useState<string>('')
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [socketInstance, setSocketInstance] = useState<Socket | null>(null)

    const handleLogIn = (token: string, userHandle: string) => {
        
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setUsername(userHandle)
        setIsLoggedIn(true)
        setIsLoading(false)

    }   

    const handleSignOut = () => {
        
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        setIsLoggedIn(false)
        setIsLoading(false)

    }

    useLayoutEffect(() => {

        const token = localStorage.getItem('token')
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        if (!token) {
            handleSignOut()
        } 

        axios.get(import.meta.env.VITE_BASE_API + '/user/checkauth')
        .then((res) => {
            setUsername(res.data.username)
            setIsLoggedIn(true)
            setIsLoading(false)
            toast(res.data.message, { type: 'success' })
        })
        .catch(() => {
            handleSignOut()
        })

    }, [])

    useLayoutEffect(() => {

        const token = localStorage.getItem('token')
        if (!token || !isLoggedIn || isLoading) {
            return
        }

        const socket = io(import.meta.env.VITE_BASE_API, { extraHeaders: { token }})
        setSocketInstance(socket)

        return () => { 
            socket.disconnect()
        }

    }, [isLoggedIn, isLoading])

    return (
        <GlobalContext.Provider
            value={{
                username,
                isLoggedIn,
                isLoading,
                socketInstance,
                setUsername,
                setIsLoggedIn,
                setIsLoading,
                setSocketInstance,
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
            element: <Home />
        },
        {
            path: '/chat/:chatID',
            element: <Chat />
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
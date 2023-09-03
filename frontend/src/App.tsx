import { ThemeProvider } from "styled-components"
import { ThemeEnum, useThemeContext } from "./contexts/Theme.context"
import { darkTheme, lightTheme } from "./themes/Theme.styles"
import { Navigate, RouterProvider } from "react-router"
import { createBrowserRouter } from "react-router-dom"
import SignIn from "./containers/user/SignIn"
import SignUp from "./containers/user/SignUp"

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
            path: '*',
            element: <div>Not Found</div>
        }
    ])

    return (
        <ThemeProvider 
            theme={ theme === ThemeEnum.LIGHT ? lightTheme : darkTheme }
        >
            <RouterProvider router={router} />
        </ThemeProvider>
    )
}
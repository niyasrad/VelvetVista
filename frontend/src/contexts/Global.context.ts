import { Dispatch, SetStateAction, createContext, useContext } from "react";

export interface GlobalContextInterface {
    username: string,
    isLoggedIn: boolean,
    isLoading: boolean,
    setUsername?: Dispatch<SetStateAction<string>>,
    setIsLoggedIn?: Dispatch<SetStateAction<boolean>>,
    setIsLoading?: Dispatch<SetStateAction<boolean>>,
    handleLogIn?: (token: string, userHandle: string) => void,
    handleSignOut?: () => void
}

const defaultValue = {
    username: '',
    isLoggedIn: false,
    isLoading: true
}

export const GlobalContext = createContext<GlobalContextInterface>(defaultValue)

export const useGlobalContext = () => useContext<GlobalContextInterface>(GlobalContext)
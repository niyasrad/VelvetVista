import { Dispatch, SetStateAction, createContext, useContext } from "react";

export interface GlobalContextInterface {
    username: string,
    isLoggedIn: boolean,
    setUsername?: Dispatch<SetStateAction<string>>,
    setIsLoggedIn?: Dispatch<SetStateAction<boolean>>,
    handleLogIn?: (token: string) => void,
    handleSignOut?: () => void
}

const defaultValue = {
    username: '',
    isLoggedIn: false
}

export const GlobalContext = createContext<GlobalContextInterface>(defaultValue)

export const useGlobalContext = () => useContext<GlobalContextInterface>(GlobalContext)
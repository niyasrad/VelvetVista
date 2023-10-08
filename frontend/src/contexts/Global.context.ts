import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { Socket } from "socket.io-client";

export interface GlobalContextInterface {
    username: string,
    isLoggedIn: boolean,
    isLoading: boolean,
    socketInstance: Socket | null,
    setUsername?: Dispatch<SetStateAction<string>>,
    setIsLoggedIn?: Dispatch<SetStateAction<boolean>>,
    setIsLoading?: Dispatch<SetStateAction<boolean>>,
    setSocketInstance?: Dispatch<SetStateAction<Socket | null>>,
    handleLogIn?: (token: string, userHandle: string) => void,
    handleSignOut?: () => void
}

const defaultValue = {
    username: '',
    isLoggedIn: false,
    isLoading: true,
    socketInstance: null
}

export const GlobalContext = createContext<GlobalContextInterface>(defaultValue)

export const useGlobalContext = () => useContext<GlobalContextInterface>(GlobalContext)
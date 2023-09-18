import { useState, useEffect } from "react"
import { HomeSearchButton, HomeSearchInput, HomeSearchWrapper } from "./HomeSearch.styles"
import axios from "axios"
import { useNavigate } from "react-router"

export function HomeSearch() {

    const [searchValue, setSearchValue] = useState<string>("")
    const [chatterID, setChatterID] = useState<string>("")
    const [usernameExists, setUsernameExists] = useState<boolean>(false)

    const navigate = useNavigate()

    useEffect(() => {

        setUsernameExists(false)
        setChatterID("")

        let debounceTimeout: number | undefined

        const fetchUsernameExists = async () => {
            
            axios.get(import.meta.env.VITE_BASE_API + '/contact/getuser', {
                params: {
                    username: searchValue
                }
            })
            .then((res) => {
                setUsernameExists(true)
                setChatterID(res.data.userID)
            })
            .catch(() => {})

        }

        if (debounceTimeout !== undefined) {
            clearTimeout(debounceTimeout)
        }

        debounceTimeout = setTimeout(() => {
            if (searchValue.trim() !== '') {
                fetchUsernameExists()
            }
        }, 500)

        return () => {
            clearTimeout(debounceTimeout)
        }

    }, [searchValue])

    return (
        <HomeSearchWrapper>
            <HomeSearchInput
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Enter Username"
            />
            <HomeSearchButton
                $usernameExists={usernameExists}
                onClick={usernameExists ? () => { navigate(`/chat/${chatterID}`) }:() => {}}
            >
                {usernameExists ? "Chat" : "Search"}
            </HomeSearchButton>
        </HomeSearchWrapper>
    )
}
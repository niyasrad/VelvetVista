import { useState, useEffect } from "react"
import { HomeSearchButton, HomeSearchInput, HomeSearchWrapper } from "./HomeSearch.styles"

export function HomeSearch() {

    const [searchValue, setSearchValue] = useState<string>("")
    const [usernameExists, setUsernameExists] = useState<boolean>(false)

    useEffect(() => {

        setUsernameExists(false)
        let debounceTimeout: number | undefined

        const fetchUsernameExists = async () => {
            await new Promise(resolve => setTimeout(resolve, 500))

            const apiResponse = Math.random() < 0.5
            setUsernameExists(apiResponse)

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
                placeholder="Enter Their Username"
            />
            <HomeSearchButton
                $usernameExists={usernameExists}
            >
                {usernameExists ? "Chat" : "Search"}
            </HomeSearchButton>
        </HomeSearchWrapper>
    )
}
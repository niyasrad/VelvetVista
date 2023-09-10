
import { HomeContent, HomeRest, HomeWrapper } from "./Home.styles";
import Glass from "../../components/glass/Glass";
import HomeBG from "../../components/home/homebg/HomeBG";

import { HomeSearch } from "../../components/home/homesearch/HomeSearch";
import { HomeContacts } from "../../components/home/homecontacts/HomeContacts";
import { useEffect } from "react";
import { useGlobalContext } from "../../contexts/Global.context";
import { useNavigate } from "react-router";

export default function Home() {

    const { isLoading, isLoggedIn } = useGlobalContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            navigate('/signin')
        }
    }, [isLoading, isLoggedIn])

    return (
        <HomeWrapper>
            <HomeBG
                setting="hallone"
            />
            <HomeContent>
                { isLoggedIn && <HomeSearch />}
                <HomeRest>
                    <Glass children={<HomeContacts />} />
                </HomeRest>
            </HomeContent>
        </HomeWrapper>
    )

}
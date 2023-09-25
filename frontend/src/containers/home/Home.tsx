
import { HomeContent, HomeTitle, HomeWrapper } from "./Home.styles";
import Glass from "../../components/glass/Glass";

import { HomeSearch } from "../../components/home/homesearch/HomeSearch";
import { HomeContacts } from "../../components/home/homecontacts/HomeContacts";
import { useEffect } from "react";
import { useGlobalContext } from "../../contexts/Global.context";
import { useNavigate } from "react-router";
import DBar from "../../components/dbar/DBar";

export default function Home() {

    const { username, isLoading, isLoggedIn } = useGlobalContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            navigate('/signin')
        }
    }, [isLoading, isLoggedIn])

    return (
        <HomeWrapper>
            <HomeContent>
                <DBar>
                    <HomeTitle>Welcome back, <span className="home__title">{username}</span></HomeTitle>
                </DBar>
                { isLoggedIn && <HomeSearch />}
                <Glass children={<HomeContacts />} />
            </HomeContent>
        </HomeWrapper>
    )

}
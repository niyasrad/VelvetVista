
import { HomeContent, HomeRest, HomeWrapper } from "./Home.styles";
import Glass from "../../components/glass/Glass";
import HomeBG from "../../components/home/homebg/HomeBG";

import { HomeSearch } from "../../components/home/homesearch/HomeSearch";
import { HomeContacts } from "../../components/home/homecontacts/HomeContacts";

export default function Home() {

    return (
        <HomeWrapper>
            <HomeBG
                setting="hallone"
            />
            <HomeContent>
                <HomeSearch />
                <HomeRest>
                    <Glass children={<HomeContacts />} />
                </HomeRest>
            </HomeContent>
        </HomeWrapper>
    )

}
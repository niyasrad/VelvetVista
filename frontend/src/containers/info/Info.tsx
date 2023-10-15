import { InfoBar, InfoDesc, InfoTitle, InfoWrapper } from "./Info.styles";

import { useNavigate, useParams } from "react-router";
import Loader from "../../components/loader/Loader";
import { useGlobalContext } from "../../contexts/Global.context";
import { useEffect } from "react";

const InfoData = {
    disconnect: {
        title: "You've been Disconnected!",
        desc: "Instance was reported to be idle for a long time. Please reload the page to connect back."
    },
    error: {
        title: "Oops! Something went wrong.",
        desc: "Please try again later."
    }
}

export default function Info() {

    const { infoID } = useParams<{ infoID: keyof typeof InfoData }>()
    const { socketInstance } = useGlobalContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (socketInstance) {
            navigate('/')
        }
    }, [socketInstance])

    return (
        <InfoWrapper>
            <InfoBar>
                <Loader />
                <InfoTitle>{infoID && InfoData[infoID].title}</InfoTitle>
                <InfoDesc>{infoID && InfoData[infoID].desc}</InfoDesc>
            </InfoBar>
        </InfoWrapper>
    )
}
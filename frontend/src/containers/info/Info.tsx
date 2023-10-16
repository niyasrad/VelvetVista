import { InfoBar, InfoDesc, InfoTitle, InfoWrapper } from "./Info.styles";

import { useNavigate, useParams } from "react-router";
import Loader from "../../components/loader/Loader";
import Loading from "../../components/loading/Loading";
import { useGlobalContext } from "../../contexts/Global.context";
import { useEffect, useState } from "react";

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
    const { socketInstance, isLoading, isLoggedIn } = useGlobalContext()
    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!isLoading) {
            setTimeout(() => {
                setLoading(false)
            }, 3000)
        }
        if (!isLoading && !isLoggedIn) {
            navigate('/signin')
        }
    }, [isLoading, isLoggedIn])

    useEffect(() => {
        if (socketInstance) {
            navigate('/')
        }
    }, [socketInstance])

    if (loading) {
        return <Loading />
    }

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
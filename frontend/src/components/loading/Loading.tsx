import Loader from "../loader/Loader"
import { LoadingWrapper } from "./Loading.styles"

import { useEffect, useState } from "react"



export default function Loading() {

    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true)
        }, 1500)
    }, [])
    
    return (
        <LoadingWrapper
            $loaded={loaded} 
        >
            <Loader />
        </LoadingWrapper>
    )
}
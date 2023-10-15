import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useGlobalContext } from "../contexts/Global.context"

const useTimeoutNavigation = (timeoutInMs: number, redirectPath: string) => {

    const navigate = useNavigate()
    const { socketInstance, setSocketInstance } = useGlobalContext()

    useEffect(() => {
        if (!timeoutInMs || !redirectPath) return

        const onTimeout = () => {
            if (socketInstance !== null) {
                socketInstance!.disconnect()
                setSocketInstance!(null)
            }
            navigate(redirectPath)
        }
        
        let timer: number = setTimeout(onTimeout, timeoutInMs)
        
        const resetTimeout = () => {
            if (timer) {
                clearTimeout(timer)
            } 
            timer = setTimeout(onTimeout, timeoutInMs)
        }

        const events = ['mousedown', 'mousemove', 'keypress', 'scroll']

        events.forEach((event) => {
            document.addEventListener(event, resetTimeout)
        })

        return () => {
            if (timer) {
                clearTimeout(timer)
            }
            events.forEach((event) => {
                document.removeEventListener(event, resetTimeout)
            })
        }

    }, [timeoutInMs, redirectPath, socketInstance])

}

export default useTimeoutNavigation
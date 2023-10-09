import { useThemeContext } from "../../contexts/Theme.context"
import { LoadingWrapper } from "./Loading.styles"

import { motion } from 'framer-motion'
import { useEffect, useState } from "react"

import small_logo_light from '../../assets/logo/logo-light-small.svg'
import small_logo_dark from '../../assets/logo/logo-dark-small.svg'

export default function Loading() {
    
    const { theme } = useThemeContext()
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
            <motion.img 
                src={theme === 'light' ? small_logo_light : small_logo_dark}
                alt="Loading..."
                animate={{
                    opacity: [0.4, 1, 0.4, 1, 0.4],
                    rotate: [0, 30, 360, 330, 0],
                    scale: [1, 1.2, 1, 1.2, 1]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    type: 'tween'
                }}
            />
        </LoadingWrapper>
    )
}
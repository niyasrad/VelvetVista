import { SignBGWallpaper, SignBGWrapper } from "./SignBG.styles";
import { useState, useEffect } from 'react'

import hallone from "../../assets/settings/hall-1.png"
import halltwo from "../../assets/settings/hall-2.png"
import hallthree from "../../assets/settings/hall-3.png"
import diningone from "../../assets/settings/dining-1.png"
import diningtwo from "../../assets/settings/dining-2.png"
import bedroom from "../../assets/settings/bedroom.png"
import kitchen from "../../assets/settings/kitchen.png"

import { AnimatePresence } from 'framer-motion'

const order: Array<string> = [ hallone, halltwo, hallthree, diningone, diningtwo, bedroom, kitchen ]

export default function SignBG() {

    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % order.length)
        }, 10000)

        return () => clearTimeout(timer)
    }, [currentImageIndex])

    return (
        <SignBGWrapper>
            <AnimatePresence mode="wait">
                <SignBGWallpaper
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    src={order[currentImageIndex]}
                    alt="Background Setting"
                />
            </AnimatePresence>
        </SignBGWrapper>
    )
}
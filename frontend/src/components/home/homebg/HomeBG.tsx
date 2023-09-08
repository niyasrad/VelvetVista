import hallone from "../../../assets/settings/hall-1.png"
import halltwo from "../../../assets/settings/hall-2.png"
import hallthree from "../../../assets/settings/hall-3.png"
import diningone from "../../../assets/settings/dining-1.png"
import diningtwo from "../../../assets/settings/dining-2.png"
import bedroom from "../../../assets/settings/bedroom.png"
import kitchen from "../../../assets/settings/kitchen.png"

import { AnimatePresence } from 'framer-motion'
import { HomeBGWallpaper, HomeBGWrapper } from "./HomeBG.styles";

export type Setting = "hallone" | "halltwo" | "hallthree" | "diningone" | "diningtwo" | "bedroom" | "kitchen"

const settingImages: { [key: string]: string } = {
    hallone,
    halltwo,
    hallthree,
    diningone,
    diningtwo,
    bedroom,
    kitchen,
}

export default function HomeBG({ setting }: { setting: Setting }) {

    return (
        <HomeBGWrapper>
            <AnimatePresence mode="wait">
                <HomeBGWallpaper
                    key={setting}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    src={settingImages[setting] || hallone} 
                    alt="Background Setting"
                />
            </AnimatePresence>
        </HomeBGWrapper>
    )
}
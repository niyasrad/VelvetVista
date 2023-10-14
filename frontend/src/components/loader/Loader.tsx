import { LoaderLogo } from "./Loader.styles"

import { useThemeContext } from "../../contexts/Theme.context"
import small_logo_light from '../../assets/logo/logo-light-small.svg'
import small_logo_dark from '../../assets/logo/logo-dark-small.svg'


export default function Loader() {

    const { theme } = useThemeContext()

    return (
        <LoaderLogo 
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
    )
}
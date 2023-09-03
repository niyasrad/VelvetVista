import { styled } from "styled-components";
import { motion } from "framer-motion";

export const SignBGWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    background-color: ${ props => props.theme.background };
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`

export const SignBGWallpaper = styled(motion.img)`
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(0.2rem);
`
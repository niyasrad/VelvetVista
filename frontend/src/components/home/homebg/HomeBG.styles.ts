import { motion } from "framer-motion";
import { styled } from "styled-components";

export const HomeBGWrapper = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: ${props => props.theme.background};
    z-index: -1;
`;

export const HomeBGWallpaper = styled(motion.img)`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

import { motion } from "framer-motion";
import styled from "styled-components";

export const ChatMessagesWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    position: relative;
`

export const ChatMessageFiller = styled(motion.div)`
    width: 100%;
`
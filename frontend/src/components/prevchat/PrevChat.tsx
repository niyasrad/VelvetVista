import { PrevChatContent, PrevChatEmotion, PrevChatMessage, PrevChatName, PrevChatWrapper } from "./PrevChat.styles";

import sender from '../../assets/emoticons/sender.svg'
import receiver from '../../assets/emoticons/receiver.svg'

export interface PrevChatProps {
    name: string,
    sentByUser: boolean,
    message: string
}

export default function PrevChat({ name, sentByUser, message }: PrevChatProps) {
    return (
        <PrevChatWrapper>
            <PrevChatEmotion
                src={sentByUser ? sender : receiver}
                alt="Emotion"
            />
            <PrevChatContent>
                <PrevChatName>{name}</PrevChatName>
                <PrevChatMessage>{sentByUser && "You: "}{message}</PrevChatMessage>
            </PrevChatContent> 
        </PrevChatWrapper>
    )
}
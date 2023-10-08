import { PrevChatContent, PrevChatEmotion, PrevChatMessage, PrevChatName, PrevChatWrapper } from "./PrevChat.styles";

import sender from '../../assets/emoticons/sender.svg'
import receiver from '../../assets/emoticons/receiver.svg'

import { useNavigate } from "react-router";

export interface PrevChatProps {
    userID: string,
    name: string,
    sentByUser: boolean,
    message: string,
    status: 'online' | 'offline'
}

export default function PrevChat({ userID, name, sentByUser, message, status }: PrevChatProps) {

    const navigate = useNavigate()

    return (
        <PrevChatWrapper
            onClick={() => { navigate(`/chat/${userID}`) }}
        >   
            <PrevChatEmotion
                $status={status}
            >
                <img 
                    src={sentByUser ? sender : receiver}
                    alt="Emotion"
                />
            </PrevChatEmotion>
            <PrevChatContent>
                <PrevChatName>{name}</PrevChatName>
                <PrevChatMessage>{sentByUser && "You: "}{message}</PrevChatMessage>
            </PrevChatContent> 
        </PrevChatWrapper>
    )
}
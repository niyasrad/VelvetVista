import { useParams } from "react-router";
import { useRef, useEffect } from 'react'

import Message, { Percepts } from "../message/Message";
import { ChatMessagesWrapper } from "./ChatMessages.styles";
import { MessageProps } from "../../containers/chat/Chat";

export default function ChatMessages({ messages }: { messages : Array<MessageProps> }) {
    
    const { chatID } = useParams()
    const messageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messageRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <ChatMessagesWrapper>
            {
                messages.map((message) => (
                    <Message 
                        key={`message-${message.content}${message.timestamp}`}
                        percept={chatID === message.sender ? Percepts.READER : Percepts.USER}
                        text={message.content}
                    />
                ))
            }
            <div ref={messageRef} />
        </ChatMessagesWrapper>
    )
}
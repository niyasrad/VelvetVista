import { useParams } from "react-router";
import Message, { Percepts } from "../message/Message";
import { ChatMessagesWrapper } from "./ChatMessages.styles";
import { useRef, useEffect } from 'react'

export default function ChatMessages({ messages }: { messages : Array<any> }) {
    
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
import { useParams } from "react-router";
import { useRef, useEffect } from 'react'

import Message, { Percepts } from "../message/Message";
import { ChatMessagesWrapper } from "./ChatMessages.styles";
import { MessageProps } from "../../containers/chat/Chat";

export default function ChatMessages({ messages, onReply }: { messages : Array<MessageProps>, onReply: (id: string) => void }) {
    
    const { chatID } = useParams()
    const messageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messageRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const scrollToMessage = (id: string) => {
        const messageElement = document.getElementById(id)
        if (messageElement) {
          messageElement.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <ChatMessagesWrapper>
            {
                messages.map((message) => (
                    <Message 
                        id={message._id}
                        key={`message-${message.content}${message.timestamp}`}
                        reply={message.reply ? {
                            content: messages.find((msg) => msg._id === message.reply)?.content || '',
                            percept: messages.find((msg) => msg._id === message.reply)?.sender === chatID ? Percepts.USER : Percepts.READER,
                            id: message.reply
                        } : null}
                        percept={chatID === message.sender ? Percepts.READER : Percepts.USER}
                        text={message.content}
                        onReply={() => onReply(message._id)}
                        onReplyTap={message.reply ? () => scrollToMessage(message.reply) : () => {}}
                    />
                ))
            }
            <div ref={messageRef} />
        </ChatMessagesWrapper>
    )
}
import { useParams } from "react-router";
import { useRef, useEffect } from 'react'

import Message, { Percepts } from "../message/Message";
import { ChatMessageFiller, ChatMessagesWrapper } from "./ChatMessages.styles";
import { MessageProps } from "../../containers/chat/Chat";
import { AnimatePresence } from "framer-motion";

interface ChatMessagesProps { 
    messages : Array<MessageProps>, 
    onReply: (id: string) => void, 
    replyID: string 
}

export default function ChatMessages({ messages, onReply, replyID }: ChatMessagesProps) {
    
    const { chatID } = useParams()
    const messageRef = useRef<HTMLDivElement>(null)
    const chatMessagesRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messageRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    useEffect(() => {
        if (!replyID) {
            return
        }
        if (chatMessagesRef.current && chatMessagesRef.current?.scrollHeight - Math.abs(chatMessagesRef.current?.scrollTop) <= chatMessagesRef.current?.clientHeight + 50) {
            setTimeout(() => {
                messageRef.current?.scrollIntoView({ behavior: 'smooth' })
            }, 400)
        } 
    }, [replyID])

    const scrollToMessage = (id: string) => {
        const messageElement = document.getElementById(id)
        if (messageElement) {
          messageElement.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <ChatMessagesWrapper
            ref={chatMessagesRef}
        >
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
            <AnimatePresence>
                {
                    replyID && 
                    <ChatMessageFiller 
                        initial={{ minHeight: 0 }}
                        animate={{ minHeight: '6rem' }}
                        exit={{ minHeight: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                }
            </AnimatePresence>
            <div ref={messageRef} />
        </ChatMessagesWrapper>
    )
}
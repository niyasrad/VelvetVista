import { useNavigate, useParams } from "react-router";
import { Socket, io } from "socket.io-client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

import HomeBG from "../../components/home/homebg/HomeBG";
import { ChatContent, ChatEntry, ChatIndicator, ChatOpener, ChatTitle, ChatWrapper } from "./Chat.styles";
import ChatMessages from "../../components/chatmessages/ChatMessages";
import { useGlobalContext } from "../../contexts/Global.context";


export interface MessageProps {
    sender: string,
    receiver: string,
    content: string,
    timestamp: string
}

export default function Chat() {

    const { chatID } = useParams()
    const [chatter, setChatter] = useState('')
    const [loading, setLoading] = useState<boolean>(true)

    const [messages, setMessages] = useState<Array<MessageProps>>([])
    const [message, setMessage] = useState<string>('')
    const inputRef = useRef<HTMLInputElement | null>(null)

    const [isTyping, setIsTyping] = useState<boolean>(false)

    const [socketInstance, setSocketInstance] = useState<Socket | null>(null)

    const token = localStorage.getItem('token')

    const { isLoading ,isLoggedIn } = useGlobalContext()
    const navigate = useNavigate()

    const handleSend = () => {
        if (!socketInstance || message.trim() === '') return
        socketInstance.emit('sendMessage', { receiver: chatID, content: message })
        setMessage('')
    }

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            navigate('/signin')
        }
    }, [isLoading, isLoggedIn])

    useEffect(() => {

        setLoading(true)
        axios.get(import.meta.env.VITE_BASE_API + '/contact/messages', {
            params: {
                id: chatID
            }
        })
        .then((res) => {
            setChatter(res.data.username)
            setMessages(res.data.messages)
            setLoading(false)
            if (inputRef.current) {
                inputRef.current.focus();
            }
        })
        .catch(() => {})

    }, [])

    useEffect(() => {

        if (!socketInstance) return
        socketInstance.emit('typing', { receiver: chatID })
        const handleEnter = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                handleSend()
            }
        }
        document.addEventListener('keydown', handleEnter)
        return () => {
            document.removeEventListener('keydown', handleEnter)
        }

    }, [message])

    useEffect(() => {

        if (!token || !isLoggedIn || loading) {
            return
        }

        const socket = io(import.meta.env.VITE_BASE_API, { extraHeaders: { token }})
        setSocketInstance(socket)

        socket.on('connect', () => {
            socket.emit('joinRoom', { receiver: chatID })
        })
        
        socket.on('receiveMessage', (data) => {
            setMessages((prev: Array<MessageProps>) => {
                return [...prev, data]
            })
        })

        socket.on('typing', () => {
            setIsTyping(true)
            setTimeout(() => {
                setIsTyping(false)
            }, 2000)
        })

        return () => { 
            socket.disconnect()
        }

    }, [isLoggedIn, loading])

    return (
        <ChatWrapper>
            <HomeBG 
                setting="hallone"
            />
            <ChatContent>
                <ChatOpener>
                    <svg onClick={() => navigate('/')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z" clipRule="evenodd" />
                    </svg>
                    <ChatTitle>Chatting with <span className="chat__title">{chatter}</span></ChatTitle>
                </ChatOpener>
                <ChatMessages 
                    messages={messages}
                />
                <ChatIndicator>
                    <AnimatePresence>
                    {
                        isTyping &&
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2 }}
                        >          
                            {isTyping && <span className="chat__title">{chatter}</span>}
                            {isTyping && ` is Typing...`}
                        </motion.div> 
                    }
                    </AnimatePresence>
                </ChatIndicator>
                <ChatEntry>
                    <input 
                        type="text" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)}  
                        placeholder="Type Something" 
                        ref={inputRef}
                    />
                    <button onClick={handleSend}>Send</button>
                </ChatEntry>
            </ChatContent>
        </ChatWrapper>
    )
    
}
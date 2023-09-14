import { useParams } from "react-router";
import HomeBG from "../../components/home/homebg/HomeBG";
import { ChatContent, ChatEntry, ChatIndicator, ChatTitle, ChatWrapper } from "./Chat.styles";
import { useEffect, useState } from "react";
import axios from "axios";
import ChatMessages from "../../components/chatmessages/ChatMessages";
import { useGlobalContext } from "../../contexts/Global.context";
import { io } from "socket.io-client";
import { AnimatePresence, motion } from "framer-motion";

export default function Chat() {

    const { chatID } = useParams()
    const [chatter, setChatter] = useState('')
    const [messages, setMessages] = useState<any>([])
    const [message, setMessage] = useState<any>('')

    const [isTyping, setIsTyping] = useState<boolean>(false)

    const [socketInstance, setSocketInstance] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const token = localStorage.getItem('token')

    const { isLoggedIn } = useGlobalContext()

    const handleSend = () => {
        if (!socketInstance || message.trim() === '') return
        socketInstance.emit('sendMessage', { receiver: chatID, content: message })
        setMessage('')
    }

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
        })
        .catch(() => {})

    }, [])

    useEffect(() => {

        if (!socketInstance) return
        socketInstance.emit('typing', { receiver: chatID })
        const handleEnter = (e: any) => {
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
            setMessages((prev: any) => {
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
                <ChatTitle>Chatting with <span className="chat__title">{chatter}</span></ChatTitle>
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
                    />
                    <button onClick={handleSend}>Send</button>
                </ChatEntry>
            </ChatContent>
        </ChatWrapper>
    )
    
}
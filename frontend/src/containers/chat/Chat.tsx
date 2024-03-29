import { useNavigate, useParams } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

import { ChatContent, ChatEntry, ChatIndicator, ChatOpener, ChatStatus, ChatTitle, ChatWrapper } from "./Chat.styles";
import ChatMessages from "../../components/chatmessages/ChatMessages";
import { useGlobalContext } from "../../contexts/Global.context";
import DBar from "../../components/dbar/DBar";
import Loading from "../../components/loading/Loading";
import useTimeoutNavigation from "../../hooks/useTimeoutNavigation";
import ReplyBox from "../../components/replybox/ReplyBox";


export interface MessageProps {
    _id: string,
    sender: string,
    receiver: string,
    content: string,
    timestamp: string,
    reply: string
}

export default function Chat() {

    const { chatID } = useParams()
    const [chatter, setChatter] = useState('')
    const [loading, setLoading] = useState<boolean>(true)
    const [replyID, setReplyID] = useState<string>('')

    const [messages, setMessages] = useState<Array<MessageProps>>([])
    const [message, setMessage] = useState<string>('')
    const inputRef = useRef<HTMLInputElement | null>(null)

    const [isTyping, setIsTyping] = useState<boolean>(false)

    const token = localStorage.getItem('token')

    useTimeoutNavigation(1000 * 60 * 2, '/info/disconnect')

    const { isLoading ,isLoggedIn, socketInstance } = useGlobalContext()
    const navigate = useNavigate()

    const handleSend = () => {
        if (!socketInstance || message.trim() === '') return
        socketInstance.emit('sendMessage', { receiver: chatID, content: message, reply: replyID })
        setMessage('')
        setReplyID('')
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

            setTimeout(() => {
                setLoading(false)
            }, 2500)

            if (inputRef.current) {
                inputRef.current.focus();
            }
        })
        .catch(() => {})

    }, [])

    useEffect(() => {

        const focusOnInput = (_: KeyboardEvent) => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }

        document.addEventListener('keydown', focusOnInput)

        return () => {
            document.removeEventListener('keydown', focusOnInput)
        }

    }, [inputRef])

    useEffect(() => {

        if (!socketInstance) return
        if (message.trim() === '') return
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

    }, [message, replyID])

    useEffect(() => {

        if (!token || !isLoggedIn || loading || !socketInstance) {
            return
        }

        socketInstance.emit('joinRoom', { receiver: chatID })
        
        socketInstance.on('receiveMessage', (data) => {
            setMessages((prev: Array<MessageProps>) => {
                return [...prev, data]
            })
        })

        socketInstance.on('typing', () => {
            setIsTyping(true)
            setTimeout(() => {
                setIsTyping(false)
            }, 2000)
        })

    }, [isLoggedIn, loading])

    if (loading) return <Loading />

    return (
        <ChatWrapper>
            <ChatContent>
                <DBar>
                    <ChatOpener>
                        <svg onClick={() => navigate('/')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z" clipRule="evenodd" />
                        </svg>
                        <ChatTitle>Chatting with <span className="chat__title">{chatter}</span></ChatTitle>
                    </ChatOpener>
                </DBar>
                <ChatMessages 
                    messages={messages}
                    onReply={(id) => setReplyID(id)}
                    replyID={replyID}
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
                <ChatStatus>
                    <AnimatePresence>
                        {
                            replyID !== '' &&
                            <ReplyBox 
                                content={messages.find((message) => message._id === replyID)?.content || ''}
                                handleClose={() => setReplyID('')}
                            />
                        }
                    </AnimatePresence>
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
                </ChatStatus>
            </ChatContent>
        </ChatWrapper>
    )
    
}
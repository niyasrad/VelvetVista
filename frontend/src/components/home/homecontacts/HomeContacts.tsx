import { useState, useEffect } from "react"
import PrevChat, { PrevChatProps } from "../../prevchat/PrevChat"

import check from '../../../assets/emoticons/check.svg'
import not_found from '../../../assets/emoticons/not_found.svg'
import { HomeContactsWrapper, HomeContactsChats, HomeContactsNone } from "./HomeContacts.styles"
import { useGlobalContext } from "../../../contexts/Global.context"
import axios from "axios"
import { toast } from "react-toastify"
import { io } from "socket.io-client"

export function HomeContacts() {

    const [previousContacts, setPreviousContacts] = useState<Array<PrevChatProps>>([])
    const [loading, setLoading] = useState<boolean>(true)
    const token = localStorage.getItem('token')

    const { username, isLoggedIn } = useGlobalContext()

    useEffect(() => {

        if (!isLoggedIn) {
            return
        }
        
        axios.get(import.meta.env.VITE_BASE_API + '/contact/chats')
        .then((res) => {
            const contacts = res.data.chats
            setPreviousContacts(contacts)
            setLoading(false)
        })
        .catch((err) => {
            toast(err.response.data.message, { type: 'error' })
        })

    }, [isLoggedIn])

    useEffect(() => {

        if (!token || !isLoggedIn || loading) {
            return
        }

        const socket = io(import.meta.env.VITE_BASE_API, { extraHeaders: { token }})

        socket.on('connect', () => {
            socket.emit('joinLobby')
        })
        
        socket.on('receiveMessage', (data) => {

            let newContacts = [...previousContacts]
            let newContact = newContacts.find((contact) => (contact.userID === data.sender || contact.userID === data.receiver))

            if (!newContact) {

                newContacts.unshift({
                    userID: data.sender,
                    name: data.senderName,
                    message: data.content,
                    sentByUser: data.senderName === username
                })
                setPreviousContacts(newContacts)
                return

            }

            newContact = {
                ...newContact,
                message: data.content,
                sentByUser: data.sender !== newContact?.userID
            }
            newContacts = [
                newContact,
                ...previousContacts.filter((contact) => contact.userID !== data.sender && contact.userID !== data.receiver),
            ]

            setPreviousContacts(newContacts)

        })

        return () => { 
            socket.disconnect()
        }

    }, [isLoggedIn, loading])

    return (
        <HomeContactsWrapper>
            {(previousContacts.length !== 0 && !loading)
                &&
                <HomeContactsChats>
                    {previousContacts.map((contact) => (
                        <PrevChat
                            key={contact.userID}
                            userID={contact.userID}
                            name={contact.name}
                            sentByUser={contact.sentByUser}
                            message={contact.message}
                        />))
                    }
                </HomeContactsChats>
            }
            <HomeContactsNone
                $loading={loading}
                $noContacts={previousContacts.length === 0}
            >
                <img
                    src={(loading || (previousContacts.length !== 0)) ? check : not_found}
                    alt="No Contacts Found"
                />
                <p>{loading ?
                    "Loading your chats... now!" :
                    (previousContacts.length !== 0) ?
                        "Open a chat and share your thoughts!"
                        : "Find someone to chat with!"
                }</p>
            </HomeContactsNone>
        </HomeContactsWrapper>
    )

}
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

import { HomeContent, HomeTitle, HomeWrapper } from "./Home.styles";
import Glass from "../../components/glass/Glass";
import { HomeSearch } from "../../components/home/homesearch/HomeSearch";
import { HomeContacts } from "../../components/home/homecontacts/HomeContacts";
import DBar from "../../components/dbar/DBar";
import Loading from "../../components/loading/Loading";
import { useGlobalContext } from "../../contexts/Global.context";

import { PrevChatProps } from "../../components/prevchat/PrevChat";


export default function Home() {

    const { username, isLoading, isLoggedIn, socketInstance } = useGlobalContext()
    const navigate = useNavigate()
    
    const [loading, setLoading] = useState<boolean>(true)
    const [previousContacts, setPreviousContacts] = useState<Array<PrevChatProps>>([])

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            navigate('/signin')
        }

        axios.get(import.meta.env.VITE_BASE_API + '/contact/chats')
        .then((res) => {
            const contacts = res.data.chats
            setPreviousContacts(contacts)
            setTimeout(() => {
                setLoading(false)
            }, 2500)
        })
        .catch((err) => {
            toast(err.response.data.message, { type: 'error' })
        })

    }, [isLoading, isLoggedIn])

    const token = localStorage.getItem('token')

    useEffect(() => {

        if (!token || !isLoggedIn || loading || !socketInstance) {
            return
        }

        socketInstance.emit('joinLobby')

        socketInstance.on('userOnline', (data) => {
    
            const newContacts = [...previousContacts]
            const newContact = newContacts.find((contact) => contact.userID === data.userID)
            if (newContact) {
                newContact.status = 'online'
                setPreviousContacts(newContacts)
            }
    
        })

        socketInstance.on('userOffline', (data) => {

            const newContacts = [...previousContacts]
            const newContact = newContacts.find((contact) => contact.userID === data.userID)
            if (newContact) {
                newContact.status = 'offline'
                setPreviousContacts(newContacts)
            }

        })   

        
        socketInstance.on('receiveMessage', (data) => {

            let newContacts = [...previousContacts]
            let newContact = newContacts.find((contact) => (contact.userID === data.sender || contact.userID === data.receiver))

            if (!newContact) {

                newContacts.unshift({
                    userID: data.sender,
                    name: data.senderName,
                    message: data.content,
                    sentByUser: data.senderName === username,
                    status: data.status
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

    }, [isLoggedIn, loading])

    if (loading) return <Loading />

    return (
        <HomeWrapper>
            <HomeContent>
                <DBar>
                    <HomeTitle>Welcome back, <span className="home__title">{username}</span></HomeTitle>
                </DBar>
                { isLoggedIn && <HomeSearch />}
                <Glass children={<HomeContacts previousContacts={previousContacts} />} />
            </HomeContent>
        </HomeWrapper>
    )

}
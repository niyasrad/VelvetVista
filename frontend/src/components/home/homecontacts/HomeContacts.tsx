import { useState, useEffect } from "react"
import { contactsArray } from "../../../containers/home/Home.data"
import PrevChat, { PrevChatProps } from "../../prevchat/PrevChat"

import check from '../../../assets/emoticons/check.svg'
import not_found from '../../../assets/emoticons/not_found.svg'
import { HomeContactsWrapper, HomeContactsChats, HomeContactsNone } from "./HomeContacts.styles"

export function HomeContacts() {

    const [previousContacts, setPreviousContacts] = useState<Array<PrevChatProps>>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {

        const fetchData = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000))
            setPreviousContacts(contactsArray)
            setLoading(false)
        }

        fetchData()

    })

    return (
        <HomeContactsWrapper>
            {(previousContacts.length !== 0 && !loading)
                &&
                <HomeContactsChats>
                    {previousContacts.map((contact, index) => (
                        <PrevChat
                            key={index}
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
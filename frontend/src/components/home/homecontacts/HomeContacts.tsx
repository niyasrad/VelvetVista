import check from '../../../assets/emoticons/check.svg'
import not_found from '../../../assets/emoticons/not_found.svg'

import { HomeContactsWrapper, HomeContactsChats, HomeContactsNone } from "./HomeContacts.styles"
import PrevChat, { PrevChatProps } from "../../prevchat/PrevChat"

export function HomeContacts({ previousContacts }: { previousContacts: Array<PrevChatProps> }) {

    return (
        <HomeContactsWrapper>
            {previousContacts.length !== 0
                &&
                <HomeContactsChats>
                    {previousContacts.map((contact: PrevChatProps) => (
                        <PrevChat
                            key={contact.userID}
                            userID={contact.userID}
                            name={contact.name}
                            sentByUser={contact.sentByUser}
                            message={contact.message}
                            status={contact.status}
                        />))
                    }
                </HomeContactsChats>
            }
            <HomeContactsNone
                $noContacts={previousContacts.length === 0}
            >
                <img
                    src={(previousContacts.length !== 0) ? check : not_found}
                    alt="No Contacts Found"
                />
                <p>{
                    previousContacts.length !== 0 ?
                        "Open a chat and share your thoughts!"
                        : "Find someone to chat with!"
                }</p>
            </HomeContactsNone>
        </HomeContactsWrapper>
    )

}
import { MessageBox, MessageWrapper } from "./Message.styles";

export enum Percepts {
    USER = 'user',
    READER = 'reader'
}

export default function Message({ percept, text }: { percept: Percepts, text: string }) {
    return (
        <MessageBox 
            $percept={percept}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
        >
            <MessageWrapper $percept={percept}>
                <p className={ percept === Percepts.READER ? 'message__left' : 'message__right' } >{text}</p>
            </MessageWrapper>
        </MessageBox>
    )
}
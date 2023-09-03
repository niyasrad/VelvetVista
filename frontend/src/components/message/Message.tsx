import { MessageWrapper } from "./Message.styles";

export enum Percepts {
    USER = 'user',
    READER = 'reader'
}

export default function Message({ percept, text }: { percept: Percepts, text: string }) {
    return (
        <MessageWrapper $percept={percept}>
            <p className={ percept === Percepts.READER ? 'message__left' : 'message__right' } >{text}</p>
        </MessageWrapper>
    )
}
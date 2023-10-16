import { useRef } from "react";
import { MessageBox, MessageReply, MessageWrapper } from "./Message.styles";

export enum Percepts {
    USER = 'user',
    READER = 'reader'
}

interface MessageProps {
    id: string,
    percept: Percepts, 
    text: string, 
    reply: {
        content: string,
        id: string,
        percept: Percepts
    } | null, 
    onReply: () => void,
    onReplyTap: () => void
}

export default function Message({ id, percept, text, reply, onReply, onReplyTap }: MessageProps) {

    const ref = useRef<HTMLDivElement>(null)

    return (
        <MessageBox 
            $percept={percept}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            ref={ref}
        > 
            <div id={id}></div>
            {
                reply !== null && (
                    <MessageReply
                        $percept={percept}
                        onClick={onReplyTap}
                    >
                        {reply.percept === Percepts.READER &&
                            <span>YOU</span>
                        }
                        <p>{reply.content}</p>
                    </MessageReply>
                )
            }
            <MessageWrapper 
                $percept={percept}
                drag="x"
                dragConstraints={ref}
                dragSnapToOrigin
                onDragEnd={
                    (_ ,info) => {

                        if ((percept === Percepts.READER && info.offset.x > 70) || percept === Percepts.USER && info.offset.x < -70) onReply()
                    }
                }
            >
                <p className={ percept === Percepts.READER ? 'message__left' : 'message__right' } >{text}</p>
            </MessageWrapper>
        </MessageBox>
    )
}
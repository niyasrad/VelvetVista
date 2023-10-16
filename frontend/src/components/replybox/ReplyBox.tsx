import { ReplyBoxClose, ReplyBoxContent, ReplyBoxWrapper } from "./ReplyBox.styles";

interface ReplyBoxProps {
    content: string, 
    handleClose: () => void,
}

export default function ReplyBox({ content, handleClose }: ReplyBoxProps) {
    return (
        <ReplyBoxWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <ReplyBoxContent>
                <p>Replying to message</p>
                <span>{content}</span>
            </ReplyBoxContent>
            <ReplyBoxClose onClick={handleClose}>X</ReplyBoxClose>
        </ReplyBoxWrapper>
    )
}
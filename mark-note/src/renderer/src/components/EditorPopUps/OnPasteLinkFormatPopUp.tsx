import { createPortal } from 'react-dom';
import { ComponentProps, useState} from "react"
import { IoIosLink } from "react-icons/io";

export type OnPasteLinkFormatPopUpModalProps = {
    onClose: () => void;
    onClickCreate: () => void;
    visible: boolean,
}

export const OnPasteLinkFormatPopUpModal  = ({
    onClose,
    onClickCreate,
    visible,
}: OnPasteLinkFormatPopUpModalProps) => {
    const [linkFormat, setLinkFormat] = useState("")

    const handleOnClickCreate = () => {
        onClickCreate()
        onClose()

        setLinkFormat("")
    }

    const handleOnClickCancel = () => {
        onClose()

        setLinkFormat("")
    }

    if(!visible) return null

    return createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center z-20">
            <div className="mt-10 flex flex-col gap-2 text-white">
                <div className="bg-zinc-600 rounded-lg px-2 py-1 flex flex-col gap-5 mx-4 px-5">
                    <div className='flex flex-row gap-3'>
                        <IoIosLink className="w-4 h-4 text-zinc-100"/>
                        <div>Choose a link format</div>
                    </div>
                    <div className='flex justify-center items-center space-x-8'>
                        <button onClick={handleOnClickCancel} className="rounded bg-zinc-800 px-9 py-2">Cancel</button>
                        <button onClick={handleOnClickCreate} className="rounded bg-zinc-800 px-9 py-2">Create</button>
                    </div>
                </div>
            </div>
            
        </div>, document.body)
}
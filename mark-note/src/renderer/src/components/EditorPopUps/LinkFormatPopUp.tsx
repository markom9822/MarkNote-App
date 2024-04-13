import { createPortal } from 'react-dom';
import { ComponentProps, useState} from "react"
import { IoIosLink } from "react-icons/io";

export type LinkFormatPopUpModalProps = {
    onClose: () => void;
    onClickInsert: () => void;
    visible: boolean,
}

export const LinkFormatPopUpModal  = ({
    onClose,
    onClickInsert,
    visible,
}: LinkFormatPopUpModalProps) => {
    const [linkTitle, setLinkTitle] = useState("")
    const [linkAddress, setLinkAddress] = useState("")

    const handleOnClickInsert = () => {
        onClickInsert()
        onClose()

        setLinkTitle("")
        setLinkAddress("")
    }

    const handleOnClickCancel = () => {
        onClose()

        setLinkTitle("")
        setLinkAddress("")
    }

    if(!visible) return null

    const linkPopUp = createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center z-20">
            <div className="mt-10 flex flex-col gap-2 text-white">
                <div className="bg-zinc-600 rounded-lg px-2 py-1 flex flex-col gap-5 mx-4 px-5">
                    <div className='flex flex-row gap-3'>
                        <IoIosLink className="w-4 h-4 text-zinc-100"/>
                        <div>Insert a link</div>
                    </div>
                    <FormInputField label='Link title' placeholder='Link title' setInputText={setLinkTitle}/>
                    <FormInputField label='Link address' placeholder='https://' setInputText={setLinkAddress}/>
                    <div className='flex justify-center items-center space-x-8'>
                        <button onClick={handleOnClickCancel} className="rounded bg-zinc-800 px-9 py-2">Cancel</button>
                        <button onClick={handleOnClickInsert} className="rounded bg-zinc-800 px-9 py-2">Insert</button>
                    </div>
                </div>
            </div>
            
        </div>, document.body 
    )

    return {
        linkPopUp,
        linkTitle,
        linkAddress
    }
}

export type FormInputFieldProps = ComponentProps<'div'> & {
    label: string,
    placeholder: string,
    setInputText(title: string)
}

export const FormInputField = ({label, placeholder, setInputText, ...props}: FormInputFieldProps) => {

    return (
        <div {...props}>
            <label className="block text-gray-100 text-sm font-bold mb-3">
            {label}
            </label>
            <input className="border rounded py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline w-80" 
            id="username" type="text" placeholder={placeholder} onChange={event => setInputText(event.target.value)} />
        </div>
    )

}
import { createPortal } from 'react-dom';
import { MdClose } from "react-icons/md";
import { ComponentProps} from "react"


export const LinkFormatPopUpModal = (props) => {

    if(!props.visible) return null


    return createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center z-20">
            <div className="mt-10 flex flex-col gap-2 text-white">
                <div className="bg-zinc-600 rounded-lg px-2 py-1 flex flex-col gap-5 mx-4">
                    <div>
                        Insert a link
                    </div>
                    <FormInputField label='Link title' placeholder='Link title'/>
                    <FormInputField label='Link address' placeholder='https://'/>
                    <div className='flex flex-row justify-center'>
                        <button onClick={props.onClose} className="rounded bg-zinc-800 px-5">Cancel</button>
                        <button onClick={props.onClose} className="rounded bg-zinc-800 px-5">Insert</button>
                    </div>
                </div>
            </div>
            
        </div>, document.body 
    )
}

export type FormInputFieldProps = ComponentProps<'div'> & {
    label: string,
    placeholder: string,
}

export const FormInputField = ({label, placeholder, ...props}: FormInputFieldProps) => {

    return (
        <div {...props}>
            <label className="block text-gray-100 text-sm font-bold mb-2">
            {label}
            </label>
            <input className="border rounded py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline" 
            id="username" type="text" placeholder={placeholder} />
        </div>
    )

}
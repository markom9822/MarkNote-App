import { createPortal } from 'react-dom';
import { ComponentProps, useState, useRef} from "react"
import { CiImageOn } from 'react-icons/ci';

export type ImageFormatPopUpModalProps = {
    onClose: () => void;
    onClickInsert: () => void;
    visible: boolean,
    uiTheme: string,
}

export const ImageFormatPopUpModal  = ({
    onClose,
    onClickInsert,
    visible,
    uiTheme,
}: ImageFormatPopUpModalProps) => {
    const [imageAddress, setImageAddress] = useState("")
    const [imageWidth, setImageWidth] = useState("")
    const menuRef = useRef(null);

    const closeModal = (e) => {
        if(menuRef.current == e.target)
        {
            onClose()
        }
    }

    const handleOnClickInsert = () => {
        onClickInsert()
        onClose()

        setImageAddress("")
        setImageWidth("")
    }

    const handleOnClickCancel = () => {
        onClose()

        setImageAddress("")
        setImageWidth("")
    }

    if(!visible) return null

    const imagePopUp = createPortal(
        <div className={uiTheme}>
        <div ref={menuRef} onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-70 flex justify-center z-20">
            <div className="mt-10 flex flex-col gap-2">
                <div className="bg-bkgPrimary rounded-md flex flex-col gap-5 mx-4 border-2 border-zinc-500">
                    <div className='flex flex-row gap-3 mx-2 my-1'>
                        <CiImageOn className="w-4 h-4 my-1 text-textPrimary"/>
                        <div>
                            <p className='text-textPrimary'>Insert an image</p>
                        </div>
                    </div>
                    <FormInputField className='px-2' label='Image address' placeholder='https://' setInputText={setImageAddress}/>
                    <NumberFormInputField className='px-2' label='Image width' placeholder='0' setInputText={setImageWidth}/>
                    <div className='flex justify-center items-center space-x-8 py-3 rounded-b-md bg-bkgSecondary'>
                        <button onClick={handleOnClickCancel} className="font-bold rounded-lg bg-bkgPrimary px-6 py-1 border border-zinc-500 text-textPrimary">Cancel</button>
                        <button onClick={handleOnClickInsert} className="font-bold rounded-lg bg-indigo-500 px-6 py-1 border border-indigo-400 text-zinc-800">Insert</button>
                    </div>
                </div>
            </div>
            
        </div>
        </div>, document.body 
    )

    return {
        imagePopUp,
        imageAddress,
        imageWidth
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
            <label className="block text-textSecondary text-sm font-bold mb-2">
            {label}
            </label>
            <input className="rounded py-2 px-3 text-textSecondary bg-bkgSecondary leading-tight border-2 border-zinc-800 focus:border-indigo-500 
            focus:outline-none focus:shadow-outline w-80" 
            id="username" type="text" placeholder={placeholder} onChange={event => setInputText(event.target.value)} />
        </div>
    )

}

export type NumberFormInputFieldProps = ComponentProps<'div'> & {
    label: string,
    placeholder: string,
    setInputText(title: string)
}

export const NumberFormInputField = ({label, placeholder, setInputText, ...props}: NumberFormInputFieldProps) => {

    return (
        <div {...props}>
            <label className="block text-textSecondary text-sm font-bold mb-2">
            {label}
            </label>
            <input className="rounded py-2 px-3 text-textSecondary bg-bkgSecondary leading-tight border-2 border-zinc-800 focus:border-indigo-500 
            focus:outline-none focus:shadow-outline w-24" 
            id="username" type="number" min="0" placeholder={placeholder} onChange={event => setInputText(event.target.value)} />
        </div>
    )

}
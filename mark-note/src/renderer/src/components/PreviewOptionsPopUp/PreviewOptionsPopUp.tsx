import { useEffect } from 'react';
import { MdClose } from "react-icons/md";
import { ComponentProps, forwardRef } from "react"
import { createPortal } from 'react-dom';
import { forceSettings} from '@renderer/hooks/useSettingsList'


export const PreviewOptionsPopUpModal = (props) => {

    if(!props.visible) return null
    
    return createPortal(
        <div className="fixed inset-0 flex justify-end">
            <div className="mt-10 flex flex-col gap-2 text-white">
                <button onClick={props.onClose} className="place-self-end"><MdClose size={24} /></button>
                <div className="bg-zinc-600 rounded-lg px-2 py-1 flex flex-col gap-5 mx-4">
                    <button>Export as PDF</button>
                    <button>Option 2</button>
                </div>
            </div>
        </div>, document.body     
    )
}
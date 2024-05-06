import { useEffect } from 'react';
import { MdClose } from "react-icons/md";
import { ComponentProps, forwardRef } from "react"
import { twMerge } from "tailwind-merge"
import { SettingsOptionsViewList } from "./SettingOptionViewList";
import { SettingsContentView } from "./SettingsContentView";
import { createPortal } from 'react-dom';
import { forceSettings} from '@renderer/hooks/useSettingsList'


export const SettingsPopUpModal = (props) => {

    if(!props.visible) return null

    const {forceSetOptionIndex} = forceSettings()

    // put into useffect hook
    useEffect(() => {
        forceSetOptionIndex(0)
      }, [props.visible]);
    

    return createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center z-20">
            <div className="mt-10 flex flex-col gap-2 text-white">
                <button onClick={props.onClose} className="place-self-end"><MdClose size={24}/></button>
                <div className="bg-zinc-600 rounded-lg px-2 py-1 flex flex-row gap-5 mx-4">
                    <SettingsSidebar className="bg-zinc-900 rounded-lg">
                        <SettingsOptionsViewList className = "mt-3 space-y-1"/> 
                    </SettingsSidebar>

                    <SettingsContent>
                    <SettingsContentView />
                    </SettingsContent>
                </div>
            </div>
            
        </div>, document.body 
    )
}

export const SettingsBackground = ({children, className, ...props}: ComponentProps<'main'>) => {
    return (
        <main className={twMerge('fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center', className)} {...props}>
            {children}
        </main>
    )
}

export const SettingsSidebar = ({className, children, ...props}: ComponentProps<'aside'>) => {
    return (
        <aside 
            className={twMerge('w-[180px] h-[70vh + 10px] overflow-auto', className)}
            {...props}
        >
            {children}
        </aside>
    )
}

export const SettingsContent = ({className, children, ...props}: ComponentProps<'aside'>) => {
    return (
        <aside 
            className={twMerge('w-[440px] h-[70vh + 10px] overflow-auto', className)}
            {...props}
        >
            {children}
        </aside>
    )
}

import { useEffect } from 'react';
import { MdClose } from "react-icons/md";
import { ComponentProps, forwardRef } from "react"
import { twMerge } from "tailwind-merge"
import { SettingsOptionsViewList } from "./SettingOptionViewList";
import { SettingsContentView } from "./SettingsContentView";
import { createPortal } from 'react-dom';
import { forceSettings} from '@renderer/hooks/useSettingsList'


export const SettingsPopUpModal = (props) => {

    
    const {forceSetOptionIndex} = forceSettings()

    // put into useffect hook
    useEffect(() => {
        forceSetOptionIndex(0)
      }, [props.visible]);

      if(!props.visible) return null
    

    return createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center z-20">
            <div className="mt-10 flex flex-col gap-2 text-white">
                <button onClick={props.onClose} className="place-self-end"><MdClose size={24}/></button>
                <div className="bg-zinc-600 border-2 border-zinc-500 rounded-md flex flex-row gap-5 mx-4 h-[32rem]">
                    <SettingsSidebar className="rounded-l-md bg-zinc-900/75">
                        <SettingsOptionsViewList className = ""/> 
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

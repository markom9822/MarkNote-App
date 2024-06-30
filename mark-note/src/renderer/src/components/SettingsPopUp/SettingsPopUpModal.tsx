import { MdClose } from "react-icons/md";
import { ComponentProps, useEffect, useRef } from "react"
import { twMerge } from "tailwind-merge"
import { SettingsOptionsViewList } from "./SettingOptionViewList";
import { SettingsContentView } from "./SettingsContentView";
import { createPortal } from 'react-dom';
import { forceSettings} from '@renderer/hooks/useSettingsList'


export const SettingsPopUpModal = (props) => {
    const {forceSetOptionIndex} = forceSettings()
    const menuRef = useRef(null);

    const closeModal = (e) => {
        if(menuRef.current == e.target)
        {
            props.onClose()
        }
    }

    useEffect(() => {
        forceSetOptionIndex(0)
      }, [props.visible]);

      if(!props.visible) return null
    

    return createPortal(
        <div className={props.uiTheme}>
        <div ref={menuRef} onClick={closeModal} className="fixed inset-0 bg-black bg-opacity-70 flex justify-center z-20">
            <div className="mt-10 flex flex-col gap-2 text-white"> 
                <div className="bg-bkgSecondary border-2 border-zinc-500 rounded-md flex flex-row gap-5 mx-4 h-[32rem]">
                    <SettingsSidebar className="rounded-l-md bg-bkgPrimary/75 border-r border-zinc-500">
                        <SettingsOptionsViewList className = ""/> 
                    </SettingsSidebar>

                    <SettingsContent>
                        <div className='flex justify-end sticky top-0 bg-bkgSecondary rounded-md'>
                            <button onClick={props.onClose} className='px-0.5 py-0.5 text-iconPrimary'><MdClose size={17}/></button>
                        </div>
                    <SettingsContentView />
                    </SettingsContent>
                </div>
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

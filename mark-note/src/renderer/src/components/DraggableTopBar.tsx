import { IoMdClose } from "react-icons/io";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import { useSetAtom } from "jotai"
import { closeAppAtom, minimiseAppAtom } from "@renderer/store";

import icon from '@/store/MarkNoteLogoPixel_copy.png'


export const DraggableTopBar = () => {
    const closeAppMethod = useSetAtom(closeAppAtom)
    const minimiseAppMethod = useSetAtom(minimiseAppAtom)

    return (
        <div className="flex border-b border-zinc-600 bg-zinc-700">
            <img className="mx-2 my-1 w-6 h-6" src={icon}/>
            <header className="inset-0 w-full h-8"/>
            <MinimiseButton onClick={minimiseAppMethod}>
                <MdOutlineHorizontalRule className="text-zinc-300"/>
            </MinimiseButton>
            <CloseButton onClick={closeAppMethod}>
                <IoMdClose className="text-zinc-300"/>
            </CloseButton>
        </div>
    
    )
}

export type MinimiseButtonProps = ComponentProps<'button'>

export const MinimiseButton = ({className, children, ...props}: MinimiseButtonProps) => {
    return <button className={twMerge('px-4 py-1 hover:bg-zinc-900/75 transition-colors duration-100', className
    )} {...props}
    >
        {children}
    </button>
}

export type CloseButtonProps = ComponentProps<'button'>

export const CloseButton = ({className, children, ...props}: CloseButtonProps) => {
    return <button className={twMerge('px-4 py-1 hover:bg-indigo-800 transition-colors duration-100', className
    )} {...props}
    >
        {children}
    </button>
}
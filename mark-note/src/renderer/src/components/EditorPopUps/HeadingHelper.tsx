import { cn } from "@renderer/utils"
import { ComponentProps, useState, useRef } from "react"
import { twMerge } from "tailwind-merge"
import { createPortal } from 'react-dom';
import { EditorView} from '@codemirror/view'
import { LuHeading1, LuHeading2, LuHeading3, LuHeading4 } from "react-icons/lu";
import { InsertTextAtStartInEditor } from "../MarkdownEditorToolBar";

export const HeadingHelperButton = ({className, children, ...props}: ComponentProps<'button'>) => {
    return <button className={cn('cursor-pointer text-textPrimary border border-bkgPrimary rounded-md hover:border-indigo-500 px-2 py-1', className
    )} {...props}
    >
        {children}
    </button>
}


export type HeadingHelperPopUpModalProps = {
    onToggle: () => void;
    visible: boolean,
    editorView: EditorView | null | undefined;
    uiTheme: string
}

export const HeadingHelperPopUpModal  = ({
    onToggle,
    visible,
    editorView,
    uiTheme,
}: HeadingHelperPopUpModalProps) => {
    const menuRef = useRef(null);

    const closeModal = (e) => {
        if(menuRef.current == e.target)
        {
            onToggle()
        }
    }

    const handleCreateHeading = (pickedHeading: string) => {
        if(editorView == null) return 
        if(editorView == undefined) return

        InsertTextAtStartInEditor(pickedHeading, editorView, false)
    }

    const handleClickHeadingHelper = (changeEvent) => {
        handleCreateHeading(changeEvent.currentTarget.value)
        onToggle()
    }


    if(!visible) return null

    return(createPortal(
        <div className={uiTheme}>
        <div ref={menuRef} onClick={closeModal} className="absolute inset-0 bottom-0 left-0 right-0 w-full top-0 z-10">
            <div className="w-10 ml-[220px] mt-[180px]">
                <div className="bg-bkgPrimary rounded-md flex flex-col border border-indigo-500">
                    <div className='flex flex-col'>
                        <HeadingHelperButton value="# " onClick={handleClickHeadingHelper}><LuHeading1 className="w-[1.6rem] h-[1.6rem]"/></HeadingHelperButton>
                        <HeadingHelperButton value="## " onClick={handleClickHeadingHelper}><LuHeading2 className="w-[1.4rem] h-[1.4rem]"/></HeadingHelperButton>
                        <HeadingHelperButton value="### " onClick={handleClickHeadingHelper}><LuHeading3 className="w-[1.2rem] h-[1.2rem]"/></HeadingHelperButton>
                        <HeadingHelperButton value="#### " onClick={handleClickHeadingHelper}><LuHeading4 className="w-[1rem] h-[1rem]"/></HeadingHelperButton>
                    </div>
                </div>
            </div>
            
        </div>
        </div>, document.body 
    ))
}


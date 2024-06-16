import { cn } from "@renderer/utils"
import { ComponentProps, useState, useRef } from "react"
import { twMerge } from "tailwind-merge"
import { createPortal } from 'react-dom';
import { InsertTextAroundInEditor, InsertTextInEditor } from "../MarkdownEditorToolBar";
import { EditorView} from '@codemirror/view'
import { FaTable } from "react-icons/fa6";
import { RxDividerHorizontal } from "react-icons/rx";
import { BiHighlight } from "react-icons/bi";
import { PiMathOperations } from "react-icons/pi";

export const MoreOptionsButton = ({className, children, ...props}: ComponentProps<'button'>) => {
    return <button className={cn('cursor-pointer border border-zinc-900 rounded-md hover:border-indigo-500 px-2 py-1', className
    )} {...props}
    >
        {children}
    </button>
}


export type MoreOptionsPopUpModalProps = {
    onToggle: () => void;
    OnClickTableOption: () => void,
    visible: boolean,
    editorView: EditorView | null | undefined;
}

export const MoreOptionsPopUpModal  = ({
    onToggle,
    OnClickTableOption,
    visible,
    editorView,
}: MoreOptionsPopUpModalProps) => {
    const menuRef = useRef(null);

    const closeModal = (e) => {
        if(menuRef.current == e.target)
        {
            onToggle()
        }
    }

    const handleCreateDivider = async () => {
        if(editorView == null) return 
        if(editorView == undefined) return

        InsertTextInEditor("---", editorView, false)
        onToggle()
    }

    const handleCreateHighlightText = async () => {
        if(editorView == null) return 
        if(editorView == undefined) return

        InsertTextAroundInEditor("**==**", editorView, true)
        onToggle()
    }

    const handleCreateMathsText = async () => {
        if(editorView == null) return 
        if(editorView == undefined) return

        InsertTextAroundInEditor("$$$$", editorView, true)
        onToggle()
    }


    if(!visible) return null

    return(createPortal(
        <div ref={menuRef} onClick={closeModal} className="absolute inset-0 bottom-0 left-0 right-0 w-full top-0 z-10 border">
            <div className="w-[100px] ml-[630px] mt-[180px]">
                <div className="bg-zinc-900 rounded-md flex flex-col border border-indigo-500">
                    <div className='flex flex-col'>
                        <MoreOptionsButton onClick={OnClickTableOption}>
                            <div className="flex space-x-2 items-center">
                                <FaTable className="text-zinc-400"/>
                                <span className="text-xs">Table</span>
                            </div>
                        </MoreOptionsButton>
                        <MoreOptionsButton onClick={handleCreateDivider}>
                            <div className="flex space-x-2 items-center">
                                <RxDividerHorizontal className="text-zinc-100"/>
                                <span className="text-xs">Divider</span>
                            </div>
                        </MoreOptionsButton>
                        <MoreOptionsButton onClick={handleCreateHighlightText}>
                            <div className="flex space-x-2 items-center">
                                <BiHighlight className="text-zinc-100"/>
                                <span className="text-xs">Highlight</span>
                            </div>
                        </MoreOptionsButton>
                        <MoreOptionsButton onClick={handleCreateMathsText}>
                            <div className="flex space-x-2 items-center">
                                <PiMathOperations className="text-zinc-100"/>
                                <span className="text-xs">Maths</span>
                            </div>
                        </MoreOptionsButton>
                    </div>
                </div>
            </div>
            
        </div>, document.body 
    ))
}


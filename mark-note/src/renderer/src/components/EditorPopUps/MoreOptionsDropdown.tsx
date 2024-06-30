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
import { BsSubscript, BsSuperscript } from "react-icons/bs";

export const MoreOptionsButton = ({className, children, ...props}: ComponentProps<'button'>) => {
    return <button className={cn('cursor-pointer border border-bkgPrimary rounded-md hover:border-indigo-500 px-2 py-1', className
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
    uiTheme: string,
}

export const MoreOptionsPopUpModal  = ({
    onToggle,
    OnClickTableOption,
    visible,
    editorView,
    uiTheme,
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

    const handleCreateSuperscript = async () => {
        if(editorView == null) return 
        if(editorView == undefined) return

        InsertTextAroundInEditor("<sup></sup>", editorView, true)
        onToggle()
    }

    const handleCreateSubscript = async () => {
        if(editorView == null) return 
        if(editorView == undefined) return

        InsertTextAroundInEditor("<sub></sub>", editorView, true)
        onToggle()
    }

    if(!visible) return null

    return(createPortal(
        <body className={uiTheme}>
        <div ref={menuRef} onClick={closeModal} className="absolute inset-0 bottom-0 left-0 right-0 w-full top-0 z-10">
            <div className="w-[120px] ml-[610px] mt-[180px]">
                <div className="bg-bkgPrimary rounded-md flex flex-col border border-indigo-500">
                    <div className='flex flex-col'>
                        <MoreOptionsButton onClick={OnClickTableOption}>
                            <div className="flex space-x-2 items-center">
                                <FaTable className="text-iconPrimary"/>
                                <span className="text-xs text-textPrimary">Table</span>
                            </div>
                        </MoreOptionsButton>
                        <MoreOptionsButton onClick={handleCreateDivider}>
                            <div className="flex space-x-2 items-center">
                                <RxDividerHorizontal className="text-iconPrimary"/>
                                <span className="text-xs text-textPrimary">Divider</span>
                            </div>
                        </MoreOptionsButton>
                        <MoreOptionsButton onClick={handleCreateHighlightText}>
                            <div className="flex space-x-2 items-center">
                                <BiHighlight className="text-iconPrimary"/>
                                <span className="text-xs text-textPrimary">Highlight</span>
                            </div>
                        </MoreOptionsButton>
                        <MoreOptionsButton onClick={handleCreateMathsText}>
                            <div className="flex space-x-2 items-center">
                                <PiMathOperations className="text-iconPrimary"/>
                                <span className="text-xs text-textPrimary">Maths</span>
                            </div>
                        </MoreOptionsButton>
                        <MoreOptionsButton onClick={handleCreateSuperscript}>
                            <div className="flex space-x-2 items-center">
                                <BsSuperscript className="text-iconPrimary"/>
                                <span className="text-xs text-textPrimary">Superscript</span>
                            </div>
                        </MoreOptionsButton>
                        <MoreOptionsButton onClick={handleCreateSubscript}>
                            <div className="flex space-x-2 items-center">
                                <BsSubscript className="text-iconPrimary"/>
                                <span className="text-xs text-textPrimary">Subscript</span>
                            </div>
                        </MoreOptionsButton>
                    </div>
                </div>
            </div>
            
        </div>
        </body>, document.body 
    ))
}


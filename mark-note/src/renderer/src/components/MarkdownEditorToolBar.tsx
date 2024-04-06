import { selectedNoteAtom } from "@renderer/store"
import { useAtomValue } from "jotai"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import { EditorView} from '@codemirror/view'
import {useState} from 'react'

import { PiHash } from "react-icons/pi";
import { TbBold, TbItalic } from "react-icons/tb";
import { RiStrikethrough, RiUnderline } from "react-icons/ri";
import { IoCode } from "react-icons/io5";
import { CiCircleList, CiImageOn } from "react-icons/ci";
import { VscListOrdered } from "react-icons/vsc";
import { IoIosCheckboxOutline, IoIosLink } from "react-icons/io";
import { TfiQuoteLeft } from "react-icons/tfi";
import { BsEmojiSmile } from "react-icons/bs";
import { ButtonTooltip } from "./Button"
import { TfiMore } from "react-icons/tfi";
import { LinkFormatPopUpModal } from "@/components";

export type MarkdownEditorToolbarProps = ComponentProps<'div'> & {
    editorView: EditorView | null | undefined;
}

export const MarkdownEditorToolBar = ({editorView, className, ...props}: MarkdownEditorToolbarProps) => {
    const selectedNote = useAtomValue(selectedNoteAtom)
    const [showLinkFormat, setShowLinkFormat] = useState(false)
    const handleLinkFormatOnClose = () => setShowLinkFormat(false)

    if(!selectedNote) return null

   return (
    <div className={twMerge('flex justify-center flex-row bg-zinc-700/90', className)} {...props}>
        <ButtonTooltip message="Heading">
            <HeadingButton editorView={editorView} /> 
        </ButtonTooltip>

        <ButtonTooltip message="Bold">
            <BoldedButton editorView={editorView}/>
        </ButtonTooltip>

        <ButtonTooltip message="Italic">
            <ItalicButton editorView={editorView}/>
        </ButtonTooltip>

        <ButtonTooltip message="Strikethrough">
            <StrikethroughButton editorView={editorView}/>
        </ButtonTooltip>

        <ButtonTooltip message="Underline">
            <UnderlineButton editorView={editorView}/>
        </ButtonTooltip>

        <ButtonTooltip message="Code">
            <CodeSegmentButton editorView={editorView}/>
        </ButtonTooltip>

        <ButtonTooltip message="Unordered List">
            <UnorderdListButton editorView={editorView}/>
        </ButtonTooltip>
        
        <ButtonTooltip message="Ordered List">
            <OrderdListButton editorView={editorView}/>
        </ButtonTooltip>
        
        <ButtonTooltip message="Checkbox">
            <CheckBoxButton editorView={editorView}/>
        </ButtonTooltip>
        
        <ButtonTooltip message="Quotation">
            <QuoteButton editorView={editorView}/>
        </ButtonTooltip>
        
        <ButtonTooltip message="Link">
            <LinkButton editorView={editorView} onClick={() => setShowLinkFormat(true)}/>
        </ButtonTooltip>

        <ButtonTooltip message="Image">
            <ImageButton editorView={editorView}/>
        </ButtonTooltip>
        
        <ButtonTooltip message="Emoji">
            <EmojiButton editorView={editorView}/>
        </ButtonTooltip>

        <ButtonTooltip message="More options">
            <MoreOptionsButton editorView={editorView}/>
        </ButtonTooltip>

        <LinkFormatPopUpModal onClose={handleLinkFormatOnClose} visible={showLinkFormat}/>
    </div>
   ) 
}

export type ToolBarButtonProps = ComponentProps<'button'> & {
    editorView: EditorView | null | undefined;
}

export const ToolBarButton = ({editorView, className, children, ...props}: ToolBarButtonProps) => {
    return <button className={twMerge('px-2 py-1 rounded-md hover:bg-zinc-600/50 transition-colors duration-100', className
    )} {...props}
    >
        {children}
    </button>
}

export const InsertTextInEditor = (text: string, view: EditorView, cursorInCentre: boolean) => {
    const cursor = view.state.selection.main.head;

    let anchorPos = 0;
    if(cursorInCentre)
    {
        anchorPos = cursor + (text.length*0.5);
    }
    else{
        anchorPos = cursor + text.length;
    }

    const transaction = view.state.update({
        changes: {
        from: cursor,
        insert: text,
        },
        // the next 2 lines will set the appropriate cursor position after inserting the new text.
        
        selection: { anchor: anchorPos},
        scrollIntoView: true,
    });

    view.focus();

    if (transaction) {
        view.dispatch(transaction);
    }
}

export const HeadingButton = ({editorView, ...props}: ToolBarButtonProps) => {

    const handleCreateHeading = async () => {

        if(editorView == null) return 
        if(editorView == undefined) return

        InsertTextInEditor("# ", editorView, false)
    }

    return (
        <ToolBarButton editorView={editorView} onClick={handleCreateHeading} {...props}>
            <PiHash className="w-4 h-4 text-zinc-100"/>
        </ToolBarButton>
    )
}

export const BoldedButton = ({editorView, ...props}: ToolBarButtonProps) => {

    const handleCreateBolded = async () => {
        if(editorView == null) return 
        if(editorView == undefined) return

        InsertTextInEditor("****", editorView, true)
    }

    return (
        <ToolBarButton editorView={editorView} onClick={handleCreateBolded} {...props}>
            <TbBold className="w-4 h-4 text-zinc-100"/>
        </ToolBarButton>
    )
}

export const ItalicButton = ({editorView, ...props}: ToolBarButtonProps) => {

    const handleCreateItalic = async () => {
        if(editorView == null) return 
        if(editorView == undefined) return

        InsertTextInEditor("**", editorView, true)
    }

    return (
        <ToolBarButton editorView={editorView} onClick={handleCreateItalic} {...props}>
            <TbItalic className="w-4 h-4 text-zinc-100"/>
        </ToolBarButton>
    )
}

export const StrikethroughButton = ({editorView, ...props}: ToolBarButtonProps) => {

    const handleCreateStrikethrough = async () => {
        if(editorView == null) return 
        if(editorView == undefined) return

        InsertTextInEditor("~~~~", editorView, true)
    }

    return (
        <ToolBarButton editorView={editorView} onClick={handleCreateStrikethrough} {...props}>
            <RiStrikethrough className="w-4 h-4 text-zinc-100"/>
        </ToolBarButton>
    )
}

export const UnderlineButton = ({editorView, ...props}: ToolBarButtonProps) => {

    const handleCreateUnderline = async () => {
        if(editorView == null) return 
        if(editorView == undefined) return

        InsertTextInEditor("____", editorView, true)
    }

    return (
        <ToolBarButton editorView={editorView} onClick={handleCreateUnderline} {...props}>
            <RiUnderline className="w-4 h-4 text-zinc-100"/>
        </ToolBarButton>
    )
}

export const CodeSegmentButton = ({editorView, ...props}: ToolBarButtonProps) => {

    const handleCreateCodeSegment = async () => {
        if(editorView == null) return 
        if(editorView == undefined) return

        InsertTextInEditor("```" + "\n" + "\n" +"```", editorView, true)
    }

    return (
        <ToolBarButton editorView={editorView} onClick={handleCreateCodeSegment} {...props}>
            <IoCode className="w-4 h-4 text-zinc-100"/>
        </ToolBarButton>
    )
}

export const UnorderdListButton = ({editorView, ...props}: ToolBarButtonProps) => {

    const handleCreateUnorderedList = async () => {
        if(editorView == null) return 
        if(editorView == undefined) return

        InsertTextInEditor("- ", editorView, false)
    }

    return (
        <ToolBarButton editorView={editorView} onClick={handleCreateUnorderedList} {...props}>
            <CiCircleList className="w-4 h-4 text-zinc-100"/>
        </ToolBarButton>
    )
}

export const OrderdListButton = ({editorView, ...props}: ToolBarButtonProps) => {

    const handleCreateOrderedList = async () => {
        if(editorView == null) return 
        if(editorView == undefined) return

        InsertTextInEditor("1. ", editorView, false)
    }

    return (
        <ToolBarButton editorView={editorView} onClick={handleCreateOrderedList} {...props}>
            <VscListOrdered className="w-4 h-4 text-zinc-100"/>
        </ToolBarButton>
    )
}

export const CheckBoxButton = ({editorView, ...props}: ToolBarButtonProps) => {

    const handleCreateCheckBox = async () => {
        if(editorView == null) return 
        if(editorView == undefined) return

        InsertTextInEditor("- [ ] ", editorView, false)
    }

    return (
        <ToolBarButton editorView={editorView} onClick={handleCreateCheckBox} {...props}>
            <IoIosCheckboxOutline className="w-4 h-4 text-zinc-100"/>
        </ToolBarButton>
    )
}

export const QuoteButton = ({editorView, ...props}: ToolBarButtonProps) => {

    const handleCreateQuote = async () => {
        if(editorView == null) return 
        if(editorView == undefined) return

        InsertTextInEditor("> ", editorView, false)
    }

    return (
        <ToolBarButton editorView={editorView} onClick={handleCreateQuote} {...props}>
            <TfiQuoteLeft className="w-4 h-4 text-zinc-100"/>
        </ToolBarButton>
    )
}

export const LinkButton = ({...props}: ToolBarButtonProps) => {

    const handleCreateLink = async () => {
    }

    return (
        <ToolBarButton onClick={handleCreateLink} {...props}>
            <IoIosLink className="w-4 h-4 text-zinc-100"/>
        </ToolBarButton>
    )
}

export const ImageButton = ({...props}: ToolBarButtonProps) => {

    const handleCreateImage = async () => {
    }

    return (
        <ToolBarButton onClick={handleCreateImage} {...props}>
            <CiImageOn className="w-4 h-4 text-zinc-100"/>
        </ToolBarButton>
    )
}

export const EmojiButton = ({editorView, ...props}: ToolBarButtonProps) => {

    const handleCreateEmoji = async () => {
        if(editorView == null) return 
        if(editorView == undefined) return

        InsertTextInEditor("::", editorView, true)
    }

    return (
        <ToolBarButton editorView={editorView} onClick={handleCreateEmoji} {...props}>
            <BsEmojiSmile className="w-4 h-4 text-zinc-100"/>
        </ToolBarButton>
    )
}

export const MoreOptionsButton = ({editorView, ...props}: ToolBarButtonProps) => {

    const handleMoreOptions = async () => {
    

    }

    return (
        <ToolBarButton editorView={editorView} onClick={handleMoreOptions} {...props}>
            <TfiMore className="w-4 h-4 text-zinc-100"/>
        </ToolBarButton>
    )
}


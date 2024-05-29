import { selectedNoteAtom } from "@renderer/store"
import { useAtomValue } from "jotai"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import { EditorView} from '@codemirror/view'
import {useState} from 'react'

import { LuHeading, LuHeading1, LuHeading2, LuHeading3, LuHeading4 } from "react-icons/lu";
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
import { EmojiPicker, LinkFormatPopUpModal, EmojiFilterButton, HeadingHelperButton } from "@/components";
import { OnPasteLinkFormatPopUpModal } from "./EditorPopUps/OnPasteLinkFormatPopUp"
import { FaRegFaceSmile, FaBurger, FaRegBuilding } from "react-icons/fa6";
import { FaMountain } from "react-icons/fa";
import { MdOutlineEmojiSymbols } from "react-icons/md";
import { ImageFormatPopUpModal } from "./EditorPopUps/ImageFormatPopUp"


export type MarkdownEditorToolbarProps = ComponentProps<'div'> & {
    editorView: EditorView | null | undefined;
}

export const MarkdownEditorToolBar = ({editorView, className, ...props}: MarkdownEditorToolbarProps) => {
    const selectedNote = useAtomValue(selectedNoteAtom)
    const [showLinkFormat, setShowLinkFormat] = useState(false)
    const [showImageFormat, setShowImageFormat] = useState(false)

    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [showOptionsMenu, setShowOptionsMenu] = useState(false)

    const [showHeadingHelper, setShowHeadingHelper] = useState(false)

    const handleLinkFormatOnClose = () => setShowLinkFormat(false)

    const handleImageFormatOnClose = () => setShowImageFormat(false)

    const handleClickLinkInsert = () => {
        if(editorView == null) return 
        if(editorView == undefined) return
        if(linkFormatPopUpModal?.linkTitle == undefined) return
        if(linkFormatPopUpModal?.linkAddress == undefined) return

        const linkTitleString = "[" + linkFormatPopUpModal?.linkTitle.toString() + "]";
        const linkAddressString = "(" + linkFormatPopUpModal?.linkAddress.toString() + ")";

        InsertTextInEditor(linkTitleString + linkAddressString, editorView, false)
    }

    const handleClickImageInsert = () => {
        if(editorView == null) return 
        if(editorView == undefined) return
        if(imageFormatPopUpModal?.imageAddress == undefined) return
        if(imageFormatPopUpModal?.imageWidth == undefined) return

        const imageAddressString = '<img src=\"' + imageFormatPopUpModal?.imageAddress.toString() + '\" ';
        const imageWidthString = 'width=\"' + imageFormatPopUpModal?.imageWidth.toString() + '\">';

        InsertTextInEditor(imageAddressString + imageWidthString, editorView, false)
    }

    const linkFormatPopUpModal = LinkFormatPopUpModal({
        onClose: handleLinkFormatOnClose,
        onClickInsert: handleClickLinkInsert,
        visible: showLinkFormat
    })

    const imageFormatPopUpModal = ImageFormatPopUpModal({
        onClose: handleImageFormatOnClose,
        onClickInsert: handleClickImageInsert,
        visible: showImageFormat
    })

    if(!selectedNote) return null

   return (
    <div className={twMerge('flex flex-row bg-zinc-800', className)} {...props}>

        <HeadingButton editorView={editorView} handleClickHeaderButton={() => setShowHeadingHelper((prev) => !prev)} handlePickedHeading={() => setShowHeadingHelper(false)} headingHelperOpen={showHeadingHelper} /> 
        <BoldedButton editorView={editorView}/>
        <ItalicButton editorView={editorView}/>
        <StrikethroughButton editorView={editorView}/>
        <UnderlineButton editorView={editorView}/>
        <CodeSegmentButton editorView={editorView}/>
        <UnorderdListButton editorView={editorView}/>
        <OrderedListButton editorView={editorView}/>
        <CheckBoxButton editorView={editorView}/>
        <QuoteButton editorView={editorView}/>

        <div>
            {linkFormatPopUpModal?.linkPopUp}
        </div>
        
        <LinkButton editorView={editorView} onClick={() => setShowLinkFormat(true)}/>

        <div>
            {imageFormatPopUpModal?.imagePopUp}
        </div>

        <ImageButton editorView={editorView} onClick={() => setShowImageFormat(true)}/>
        <EmojiButton editorView={editorView} handleClickEmojiButton={() => setShowEmojiPicker((prev) => !prev)} emojiPickerOpen={showEmojiPicker}/>
        <MoreOptionsButton editorView={editorView} handleClickOptionsButton={() => setShowOptionsMenu((prev) => !prev)} moreOptionsOpen={showOptionsMenu}/>
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

export const InsertTextAroundInEditor = (text: string, view: EditorView, cursorInCentre: boolean) => {
    const cursor = view.state.selection.main.head;
    const selectionFrom = view.state.selection.main.from;
    const selectionTo = view.state.selection.main.to;

    const selectedText = view.state.sliceDoc(selectionFrom, selectionTo);

    console.info(`Selected Text: ${selectedText}`)

    let anchorPos = 0;
    if(cursorInCentre)
    {
        anchorPos = cursor + (text.length*0.5);
    }
    else{
        anchorPos = cursor + text.length;
    }

    var transaction;

    if(selectedText !== "")
    {
        console.info("Text Selected")

        const textToInsert = text.substring(0, text.length/2) + selectedText + text.substring(text.length/2, text.length)

        transaction = view.state.update({
            changes: {
            from: cursor - selectedText.length,
            to: cursor,
            insert: textToInsert,
            },
            // the next 2 lines will set the appropriate cursor position after inserting the new text.
            
            selection: { anchor: anchorPos},
            scrollIntoView: true,
        });
    }
    else
    {
        console.info("No Text Selected")

        transaction = view.state.update({
            changes: {
            from: cursor,
            insert: text,
            },
            // the next 2 lines will set the appropriate cursor position after inserting the new text.
            
            selection: { anchor: anchorPos},
            scrollIntoView: true,
        });

    }

    view.focus();

    if (transaction) {
        view.dispatch(transaction);
    }
}

export const InsertTextAtStartInEditor = (text: string, view: EditorView, cursorInCentre: boolean) => {
    const cursor = view.state.selection.main.head;
    const selectionFrom = view.state.selection.main.from;
    const selectionTo = view.state.selection.main.to;

    const selectedText = view.state.sliceDoc(selectionFrom, selectionTo);

    console.info(`Selected Text: ${selectedText}`)

    let anchorPos = 0;
    if(cursorInCentre)
    {
        anchorPos = cursor + (text.length*0.5);
    }
    else{
        anchorPos = cursor + text.length;
    }

    var transaction;

    if(selectedText !== "")
    {
        console.info("Text Selected")

        const textToInsert = text + selectedText
        transaction = view.state.update({
            changes: {
            from: cursor - selectedText.length,
            to: cursor,
            insert: textToInsert,
            },
            // the next 2 lines will set the appropriate cursor position after inserting the new text.
            
            selection: { anchor: anchorPos},
            scrollIntoView: true,
        });
    }
    else
    {
        console.info("No Text Selected")

        transaction = view.state.update({
            changes: {
            from: cursor,
            insert: text,
            },
            // the next 2 lines will set the appropriate cursor position after inserting the new text.
            
            selection: { anchor: anchorPos},
            scrollIntoView: true,
        });

    }

    view.focus();

    if (transaction) {
        view.dispatch(transaction);
    }
}

export type HeadingButtonProps = ComponentProps<'button'> & {
    editorView: EditorView | null | undefined;
    headingHelperOpen: boolean,
    handleClickHeaderButton: () => void,
    handlePickedHeading: () => void,
}

export const HeadingButton = ({editorView, headingHelperOpen, handleClickHeaderButton, handlePickedHeading, ...props}: HeadingButtonProps) => {

    const handleCreateHeading = (pickedHeading: string) => {
        if(editorView == null) return 
        if(editorView == undefined) return

        InsertTextAtStartInEditor(pickedHeading, editorView, false)
    }

    const handleClickHeadingHelper = (changeEvent) => {
        handleCreateHeading(changeEvent.currentTarget.value)
        handlePickedHeading()
    }

    return (
        <div className="relative flex flex-col">
            <div>
                <ToolBarButton editorView={editorView} onClick={handleClickHeaderButton} {...props}>
                    <LuHeading className="w-4 h-4 text-zinc-100"/>
                </ToolBarButton>
                </div>
                {headingHelperOpen && (
                <div className="absolute bg-zinc-900 top-7 rounded-lg overflow-auto">
                    <div className="divide-zinc-400 divide-y-2">
                        <div className="flex flex-col justify-center space-x-0.5 ">
                            <HeadingHelperButton onClick={handleClickHeadingHelper} value="# "><LuHeading1 className="w-[1.6rem] h-[1.6rem]"/></HeadingHelperButton>
                            <HeadingHelperButton onClick={handleClickHeadingHelper} value="## "><LuHeading2 className="w-[1.4rem] h-[1.4rem]"/></HeadingHelperButton>
                            <HeadingHelperButton onClick={handleClickHeadingHelper} value="### "><LuHeading3 className="w-[1.2rem] h-[1.2rem]"/></HeadingHelperButton>
                            <HeadingHelperButton onClick={handleClickHeadingHelper} value="#### "><LuHeading4 className="w-[1rem] h-[1rem]"/></HeadingHelperButton>
                        </div>
                </div>     
            </div>
        )}
    </div>
    )
}

export const BoldedButton = ({editorView, ...props}: ToolBarButtonProps) => {

    const handleCreateBolded = async () => {
        if(editorView == null) return 
        if(editorView == undefined) return

        InsertTextAroundInEditor("****", editorView, true)
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

        InsertTextAroundInEditor("**", editorView, true)
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

        InsertTextAroundInEditor("~~~~", editorView, true)
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

        InsertTextAroundInEditor("____", editorView, true)
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

        InsertTextAroundInEditor("```" + "\n" + "\n" +"```", editorView, true)
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

        InsertTextAtStartInEditor("- ", editorView, false)
    }

    return (
        <ToolBarButton editorView={editorView} onClick={handleCreateUnorderedList} {...props}>
            <CiCircleList className="w-4 h-4 text-zinc-100"/>
        </ToolBarButton>
    )
}

export const OrderedListButton = ({editorView, ...props}: ToolBarButtonProps) => {

    const handleCreateOrderedList = async () => {
        if(editorView == null) return 
        if(editorView == undefined) return

        InsertTextAtStartInEditor("1. ", editorView, false)
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

        InsertTextAtStartInEditor("- [ ] ", editorView, false)
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

        InsertTextAtStartInEditor("> ", editorView, false)
    }

    return (
        <ToolBarButton editorView={editorView} onClick={handleCreateQuote} {...props}>
            <TfiQuoteLeft className="w-4 h-4 text-zinc-100"/>
        </ToolBarButton>
    )
}

export const LinkButton = ({...props}: ToolBarButtonProps) => {

    return (
        <ToolBarButton {...props}>
            <IoIosLink className="w-4 h-4 text-zinc-100"/>
        </ToolBarButton>
    )
}

export const ImageButton = ({...props}: ToolBarButtonProps) => {

    return (
        <ToolBarButton {...props}>
            <CiImageOn className="w-4 h-4 text-zinc-100"/>
        </ToolBarButton>
    )
}

export type EmojiButtonProps = ComponentProps<'button'> & {
    editorView: EditorView | null | undefined;
    emojiPickerOpen: boolean,
    handleClickEmojiButton: () => void,
}

export const EmojiButton = ({editorView, emojiPickerOpen, handleClickEmojiButton, ...props}: EmojiButtonProps) => {
    const [emojiType, setEmojiType] = useState('people');

    const handleCreateEmoji = (pickedEmojiName: string) => {
        if(editorView == null) return 
        if(editorView == undefined) return

        InsertTextInEditor(':' + pickedEmojiName + ':', editorView, false)
    }

    const handleEmojiFilterChange = (changeEvent) => {
        setEmojiType(changeEvent.currentTarget.value)
    }

    return (
        <div className="relative flex flex-col">
            <div>
                <ToolBarButton editorView={editorView} onClick={handleClickEmojiButton} {...props}>
                    <BsEmojiSmile className="w-4 h-4 text-zinc-100"/>
                </ToolBarButton>
            </div>
            {emojiPickerOpen && (
                <div className="absolute right-0 w-36 h-36 bg-zinc-900 top-8 rounded-lg overflow-auto">
                    <div className="divide-zinc-400 divide-y-2">
                        <div className="flex flex-row justify-center space-x-0.5 ">
                            <EmojiFilterButton onClick={handleEmojiFilterChange} isActive={emojiType == 'people'} value='people'><FaRegFaceSmile /></EmojiFilterButton>
                            <EmojiFilterButton onClick={handleEmojiFilterChange} isActive={emojiType == 'nature'} value='nature'><FaMountain /></EmojiFilterButton>
                            <EmojiFilterButton onClick={handleEmojiFilterChange} isActive={emojiType == 'objects'} value='objects'><FaBurger /></EmojiFilterButton>
                            <EmojiFilterButton onClick={handleEmojiFilterChange} isActive={emojiType == 'places'} value='places'><FaRegBuilding /></EmojiFilterButton>
                            <EmojiFilterButton onClick={handleEmojiFilterChange} isActive={emojiType == 'symbols'} value='symbols'><MdOutlineEmojiSymbols /></EmojiFilterButton>
                        </div>
                        <EmojiPicker handlePickedEmoji={handleCreateEmoji} selectedType={emojiType} />
                    </div>     
                </div>
            )}
        </div>
    )
}

export type MoreOptionsButtonProps = ComponentProps<'button'> & {
    editorView: EditorView | null | undefined;
    moreOptionsOpen: boolean,
    handleClickOptionsButton: () => void,
}

export const MoreOptionsButton = ({editorView, moreOptionsOpen, handleClickOptionsButton, ...props}: MoreOptionsButtonProps) => {

    const handleMoreOptions = async () => {
    

    }

    return (
        <div className="relative flex flex-col">
            <div>
                <ToolBarButton editorView={editorView} onClick={handleClickOptionsButton} {...props}>
                    <TfiMore className="w-4 h-4 text-zinc-100"/>
                </ToolBarButton>
            </div>
            {moreOptionsOpen && (
                <div className="absolute right-0 w-36 h-36 bg-zinc-900 top-8 rounded-lg overflow-auto">
                    <div className="divide-zinc-400 divide-y-2">
                        <div className="flex flex-row justify-center space-x-0.5 ">
                            <button>Option 1</button>
                            <button>Option 2</button>
                        </div>
                    </div>     
                </div>
            )}
        </div>
    )
}


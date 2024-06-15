import { selectedNoteAtom } from "@renderer/store"
import { useAtomValue } from "jotai"
import { ComponentProps} from "react"
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
import { TfiMore } from "react-icons/tfi";
import { PiMathOperations } from "react-icons/pi";
import { BiHighlight } from "react-icons/bi";


import { EmojiPicker, LinkFormatPopUpModal, EmojiFilterButton, HeadingHelperButton } from "@/components";
import { OnPasteLinkFormatPopUpModal } from "./EditorPopUps/OnPasteLinkFormatPopUp"
import { FaRegFaceSmile, FaBurger, FaRegBuilding, FaTable } from "react-icons/fa6";
import { FaMountain } from "react-icons/fa";
import { MdOutlineEmojiSymbols } from "react-icons/md";
import { ImageFormatPopUpModal } from "./EditorPopUps/ImageFormatPopUp"
import { HiOutlineBellAlert } from "react-icons/hi2";
import { TableFormatPopUpModal } from "./EditorPopUps/TableFormatPopUp"
import { markdownTableFormat } from "@renderer/utils"
import { RxDividerHorizontal } from "react-icons/rx"


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
    const [showAlertHelper, setShowAlertHelper] = useState(false)

    const handleLinkFormatOnClose = () => setShowLinkFormat(false)

    const handleImageFormatOnClose = () => setShowImageFormat(false)

    const [showTableFormat, setShowTableFormat] = useState(false)
    const handleTableFormatOnClose = () => setShowTableFormat(false)

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

    const handleClickTableInsert = () => {
        if(editorView == null) return 
        if(editorView == undefined) return
        if(tableFormatPopUpModal?.tableCols == undefined) return
        if(tableFormatPopUpModal?.tableRows == undefined) return

        const tableFormat = markdownTableFormat(Number(tableFormatPopUpModal.tableRows), Number(tableFormatPopUpModal.tableCols))

        InsertTextInEditor(tableFormat, editorView, false)
    }

    const tableFormatPopUpModal = TableFormatPopUpModal({
        onClose: handleTableFormatOnClose,
        onClickInsert: handleClickTableInsert,
        visible: showTableFormat
    })

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

    const handleClickedTableOption = () => {
        setShowTableFormat(true)
        setShowOptionsMenu(false)
    }

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
        <AlertButton editorView={editorView} handleClickAlertButton={() => setShowAlertHelper((prev) => !prev)} handlePickedAlert={() => setShowAlertHelper(false)} alertHelperOpen={showAlertHelper}/>

        <div>
            {linkFormatPopUpModal?.linkPopUp}
        </div>
        
        <LinkButton editorView={editorView} onClick={() => setShowLinkFormat(true)}/>

        <div>
            {imageFormatPopUpModal?.imagePopUp}
        </div>

        <ImageButton editorView={editorView} onClick={() => setShowImageFormat(true)}/>
        <EmojiButton editorView={editorView} handleClickEmojiButton={() => setShowEmojiPicker((prev) => !prev)} emojiPickerOpen={showEmojiPicker}/>

        <div>
            {tableFormatPopUpModal?.tablePopUp}
        </div>

        <MoreOptionsButton editorView={editorView} handleClickOptionsButton={() => setShowOptionsMenu((prev) => !prev)} moreOptionsOpen={showOptionsMenu} OnClickTableOption={handleClickedTableOption}/>
    </div>
   ) 
}

export type ToolBarButtonProps = ComponentProps<'button'> & {
    editorView: EditorView | null | undefined;
}

export const ToolBarButton = ({editorView, className, children, ...props}: ToolBarButtonProps) => {
    return <button className={twMerge('px-2 py-1 border border-zinc-800 rounded-md hover:border-indigo-500 transition-colors duration-100 focus:outline focus:outline-indigo-500', className
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

export type AlertButtonProps = ComponentProps<'button'> & {
    editorView: EditorView | null | undefined;
    alertHelperOpen: boolean,
    handleClickAlertButton: () => void,
    handlePickedAlert: () => void,
}

export const AlertButton = ({editorView, alertHelperOpen, handleClickAlertButton, handlePickedAlert, ...props}: AlertButtonProps) => {

    const handleCreateAlert = (pickedAlert: string) => {
        if(editorView == null) return 
        if(editorView == undefined) return

        InsertTextAtStartInEditor(pickedAlert, editorView, false)
    }

    const handleClickAlertHelper = (changeEvent) => {
        handleCreateAlert(changeEvent.currentTarget.value)
        handlePickedAlert()
    }

    const noteIcon = <svg className="w-4 h-4 text-[#2f81f7]" viewBox="0 0 16 16" stroke="currentColor" fill="currentColor" strokeWidth="0" aria-hidden="true">
        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25
         7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1
          1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path>
    </svg>

    const tipIcon = <svg className="w-4 h-4 text-[#3fb950]" viewBox="0 0 16 16" stroke="currentColor" fill="currentColor" strokeWidth="0" aria-hidden="true">
        <path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621
         1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201
        7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751
        0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0
         1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>

    const importantIcon = <svg className="w-4 h-4 text-[#a371f7]" viewBox="0 0 16 16" stroke="currentColor" fill="currentColor" strokeWidth="0" aria-hidden="true">
        <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458
         1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0
          1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0
           0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path>
    </svg>

    const warningIcon = <svg className="w-4 h-4 text-[#d29922]" viewBox="0 0 16 16" stroke="currentColor" fill="currentColor" strokeWidth="0" aria-hidden="true">
        <path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0
         1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53
          3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path>
    </svg>

    const cautionIcon = <svg className="w-4 h-4 text-[#f85149]" viewBox="0 0 16 16" stroke="currentColor" fill="currentColor" strokeWidth="0" aria-hidden="true">
        <path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25
         4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5
          5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8
           4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path>
    </svg>

    return (
        <div className="relative flex flex-col">
            <div>
                <ToolBarButton editorView={editorView} onClick={handleClickAlertButton} {...props}>
                    <HiOutlineBellAlert className="w-4 h-4 text-zinc-100"/>
                </ToolBarButton>
                </div>
                {alertHelperOpen && (
                <div className="absolute bg-zinc-900 top-7 rounded-lg overflow-auto">
                    <div className="divide-zinc-400 divide-y-2">
                        <div className="flex flex-col justify-center space-x-0.5 ">
                            <HeadingHelperButton onClick={handleClickAlertHelper} value={"> [!NOTE]" + "\n" +"> "}>{noteIcon}</HeadingHelperButton>
                            <HeadingHelperButton onClick={handleClickAlertHelper} value={"> [!TIP]" + "\n" +"> "}>{tipIcon}</HeadingHelperButton>
                            <HeadingHelperButton onClick={handleClickAlertHelper} value={"> [!IMPORTANT]" + "\n" +"> "}>{importantIcon}</HeadingHelperButton>
                            <HeadingHelperButton onClick={handleClickAlertHelper} value={"> [!WARNING]" + "\n" +"> "}>{warningIcon}</HeadingHelperButton>
                            <HeadingHelperButton onClick={handleClickAlertHelper} value={"> [!CAUTION]" + "\n" +"> "}>{cautionIcon}</HeadingHelperButton>
                        </div>
                </div>     
            </div>
        )}
    </div>
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
                <div className="absolute right-0 w-40 h-36 bg-zinc-900 top-8 rounded-lg overflow-auto">
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
    OnClickTableOption: () => void,
    handleClickOptionsButton: () => void,
}

export const MoreOptionsButton = ({editorView, moreOptionsOpen, OnClickTableOption, handleClickOptionsButton, ...props}: MoreOptionsButtonProps) => {

    const handleCreateDivider = async () => {
        if(editorView == null) return 
        if(editorView == undefined) return

        InsertTextInEditor("---", editorView, false)
    }

    const handleCreateHighlightText = async () => {
        if(editorView == null) return 
        if(editorView == undefined) return

        InsertTextAroundInEditor("**==**", editorView, true)
    }

    const handleCreateMathsText = async () => {
        if(editorView == null) return 
        if(editorView == undefined) return

        InsertTextAroundInEditor("$$$$", editorView, true)
    }

    return (
        <div className="relative flex flex-col">
            <div>
                <ToolBarButton editorView={editorView} onClick={handleClickOptionsButton} {...props}>
                    <TfiMore className="w-4 h-4 text-zinc-100"/>
                </ToolBarButton>
            </div>
            {moreOptionsOpen && (
                <div className="absolute right-0 bg-zinc-900 top-8 rounded-lg overflow-auto">
                    <div className="divide-zinc-400 divide-y-2">
                        <div className="flex flex-col justify-center space-x-0.5 ">
                            <HeadingHelperButton onClick={OnClickTableOption}>
                                <div className="flex space-x-2 items-center">
                                    <FaTable className="text-zinc-400"/>
                                    <span className="text-xs">Table</span>
                                </div>
                            </HeadingHelperButton>
                            <HeadingHelperButton onClick={handleCreateDivider}>
                                <div className="flex space-x-2 items-center">
                                    <RxDividerHorizontal className="text-zinc-100"/>
                                    <span className="text-xs">Divider</span>
                                </div>
                            </HeadingHelperButton>
                            <HeadingHelperButton onClick={handleCreateHighlightText}>
                                <div className="flex space-x-2 items-center">
                                    <BiHighlight className="text-zinc-100"/>
                                    <span className="text-xs">Highlight</span>
                                </div>
                            </HeadingHelperButton>
                            <HeadingHelperButton onClick={handleCreateMathsText}>
                                <div className="flex space-x-2 items-center">
                                    <PiMathOperations className="text-zinc-100"/>
                                    <span className="text-xs">Maths</span>
                                </div>
                            </HeadingHelperButton>
                        </div>
                    </div>     
                </div>
            )}
        </div>
    )
}


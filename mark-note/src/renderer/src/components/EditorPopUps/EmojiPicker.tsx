import { getEmojiList } from "@renderer/store/emojisDatabase"
import { cn } from "@renderer/utils"
import { ComponentProps, useState, useRef } from "react"
import { twMerge } from "tailwind-merge"
import { EditorView} from '@codemirror/view'
import { createPortal } from 'react-dom';
import { InsertTextInEditor } from "../MarkdownEditorToolBar"
import { FaBurger, FaMountain, FaRegBuilding, FaRegFaceSmile } from "react-icons/fa6"
import { MdOutlineEmojiSymbols } from "react-icons/md"


export type EmojiPickerPopUpModalProps = {
    onToggle: () => void;
    visible: boolean,
    editorView: EditorView | null | undefined;
    uiTheme: string,
}

export const EmojiPickerPopUpModal  = ({
    onToggle,
    visible,
    editorView,
    uiTheme,
}: EmojiPickerPopUpModalProps) => {
    const menuRef = useRef(null);
    const [emojiType, setEmojiType] = useState('people');

    const handleCreateEmoji = (pickedEmojiName: string) => {
        if(editorView == null) return 
        if(editorView == undefined) return

        InsertTextInEditor(':' + pickedEmojiName + ':', editorView, false)
    }

    const handleEmojiFilterChange = (changeEvent) => {
        setEmojiType(changeEvent.currentTarget.value)
    }

    const closeModal = (e) => {
        if(menuRef.current == e.target)
        {
            onToggle()
        }
    }

    if(!visible) return null

    return(createPortal(
        <div className={uiTheme}>
        <div ref={menuRef} onClick={closeModal} className="absolute inset-0 bottom-0 left-0 right-0 w-full top-0 z-10">
            <div className="w-40 h-36 overflow-auto ml-[550px] mt-[180px]">
                <div className="bg-bkgPrimary rounded-md flex flex-col border border-indigo-500 divide-zinc-400 divide-y-2">
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
            
        </div>
        </div>, document.body 
    ))
}



export type EmojiPickerProps = ComponentProps<'div'> & {
    handlePickedEmoji: (emojiName: string) => void,
    selectedType: string
}

export const EmojiPicker = ({handlePickedEmoji, selectedType}: EmojiPickerProps) => {

    const emojiList = getEmojiList()

    const handleOptionChange = (changeEvent) => {
        handlePickedEmoji(changeEvent.target.value)
    }

    const filteredEmojis = emojiList.filter(item => item.type === selectedType)

    return(
        <div className="grid grid-cols-4">
            {filteredEmojis.map((emojiItem) => (
                    <EmojiPickerButton onClick={handleOptionChange} value={emojiItem.name} key={emojiItem.name + emojiItem.type}>
                        {emojiItem.emoji}
                    </EmojiPickerButton>
            ))}
        </div>
    )
}

export type EmojiFilterButtonProps = ComponentProps<'button'> & {
    isActive?: boolean,
}

export const EmojiFilterButton = ({isActive, className, children, ...props}: EmojiFilterButtonProps) => {
    return <button className={cn('cursor-pointer text-iconPrimary border border-bkgPrimary rounded-md transition-colors duration-100 px-1 py-1',
    {
        'bg-indigo-600/50': isActive,
        'hover:border-indigo-500': !isActive,
    }, className
    )} {...props}
    >
        {children}
    </button>
}

export type EmojiPickerButtonProps = ComponentProps<'button'>


export const EmojiPickerButton = ({className, children, ...props}: EmojiPickerButtonProps) => {
    return <button className={twMerge('border border-bkgPrimary rounded-md hover:border-indigo-500 transition-colors duration-100', className
    )} {...props}
    >
        {children}
    </button>
}
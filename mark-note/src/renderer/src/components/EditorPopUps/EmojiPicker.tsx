import { getEmojiList } from "@renderer/store/emojisDatabase"
import { cn } from "@renderer/utils"
import { ComponentProps, useState } from "react"
import { twMerge } from "tailwind-merge"

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
    return <button className={cn('cursor-pointer border border-zinc-900 rounded-md transition-colors duration-100 px-1 py-1',
    {
        'bg-indigo-600/75': isActive,
        'hover:border-indigo-500': !isActive,
    }, className
    )} {...props}
    >
        {children}
    </button>
}

export type EmojiPickerButtonProps = ComponentProps<'button'>


export const EmojiPickerButton = ({className, children, ...props}: EmojiPickerButtonProps) => {
    return <button className={twMerge('border border-zinc-900 rounded-md hover:border-indigo-500 transition-colors duration-100', className
    )} {...props}
    >
        {children}
    </button>
}
import { getEmojiList } from "@renderer/store/emojisDatabase"
import { ComponentProps, useState } from "react"
import { twMerge } from "tailwind-merge"

export type EmojiPickerProps = ComponentProps<'div'> & {
    handlePickedEmoji: (emojiName: string) => void
}

export const EmojiPicker = ({handlePickedEmoji, ...props}: EmojiPickerProps) => {
    const [pickedEmoji, setPickedEmoji] = useState('');

    const emojiList = getEmojiList()

    const handleOptionChange = (changeEvent) => {
        //setPickedEmoji(changeEvent.target.value)
        handlePickedEmoji(changeEvent.target.value)
    }

    return(
        <div className="grid grid-cols-4">
            {emojiList.map((emojiItem) => (
                    <EmojiPickerButton onClick={handleOptionChange} value={emojiItem.name}>{emojiItem.emoji}</EmojiPickerButton>
            ))}
        </div>
    )

}

export type EmojiPickerButtonProps = ComponentProps<'button'>


export const EmojiPickerButton = ({className, children, ...props}: EmojiPickerButtonProps) => {
    return <button className={twMerge('rounded-md border border-zinc-400/50 hover:bg-zinc-600/50 transition-colors duration-100', className
    )} {...props}
    >
        {children}
    </button>
}
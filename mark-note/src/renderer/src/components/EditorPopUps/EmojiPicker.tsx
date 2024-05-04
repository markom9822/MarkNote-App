import { getEmojiList } from "@renderer/store/emojisDatabase"
import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"


export const EmojiPicker = () => {

    const emojiList = getEmojiList()

    return(
        <div className="grid grid-cols-4">
            {emojiList.map((emojiItem) => (
                    <EmojiPickerButton>{emojiItem.emoji}</EmojiPickerButton>
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
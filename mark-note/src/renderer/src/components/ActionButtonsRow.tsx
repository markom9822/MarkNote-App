import { DeleteNoteButton, NewNoteButton, SettingsButton } from "@/components"
import { SetStateAction } from "jotai";
import { ComponentProps } from "react"

export const ActionButtonsRow = ({...props}: ComponentProps<'div'>) => {
    return (
        <div {...props}>
            <NewNoteButton />
        </div>
    )
}
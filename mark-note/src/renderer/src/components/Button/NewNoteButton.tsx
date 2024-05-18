import { ActionButton, ActionButtonProps } from "@/components"
import { createEmptyNoteAtom } from "@renderer/store"
import { useSetAtom } from "jotai"
import { PiNotePencil } from "react-icons/pi";



export const NewNoteButton = ({...props}: ActionButtonProps) => {
    const createEmptyNote = useSetAtom(createEmptyNoteAtom)

    const handleCreation = async () => {
        await createEmptyNote()
    }


    return (
        <ActionButton onClick={handleCreation} {...props}>
            <PiNotePencil className="w-5 h-5 text-zinc-300"/>
        </ActionButton>
    )
}
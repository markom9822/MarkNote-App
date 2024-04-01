import { ActionButton, ActionButtonProps } from "@/components"
import { SetStateAction } from "jotai";
import { FiMoreVertical } from "react-icons/fi";

export const PreviewOptionsButton = ({...props}: ActionButtonProps) => {

    const handlePreviewOptions = async () => {
        //await
    }

    return (
        <ActionButton onClick={handlePreviewOptions} { ...props}>
            <FiMoreVertical className="w-4 h-4 text-zinc-300" />
        </ActionButton>
    )
}
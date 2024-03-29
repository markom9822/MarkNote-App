import { ActionButton, ActionButtonProps } from "@/components"
import { SetStateAction } from "jotai";
import { VscSettingsGear } from "react-icons/vsc";

export const SettingsButton = ({...props}: ActionButtonProps) => {

    const handleSettings = async () => {
        //await
    }

    return (
        <ActionButton onClick={handleSettings} { ...props}>
            <VscSettingsGear className="w-4 h-4 text-zinc-300" />
        </ActionButton>
    )
}
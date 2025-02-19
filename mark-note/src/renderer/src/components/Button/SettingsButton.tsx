import { ActionButton, ActionButtonProps } from "@/components"
import { SetStateAction } from "jotai";
import { VscSettingsGear } from "react-icons/vsc";

export const SettingsButton = ({...props}: ActionButtonProps) => {

    return (
        <ActionButton className="border-zinc-800" { ...props}>
            <VscSettingsGear className="w-4 h-4 text-iconPrimary hover:text-iconPrimary/60"/>
        </ActionButton>
    )
}
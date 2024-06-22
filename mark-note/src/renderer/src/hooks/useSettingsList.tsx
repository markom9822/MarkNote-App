import { selectedSettingAtom, settingOptionsAtom, selectedSettingOptionIndexAtom } from "@renderer/store/settingsOptions"
import { useAtom, useAtomValue } from "jotai"


export const useSettingsList = ({onSelect}: {onSelect?: () => void}) => {
    const selectedOption = useAtomValue(selectedSettingAtom)

    const options = useAtomValue(settingOptionsAtom)

    const [selectedOptionIndex, setSelectedOptionIndex] = useAtom(selectedSettingOptionIndexAtom)    

    const handleSettingsSelect = (index: number) => async() => {  
        setSelectedOptionIndex(index)  

        if(onSelect) {
            onSelect()
        }
    }
 
    return {
        selectedOption,
        options,
        selectedOptionIndex,
        handleSettingsSelect
    }
}

export const forceSettings = () => {
    const [selectedOptionIndex, setSelectedOptionIndex] = useAtom(selectedSettingOptionIndexAtom)    

    const forceSetOptionIndex = (index: number) => {
        setSelectedOptionIndex(index)
    }

    return {
        forceSetOptionIndex
    }
}

import { selectedSettingAtom, settingOptionsAtom, selectedSettingOptionIndexAtom, allPrefsAtom } from "@renderer/store/settingsOptions"
import { SettingPrefsInfo } from "@shared/models"
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

export const getSettingPrefValueFromTitle = (prefTitle: string): string => {
    const allPrefs = useAtomValue(allPrefsAtom)
    if(!allPrefs) return ''

    const filteredPref = allPrefs.filter(pref => pref.title == prefTitle);

    if(filteredPref == undefined) return ''

    return(filteredPref[0].prefValue)
}

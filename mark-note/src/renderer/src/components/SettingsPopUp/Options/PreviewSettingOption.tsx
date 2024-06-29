import { useState } from "react";
import { NumberDropdown } from "@renderer/components/Utilities/Dropdown"
import {getSettingPrefValueFromTitle} from '@renderer/hooks/useSettingsList'
import { useSetAtom} from "jotai"
import {setSettingPrefAtom} from '@/store/settingsOptions'


export const PreviewSettingOption = () => {
    const setSettingPref = useSetAtom(setSettingPrefAtom)

    const initFontSize = getSettingPrefValueFromTitle('Preview Font Size');
    const [fontSize, setFontSize] = useState(initFontSize);

    const handleChangeFontSize = (e) => {
        setFontSize(e.target.value);
        setSettingPref('Preview Font Size', e.target.value.toString())
    }

    const previewFontSizeOptions = [
        {label: "12px", id: '12px'},
        {label: "13px", id: '13px'},
        {label: "14px", id: '14px'},
        {label: "15px", id: '15px'},
        {label: "16px", id: '16px'},
        {label: "17px", id: '17px'},
        {label: "18px", id: '18px'},
  
      ]

    return (
        <div>
            <div className="mb-5">
                <h2 className="mb-2 font-bold truncate text-xl text-textPrimary">Preview Settings</h2>
                <hr></hr>
                <div className="my-2 flex space-x-16">
                    <div>
                        <p className="text-textPrimary">Font Size</p>
                        <span className="text-xs text-textSecondary">Size of the font used in the Markdown preview</span>
                    </div>
                    <NumberDropdown selectedOption={fontSize} OnChangeOption={handleChangeFontSize} options={previewFontSizeOptions}/>
                </div>
            </div>       
        </div>
    )
}

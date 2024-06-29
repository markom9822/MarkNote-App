import { Checkbox } from "@renderer/components/Utilities/Checkbox"
import {getSettingPrefValueFromTitle} from '@renderer/hooks/useSettingsList'
import { useSetAtom} from "jotai"
import {setSettingPrefAtom} from '@/store/settingsOptions'
import { useState } from "react";


export const GeneralSettingOption = () => {
    const setSettingPref = useSetAtom(setSettingPrefAtom)
    const initLineNum = getSettingPrefValueFromTitle('Status Enabled') === 'true';

    const [checkedStatus, setCheckedStatus] = useState(initLineNum);

    const handleChangeStatusEnabled = (e) => {
        setCheckedStatus(e.target.value);
        setSettingPref('Status Enabled', e.target.value.toString())
    };
    
    return (
        <div className="general">
            <h2 className="mb-2 font-bold truncate text-xl">General Settings</h2>
            <hr></hr>
            <div className="my-2">
                <Checkbox
                label="Note Status"
                value={checkedStatus}
                onChange={handleChangeStatusEnabled}
                />
                <p className="text-xs text-zinc-300">
                  Enable status labels for each note.
                </p>
            </div>
        </div> 
        )
}

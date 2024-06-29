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
            <hr></hr>
            <p className="text-sm my-3 text-zinc-200">If you are unfamiliar with Markdown see the guide on the
                <a className="font-bold text-indigo-400 hover:underline" target="_blank" href="https://github.com/markom9822/MarkNote-App_V2/blob/main/README.md"> Github Repo</a>.
            </p>
        </div> 
        )
}

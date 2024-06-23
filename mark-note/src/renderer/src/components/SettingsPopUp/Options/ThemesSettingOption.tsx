import { Dropdown } from "@renderer/components/Utilities/Dropdown"
import { useState } from "react";
import { useSetAtom, useAtomValue} from "jotai"
import {setSettingPrefAtom, allPrefsAtom} from '@/store/settingsOptions'
import {getSettingPrefValueFromTitle} from '@renderer/hooks/useSettingsList'

export const ThemesSettingOption = () => {
    const setSettingPref = useSetAtom(setSettingPrefAtom)

    const initEditorTheme = getSettingPrefValueFromTitle('Editor Theme');

    const [editorTheme, setEditorTheme] = useState(initEditorTheme);

    const handleChangeEditorTheme = (e) => {
        setEditorTheme(e.target.checked);
        console.info(`Editor Theme set to ${e.target.checked}`)
        setSettingPref('Editor Theme', e.target.checked.toString())
    };

    const uiThemeOptions = [
        {label: "Default Dark UI", value: 1},
        {label: "Default Light UI", value: 2}
    ]

    const editorThemeOptions = [
        {label: "Default Dark Editor", id: 'dark'},
        {label: "Default Light Editor", id: 'light'}
    ]

    const previewThemeOptions = [
        {label: "Default Dark Preview", value: 1},
        {label: "Default Light Preview", value: 2}
    ]


    return (
        <div>
            <div className="mb-5">
                <h2 className="mb-2 font-bold truncate text-lg">UI Theme</h2>
                <hr></hr>
                <span className="text-xs text-zinc-300">This styles the buttons, side bar and other common components</span>
                <Dropdown options={uiThemeOptions}/>
            </div>

            <div className="mb-5">
                <h2 className="mb-2 font-bold truncate text-lg">Editor Theme</h2>
                <hr></hr>
                <span className="text-xs text-zinc-300">This styles the text inside the editor</span>
                <Dropdown OnChangeOption={handleChangeEditorTheme} options={editorThemeOptions}/>
            </div>

            <div className="mb-5">
                <h2 className="mb-2 font-bold truncate text-lg">Preview Theme</h2>
                <hr></hr>
                <span className="text-xs text-zinc-300">This styles the Markdown output</span>
                <Dropdown options={previewThemeOptions}/>
            </div>
            
        </div>
    )
}

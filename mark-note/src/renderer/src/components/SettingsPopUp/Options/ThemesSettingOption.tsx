import { Dropdown } from "@renderer/components/Utilities/Dropdown"
import { useState } from "react";
import { useSetAtom} from "jotai"
import {setSettingPrefAtom} from '@/store/settingsOptions'
import {getSettingPrefValueFromTitle} from '@renderer/hooks/useSettingsList'

export const ThemesSettingOption = () => {
    const setSettingPref = useSetAtom(setSettingPrefAtom)

    const initEditorTheme = getSettingPrefValueFromTitle('Editor Theme');
    const initPreviewTheme = getSettingPrefValueFromTitle('Preview Theme');


    const [editorTheme, setEditorTheme] = useState(initEditorTheme);
    const [uiTheme, setUITheme] = useState('dark');
    const [previewTheme, setPreviewTheme] = useState(initPreviewTheme);


    const handleChangeEditorTheme = (e) => {
        setEditorTheme(e.target.value);
        console.info(`Editor Theme set to ${e.target.value}`)
        setSettingPref('Editor Theme', e.target.value.toString())
    };

    const handleChangeUITheme = (e) => {

    }

    const handleChangePreviewTheme = (e) => {
        setPreviewTheme(e.target.value);
        setSettingPref('Preview Theme', e.target.value.toString())

    }

    const uiThemeOptions = [
        {label: "Default Dark UI", id: 'dark'},
        {label: "Default Light UI", id: 'light'}
    ]

    const editorThemeOptions = [
        {label: "Default Dark Editor", id: 'dark'},
        {label: "Default Light Editor", id: 'light'}
    ]

    const previewThemeOptions = [
        {label: "Default Dark Preview", id: 'dark'},
        {label: "Default Light Preview", id: 'light'}
    ]


    return (
        <div>
            <div className="mb-5">
                <h2 className="mb-2 font-bold truncate text-lg">UI Theme</h2>
                <hr></hr>
                <span className="text-xs text-zinc-300">This styles the buttons, side bar and other common components</span>
                <Dropdown selectedOption={uiTheme} OnChangeOption={handleChangeUITheme} options={uiThemeOptions}/>
            </div>

            <div className="mb-5">
                <h2 className="mb-2 font-bold truncate text-lg">Editor Theme</h2>
                <hr></hr>
                <span className="text-xs text-zinc-300">This styles the text inside the editor</span>
                <Dropdown selectedOption={editorTheme} OnChangeOption={handleChangeEditorTheme} options={editorThemeOptions}/>
            </div>

            <div className="mb-5">
                <h2 className="mb-2 font-bold truncate text-lg">Preview Theme</h2>
                <hr></hr>
                <span className="text-xs text-zinc-300">This styles the Markdown output</span>
                <Dropdown selectedOption={previewTheme} OnChangeOption={handleChangePreviewTheme} options={previewThemeOptions}/>
            </div>
            
        </div>
    )
}

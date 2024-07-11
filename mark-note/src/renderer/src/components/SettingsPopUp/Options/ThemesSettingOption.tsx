import { Dropdown } from "@renderer/components/Utilities/Dropdown"
import { useState } from "react";
import { useSetAtom} from "jotai"
import {setSettingPrefAtom} from '@/store/settingsOptions'
import {getSettingPrefValueFromTitle} from '@renderer/hooks/useSettingsList'

export const ThemesSettingOption = () => {
    const setSettingPref = useSetAtom(setSettingPrefAtom)

    const initUITheme = getSettingPrefValueFromTitle('UI Theme');
    const initEditorTheme = getSettingPrefValueFromTitle('Editor Theme');
    const initPreviewTheme = getSettingPrefValueFromTitle('Preview Theme');

    const [editorTheme, setEditorTheme] = useState(initEditorTheme);
    const [uiTheme, setUITheme] = useState(initUITheme);
    const [previewTheme, setPreviewTheme] = useState(initPreviewTheme);


    const handleChangeEditorTheme = (e) => {
        setEditorTheme(e.target.value);
        setSettingPref('Editor Theme', e.target.value.toString())
    };

    const handleChangeUITheme = (e) => {
        setUITheme(e.target.value);
        setSettingPref('UI Theme', e.target.value.toString())
    }

    const handleChangePreviewTheme = (e) => {
        setPreviewTheme(e.target.value);
        setSettingPref('Preview Theme', e.target.value.toString())

    }

    const uiThemeOptions = [
        {label: "Default Dark UI", id: 'dark'},
        {label: "Default Light UI", id: 'light'},
        {label: "Navy Style UI", id: 'navy'},
    ]

    const editorThemeOptions = [
        {label: "Default Dark Editor", id: 'dark'},
        {label: "Default Light Editor", id: 'light'},
        {label: "Solarized Dark Editor", id: 'solarizedDark'},
        {label: "Solarized Light Editor", id: 'solarizedLight'},
        {label: "Nord Editor", id: 'nord'},
        {label: "Gruvbox Dark Editor", id: 'gruvboxDark'},
        {label: "Gruvbox Light Editor", id: 'gruvboxLight'},
    ]

    const previewThemeOptions = [
        {label: "Default Dark Preview", id: 'dark'},
        {label: "Default Light Preview", id: 'light'},
        {label: "Navy Preview", id: 'navy'},
        {label: "Gruvbox Dark Preview", id: 'gruvboxDark'},
        {label: "Gruvbox Light Preview", id: 'gruvboxLight'}
    ]

    return (
        <div>
            <div className="mb-5">
                <h2 className="mb-2 font-bold truncate text-lg text-textPrimary">UI Theme</h2>
                <hr></hr>
                <span className="text-xs text-textSecondary">This styles the buttons, side bar and other common components</span>
                <Dropdown selectedOption={uiTheme} OnChangeOption={handleChangeUITheme} options={uiThemeOptions}/>
            </div>

            <div className="mb-5">
                <h2 className="mb-2 font-bold truncate text-lg text-textPrimary">Editor Theme</h2>
                <hr></hr>
                <span className="text-xs text-textSecondary">This styles the text inside the editor</span>
                <Dropdown selectedOption={editorTheme} OnChangeOption={handleChangeEditorTheme} options={editorThemeOptions}/>
            </div>

            <div className="mb-5">
                <h2 className="mb-2 font-bold truncate text-lg text-textPrimary">Preview Theme</h2>
                <hr></hr>
                <span className="text-xs text-textSecondary">This styles the Markdown output</span>
                <Dropdown selectedOption={previewTheme} OnChangeOption={handleChangePreviewTheme} options={previewThemeOptions}/>
            </div>
            
        </div>
    )
}

import { Dropdown } from "@renderer/components/Utilities/Dropdown"

export const ThemesSettingOption = () => {

    const uiThemeOptions = [
        {label: "Default Dark UI", value: 1},
        {label: "Default Light UI", value: 2}
    ]

    const editorThemeOptions = [
        {label: "Default Dark Editor", value: 1},
        {label: "Default Light Editor", value: 2}
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
                <Dropdown options={editorThemeOptions}/>
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

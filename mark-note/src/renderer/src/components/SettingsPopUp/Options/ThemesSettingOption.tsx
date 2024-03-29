
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
                <h2 className="mb-2 font-bold truncate">UI Theme</h2>
                <span>This styles the buttons, side bar and other common components</span>
                {ThemeDropdown(uiThemeOptions)}
            </div>

            <div className="mb-5">
                <h2 className="mb-2 font-bold truncate">Editor Theme</h2>
                <span>This styles the text inside the editor</span>
                {ThemeDropdown(editorThemeOptions)}
            </div>

            <div className="mb-5">
                <h2 className="mb-2 font-bold truncate">Preview Theme</h2>
                <span>This styles the Markdown output</span>
                {ThemeDropdown(previewThemeOptions)}
            </div>
            
        </div>
    )
}

function ThemeDropdown(options) {

    return (
        <div>
            <select className="bg-gray-500 border border-gray-800 text-gray-50 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                {options.map(option => (
                    <option value={option.value}>{option.label}</option>
                ))}

            </select>
        </div>
    )
}
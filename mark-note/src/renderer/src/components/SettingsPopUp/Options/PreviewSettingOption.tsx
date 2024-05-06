import { Dropdown } from "@renderer/components/Utilities/Dropdown"

export const PreviewSettingOption = () => {

    const previewFontOptions = [
        {label: "Monospace", value: 1},
        {label: "Sans Serif", value: 2}
    ]

    return (
        <div>
            <div className="mb-5">
                <h2 className="mb-2 font-bold truncate text-xl">Preview Font</h2>
                <span>The font used in the Markdown preview</span>
                {Dropdown(previewFontOptions)}
            </div>       
        </div>
    )
}

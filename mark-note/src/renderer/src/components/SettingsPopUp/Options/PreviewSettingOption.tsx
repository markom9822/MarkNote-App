import { Dropdown } from "@renderer/components/Utilities/Dropdown"
import { useState } from "react";

export const PreviewSettingOption = () => {

    const [fontFamily, setFontFamily] = useState('dark');

    const handleChangeFont = (e) => {

    }

    const previewFontOptions = [
        {label: "Monospace", id: 1},
        {label: "Sans Serif", id: 2}
    ]

    return (
        <div>
            <div className="mb-5">
                <h2 className="mb-2 font-bold truncate text-xl">Preview Font</h2>
                <span>The font used in the Markdown preview</span>
                <Dropdown selectedOption={fontFamily} OnChangeOption={handleChangeFont} options={previewFontOptions}/>
            </div>       
        </div>
    )
}

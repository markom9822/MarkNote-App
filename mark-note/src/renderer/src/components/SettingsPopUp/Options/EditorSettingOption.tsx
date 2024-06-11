import { useState } from "react";
import { Dropdown } from "@renderer/components/Utilities/Dropdown"
import { Checkbox } from "@renderer/components/Utilities/Checkbox"


export const EditorSettingOption = () => {
    const [checkedLineNum, setCheckedLineNum] = useState(true);
    const [checkedToolbar, setCheckedToolbar] = useState(true);
    const [checkedHighlightLine, setCheckedHighlightLine] = useState(true);
    const [checkedWrapping, setCheckedWrapping] = useState(true);

    const handleChangeLineNum = () => {
        setCheckedLineNum(!checkedLineNum);
        localStorage.setItem('lineNumberPref', (!checkedLineNum).toString());
    };

    const handleChangeToolbar = () => {
      setCheckedToolbar(!checkedToolbar);
    };

    const handleChangeHighlight = () => {
      setCheckedHighlightLine(!checkedHighlightLine);
    };

    const handleChangeWrapping = () => {
      setCheckedWrapping(!checkedWrapping);
    };

    const editorFontOptions = [
      {label: "Monospace", value: 1},
      {label: "Sans Serif", value: 2}
  ]

    return (
        <div className="editor">
            <h2 className="mb-2 font-bold truncate text-xl">Interface</h2>
            <hr></hr>
            <div className="my-2">
                <Checkbox
                label="Line numbers"
                value={checkedLineNum}
                onChange={handleChangeLineNum}
                />
                <p className="text-xs text-zinc-300">
                  Show line numbers on the left hand side of the editor.
                </p>
            </div>
            <div className="my-2">
                <Checkbox
                label="Toolbar"
                value={checkedToolbar}
                onChange={handleChangeToolbar}
                />
                <p className="text-xs text-zinc-300">
                  Display a markdown toolbar above the editor.
                </p>
            </div>
            <div className="my-2">
                <Checkbox
                label="Highlight Active Line"
                value={checkedHighlightLine}
                onChange={handleChangeHighlight}
                />
                <p className="text-xs text-zinc-300">
                  Highlight the current selected line in the editor.
                </p>
            </div>
            <div className="my-2">
                <Checkbox
                label="Line Wrapping"
                value={checkedWrapping}
                onChange={handleChangeWrapping}
                />
                <p className="text-xs text-zinc-300">
                  Wrap longer lines in the editor.
                </p>
            </div>
            <h2 className="mb-2 font-bold truncate text-xl">Text Appearance</h2>
            <hr></hr>
            <div className="my-2">
              <p>Font Size</p>
              <span className="text-xs text-zinc-300">Size of the font used in the editor</span>
            </div>
            <div className="my-2">
              <p>Font Weight</p>
              <span className="text-xs text-zinc-300">Weight of the font used in the editor</span>
            </div>
            <div className="my-2">
              <p>Font Family</p>
              <span className="text-xs text-zinc-300">The font used in the Markdown editor</span>
                {Dropdown(editorFontOptions)}
            </div>
        </div> 
        )
}
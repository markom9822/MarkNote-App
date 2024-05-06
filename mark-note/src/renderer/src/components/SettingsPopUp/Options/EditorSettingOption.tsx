import { useState } from "react";

export const EditorSettingOption = () => {
    const [checkedLineNum, setCheckedLineNum] = useState(true);
    const [checkedToolbar, setCheckedToolbar] = useState(true);
    const [checkedHighlightLine, setCheckedHighlightLine] = useState(true);
    const [checkedWrapping, setCheckedWrapping] = useState(true);

    const handleChangeLineNum = () => {
        setCheckedLineNum(!checkedLineNum);
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

    return (
        <div className="editor">
            <h2 className="mb-2 font-bold truncate text-xl">Editor Settings</h2>

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
        </div> 
        )
}

const Checkbox = ({ label, value, onChange }) => {
    return (
      <div className="flex flex-row">
        <input type="checkbox" checked={value} onChange={onChange} />
        <p className="pl-3">{label}</p>
      </div>
    );
  };
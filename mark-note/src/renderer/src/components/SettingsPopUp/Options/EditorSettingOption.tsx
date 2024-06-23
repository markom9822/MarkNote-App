import { useState } from "react";
import { Dropdown, NumberDropdown } from "@renderer/components/Utilities/Dropdown"
import { Checkbox } from "@renderer/components/Utilities/Checkbox"
import { useSetAtom, useAtomValue} from "jotai"
import {setSettingPrefAtom, allPrefsAtom} from '@/store/settingsOptions'
import {getSettingPrefValueFromTitle} from '@renderer/hooks/useSettingsList'

export const EditorSettingOption = () => {
  const setSettingPref = useSetAtom(setSettingPrefAtom)

  
  const initLineNum = getSettingPrefValueFromTitle('Line Numbers Visible');
  console.info(`Line Number Init ${initLineNum}`)
  const initLineNumValue = (initLineNum === 'true') ;

  

  const [checkedLineNum, setCheckedLineNum] = useState(initLineNumValue);
  const [checkedToolbar, setCheckedToolbar] = useState(true);
  const [checkedHighlightLine, setCheckedHighlightLine] = useState(true);
  const [checkedWrapping, setCheckedWrapping] = useState(true);



    const handleChangeLineNum = (e) => {
        setCheckedLineNum(e.target.checked);
        console.info(`Line Numbers set to ${e.target.checked}`)
        setSettingPref('Line Numbers Visible', e.target.checked.toString())
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

    const editorFontSizeOptions = [
      {label: "10px", value: 1},
      {label: "12px", value: 2},
      {label: "14px", value: 3},
      {label: "16px", value: 4}
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
            <div className="my-2 flex space-x-24">
              <div>
                <p>Font Size</p>
                <span className="text-xs text-zinc-300">Size of the font used in the editor</span>
              </div>
              <NumberDropdown options={editorFontSizeOptions}/>
            </div>
            <div className="my-2 flex space-x-12">
              <div>
                <p>Font Family</p>
                <span className="text-xs text-zinc-300">The font used in the Markdown editor</span>
              </div>
              <Dropdown options={editorFontOptions}/>
            </div>
        </div> 
        )
}
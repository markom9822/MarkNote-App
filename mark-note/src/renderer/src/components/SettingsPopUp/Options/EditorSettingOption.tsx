import { useState } from "react";
import { NumberDropdown } from "@renderer/components/Utilities/Dropdown"
import { Checkbox } from "@renderer/components/Utilities/Checkbox"
import { useSetAtom} from "jotai"
import {setSettingPrefAtom} from '@/store/settingsOptions'
import {getSettingPrefValueFromTitle} from '@renderer/hooks/useSettingsList'

export const EditorSettingOption = () => {
  const setSettingPref = useSetAtom(setSettingPrefAtom)
  
  const initLineNum = getSettingPrefValueFromTitle('Line Numbers Visible') === 'true';
  const initToolbarVisible = getSettingPrefValueFromTitle('Toolbar Visible') === 'true';
  const initHighlightLine = getSettingPrefValueFromTitle('Highlight Active Line') === 'true';
  const initLineWrapping = getSettingPrefValueFromTitle('Line Wrapping') === 'true';
  const initBracketMatching = getSettingPrefValueFromTitle('Bracket Matching') === 'true';
  const initTabSize = getSettingPrefValueFromTitle('Tab Size');
  const initFontSize = getSettingPrefValueFromTitle('Editor Font Size');


  const [checkedLineNum, setCheckedLineNum] = useState(initLineNum);
  const [checkedToolbar, setCheckedToolbar] = useState(initToolbarVisible);
  const [checkedHighlightLine, setCheckedHighlightLine] = useState(initHighlightLine);
  const [checkedWrapping, setCheckedWrapping] = useState(initLineWrapping);
  const [checkedBracketMatching, setCheckedBracketMatching] = useState(initBracketMatching);
  const [fontSize, setFontSize] = useState(initFontSize);
  const [tabSize, setTabSize] = useState(initTabSize);


    const handleChangeLineNum = (e) => {
        setCheckedLineNum(e.target.checked);
        setSettingPref('Line Numbers Visible', e.target.checked.toString())
    };

    const handleChangeToolbar = (e) => {
      setCheckedToolbar(e.target.checked);
      setSettingPref('Toolbar Visible', e.target.checked.toString())
    };

    const handleChangeHighlight = (e) => {
      setCheckedHighlightLine(e.target.checked);
      setSettingPref('Highlight Active Line', e.target.checked.toString())
    };

    const handleChangeWrapping = (e) => {
      setCheckedWrapping(e.target.checked);
      setSettingPref('Line Wrapping', e.target.checked.toString())
    };

    const handleChangeBracketMatching = (e) => {
      setCheckedBracketMatching(e.target.checked);
      setSettingPref('Bracket Matching', e.target.checked.toString())
    };

    const handleChangeTabSize = (e) => {
      setTabSize(e.target.value);
      setSettingPref('Tab Size', e.target.value.toString())
    }

    const handleChangeFontSize = (e) => {
      setFontSize(e.target.value);
      setSettingPref('Editor Font Size', e.target.value.toString())
    }

    const editorFontSizeOptions = [
      {label: "12px", id: '12px'},
      {label: "13px", id: '13px'},
      {label: "14px", id: '14px'},
      {label: "15px", id: '15px'},
      {label: "16px", id: '16px'},
      {label: "17px", id: '17px'},
      {label: "18px", id: '18px'},

    ]

    const editorTabSizeOptions = [
      {label: "2", id: '2'},
      {label: "3", id: '3'},
      {label: "4", id: '4'},
    ]
  

  return (
        <div className="editor">
            <h2 className="mb-2 font-bold truncate text-xl text-textPrimary">Interface</h2>
            <hr></hr>
            <div className="my-2">
                <Checkbox
                label="Line numbers"
                value={checkedLineNum}
                onChange={handleChangeLineNum}
                />
                <p className="text-xs text-textSecondary">
                  Show line numbers on the left hand side of the editor.
                </p>
            </div>
            <div className="my-2">
                <Checkbox
                label="Toolbar"
                value={checkedToolbar}
                onChange={handleChangeToolbar}
                />
                <p className="text-xs text-textSecondary">
                  Display a markdown toolbar above the editor.
                </p>
            </div>
            <div className="my-2">
                <Checkbox
                label="Highlight Active Line"
                value={checkedHighlightLine}
                onChange={handleChangeHighlight}
                />
                <p className="text-xs text-textSecondary">
                  Highlight the current selected line in the editor.
                </p>
            </div>
            <div className="my-2">
                <Checkbox
                label="Line Wrapping"
                value={checkedWrapping}
                onChange={handleChangeWrapping}
                />
                <p className="text-xs text-textSecondary">
                  Wrap longer lines in the editor.
                </p>
            </div>
            <div className="my-2">
                <Checkbox
                label="Bracket Matching"
                value={checkedBracketMatching}
                onChange={handleChangeBracketMatching}
                />
                <p className="text-xs text-textSecondary">
                  Highlights cursor next to a bracket and the one it matches.
                </p>
            </div>
            <div className="my-2 flex space-x-16">
              <div>
                <p className="text-textPrimary">Tab Size</p>
                <span className="text-xs text-textSecondary">Size of a tab (in spaces) in your editor</span>
              </div>
              <NumberDropdown selectedOption={tabSize} OnChangeOption={handleChangeTabSize} options={editorTabSizeOptions}/>
            </div>
            <h2 className="mb-2 font-bold truncate text-xl text-textPrimary">Text Appearance</h2>
            <hr></hr>
            <div className="my-2 flex space-x-24">
              <div>
                <p className="text-textPrimary">Font Size</p>
                <span className="text-xs text-textSecondary">Size of the font used in the editor</span>
              </div>
              <NumberDropdown selectedOption={fontSize} OnChangeOption={handleChangeFontSize} options={editorFontSizeOptions}/>
            </div>
        </div> 
        )
}
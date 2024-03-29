import { useState } from "react";

export const EditorSettingOption = () => {
    const [checkedLineNum, setCheckedLineNum] = useState(true);

    const handleChangeLineNum = () => {
        setCheckedLineNum(!checkedLineNum);
    };
    
    return (
        <div className="editor">
            <h2 className="mb-2 font-bold truncate">Editor Settings</h2>

            <div>
                <Checkbox
                label="Line numbers"
                value={checkedLineNum}
                onChange={handleChangeLineNum}
                />
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
import React__default from "react";
import { IS_CODE } from "../../../FormatConstants.js";
import { currentFormat$, iconComponentFor$, applyFormat$ } from "../../core/index.js";
import { MultipleChoiceToggleGroup } from "../primitives/toolbar.js";
import { useCellValues, usePublisher } from "@mdxeditor/gurx";
const CodeToggle = () => {
  const [currentFormat, iconComponentFor] = useCellValues(currentFormat$, iconComponentFor$);
  const applyFormat = usePublisher(applyFormat$);
  const codeIsOn = (currentFormat & IS_CODE) !== 0;
  const title = codeIsOn ? "Remove code format" : "Inline code format";
  return /* @__PURE__ */ React__default.createElement(
    MultipleChoiceToggleGroup,
    {
      items: [{ title, contents: iconComponentFor("code"), active: codeIsOn, onChange: applyFormat.bind(null, "code") }]
    }
  );
};
export {
  CodeToggle
};

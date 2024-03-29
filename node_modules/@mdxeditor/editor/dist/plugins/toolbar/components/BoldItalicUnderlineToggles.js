import { currentFormat$, iconComponentFor$, applyFormat$ } from "../../core/index.js";
import { useCellValues, usePublisher } from "@mdxeditor/gurx";
import React__default from "react";
import { IS_BOLD, IS_ITALIC, IS_UNDERLINE } from "../../../FormatConstants.js";
import { MultipleChoiceToggleGroup } from "../primitives/toolbar.js";
const BoldItalicUnderlineToggles = () => {
  const [currentFormat, iconComponentFor] = useCellValues(currentFormat$, iconComponentFor$);
  const applyFormat = usePublisher(applyFormat$);
  const boldIsOn = (currentFormat & IS_BOLD) !== 0;
  const italicIsOn = (currentFormat & IS_ITALIC) !== 0;
  const underlineIsOn = (currentFormat & IS_UNDERLINE) !== 0;
  const boldTitle = boldIsOn ? "Remove bold" : "Bold";
  const italicTitle = italicIsOn ? "Remove italic" : "Italic";
  const underlineTitle = underlineIsOn ? "Remove underline" : "Underline";
  return /* @__PURE__ */ React__default.createElement(
    MultipleChoiceToggleGroup,
    {
      items: [
        { title: boldTitle, contents: iconComponentFor("format_bold"), active: boldIsOn, onChange: applyFormat.bind(null, "bold") },
        { title: italicTitle, contents: iconComponentFor("format_italic"), active: italicIsOn, onChange: applyFormat.bind(null, "italic") },
        {
          title: underlineTitle,
          contents: /* @__PURE__ */ React__default.createElement("div", { style: { transform: "translateY(2px)" } }, iconComponentFor("format_underlined")),
          active: underlineIsOn,
          onChange: applyFormat.bind(null, "underline")
        }
      ]
    }
  );
};
export {
  BoldItalicUnderlineToggles
};

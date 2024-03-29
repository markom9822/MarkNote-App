import React__default from "react";
import { ButtonWithTooltip } from "../primitives/toolbar.js";
import { insertCodeBlock$ } from "../../codeblock/index.js";
import { usePublisher, useCellValue } from "@mdxeditor/gurx";
import { iconComponentFor$ } from "../../core/index.js";
const InsertCodeBlock = () => {
  const insertCodeBlock = usePublisher(insertCodeBlock$);
  const iconComponentFor = useCellValue(iconComponentFor$);
  return /* @__PURE__ */ React__default.createElement(
    ButtonWithTooltip,
    {
      title: "Insert code block",
      onClick: () => {
        insertCodeBlock({});
      }
    },
    iconComponentFor("frame_source")
  );
};
export {
  InsertCodeBlock
};

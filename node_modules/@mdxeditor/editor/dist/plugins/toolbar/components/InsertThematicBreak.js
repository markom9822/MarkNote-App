import React__default from "react";
import { insertThematicBreak$ } from "../../thematic-break/index.js";
import { ButtonWithTooltip } from "../primitives/toolbar.js";
import { usePublisher, useCellValue } from "@mdxeditor/gurx";
import { iconComponentFor$ } from "../../core/index.js";
const InsertThematicBreak = () => {
  const insertThematicBreak = usePublisher(insertThematicBreak$);
  const iconComponentFor = useCellValue(iconComponentFor$);
  return /* @__PURE__ */ React__default.createElement(ButtonWithTooltip, { title: "Insert thematic break", onClick: () => insertThematicBreak() }, iconComponentFor("horizontal_rule"));
};
export {
  InsertThematicBreak
};

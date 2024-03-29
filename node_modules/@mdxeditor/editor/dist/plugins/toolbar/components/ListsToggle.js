import React__default from "react";
import { currentListType$, applyListType$ } from "../../lists/index.js";
import { SingleChoiceToggleGroup } from "../primitives/toolbar.js";
import { useCellValues, usePublisher } from "@mdxeditor/gurx";
import { iconComponentFor$ } from "../../core/index.js";
const LIST_TITLE_MAP = {
  bullet: "Bulleted list",
  number: "Numbered list",
  check: "Check list"
};
const ICON_NAME_MAP = {
  bullet: "format_list_bulleted",
  number: "format_list_numbered",
  check: "format_list_checked"
};
const ListsToggle = ({ options = ["bullet", "number", "check"] }) => {
  const [currentListType, iconComponentFor] = useCellValues(currentListType$, iconComponentFor$);
  const applyListType = usePublisher(applyListType$);
  const items = options.map((type) => ({
    value: type,
    title: LIST_TITLE_MAP[type],
    contents: iconComponentFor(ICON_NAME_MAP[type])
  }));
  return /* @__PURE__ */ React__default.createElement(SingleChoiceToggleGroup, { value: currentListType || "", items, onChange: applyListType });
};
export {
  ListsToggle
};

import { viewMode$, iconComponentFor$ } from "../../core/index.js";
import { useCellValues, usePublisher } from "@mdxeditor/gurx";
import React__default from "react";
import styles from "../../../styles/ui.module.css.js";
import { SingleChoiceToggleGroup } from "../primitives/toolbar.js";
const DiffSourceToggleWrapper = ({
  children,
  options = ["rich-text", "diff", "source"]
}) => {
  const [viewMode, iconComponentFor] = useCellValues(viewMode$, iconComponentFor$);
  const changeViewMode = usePublisher(viewMode$);
  const toggleGroupItems = [];
  if (options.includes("rich-text")) {
    toggleGroupItems.push({ title: "Rich text", contents: iconComponentFor("rich_text"), value: "rich-text" });
  }
  if (options.includes("diff")) {
    toggleGroupItems.push({ title: "Diff mode", contents: iconComponentFor("difference"), value: "diff" });
  }
  if (options.includes("source")) {
    toggleGroupItems.push({ title: "Source", contents: iconComponentFor("markdown"), value: "source" });
  }
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, viewMode === "rich-text" ? children : viewMode === "diff" ? /* @__PURE__ */ React__default.createElement("span", { className: styles.toolbarTitleMode }, "Diff mode") : /* @__PURE__ */ React__default.createElement("span", { className: styles.toolbarTitleMode }, "Source mode"), /* @__PURE__ */ React__default.createElement("div", { style: { marginLeft: "auto", pointerEvents: "auto", opacity: 1 } }, /* @__PURE__ */ React__default.createElement(
    SingleChoiceToggleGroup,
    {
      className: styles.diffSourceToggle,
      value: viewMode,
      items: toggleGroupItems,
      onChange: (value) => changeViewMode(value || "rich-text")
    }
  )));
};
export {
  DiffSourceToggleWrapper
};

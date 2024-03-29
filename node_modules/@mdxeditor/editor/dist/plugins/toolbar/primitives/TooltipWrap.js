import * as Tooltip from "@radix-ui/react-tooltip";
import classNames from "classnames";
import React__default from "react";
import styles from "../../../styles/ui.module.css.js";
import { useCellValue } from "@mdxeditor/gurx";
import { editorRootElementRef$ } from "../../core/index.js";
const TooltipWrap = React__default.forwardRef(({ title, children }, ref) => {
  const editorRootElementRef = useCellValue(editorRootElementRef$);
  return /* @__PURE__ */ React__default.createElement(Tooltip.Provider, { delayDuration: 100 }, /* @__PURE__ */ React__default.createElement(Tooltip.Root, null, /* @__PURE__ */ React__default.createElement(Tooltip.Trigger, { ref, asChild: true }, /* @__PURE__ */ React__default.createElement("span", { className: styles.tooltipTrigger }, children)), /* @__PURE__ */ React__default.createElement(Tooltip.Portal, { container: editorRootElementRef == null ? void 0 : editorRootElementRef.current }, /* @__PURE__ */ React__default.createElement(Tooltip.Content, { className: classNames(styles.tooltipContent), sideOffset: 10 }, title))));
});
export {
  TooltipWrap
};

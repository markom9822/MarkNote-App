import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin.js";
import React__default from "react";
import { historyState$ } from "./index.js";
import { useCellValue } from "@mdxeditor/gurx";
const SharedHistoryPlugin = () => {
  return /* @__PURE__ */ React__default.createElement(HistoryPlugin, { externalHistoryState: useCellValue(historyState$) });
};
export {
  SharedHistoryPlugin
};

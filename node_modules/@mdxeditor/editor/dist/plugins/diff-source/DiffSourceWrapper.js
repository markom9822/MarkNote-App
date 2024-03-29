import React__default from "react";
import { DiffViewer } from "./DiffViewer.js";
import { SourceEditor } from "./SourceEditor.js";
import { markdownProcessingError$, viewMode$ } from "../core/index.js";
import styles from "../../styles/ui.module.css.js";
import { useCellValues } from "@mdxeditor/gurx";
const DiffSourceWrapper = ({ children }) => {
  const [error, viewMode] = useCellValues(markdownProcessingError$, viewMode$);
  return /* @__PURE__ */ React__default.createElement("div", { className: "mdxeditor-diff-source-wrapper" }, error ? /* @__PURE__ */ React__default.createElement("div", { className: styles.markdownParseError }, /* @__PURE__ */ React__default.createElement("p", null, error.error, "."), /* @__PURE__ */ React__default.createElement("p", null, "You can fix the errors in source mode and switch to rich text mode when you are ready.")) : null, /* @__PURE__ */ React__default.createElement("div", { className: "mdxeditor-rich-text-editor", style: { display: viewMode === "rich-text" && error == null ? "block" : "none" } }, children), viewMode === "diff" ? /* @__PURE__ */ React__default.createElement(DiffViewer, null) : null, viewMode === "source" ? /* @__PURE__ */ React__default.createElement(SourceEditor, null) : null);
};
export {
  DiffSourceWrapper
};

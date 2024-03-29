import { useCellValues } from "@mdxeditor/gurx";
import React__default from "react";
import styles from "../../../styles/ui.module.css.js";
import { codeBlockLanguages$ } from "../../codemirror/index.js";
import { editorInFocus$, activeEditor$ } from "../../core/index.js";
import { Select } from "../primitives/select.js";
const EMPTY_VALUE = "__EMPTY_VALUE__";
const ChangeCodeMirrorLanguage = () => {
  const [editorInFocus, theEditor, codeBlockLanguages] = useCellValues(editorInFocus$, activeEditor$, codeBlockLanguages$);
  const codeBlockNode = editorInFocus.rootNode;
  let currentLanguage = codeBlockNode.getLanguage();
  if (currentLanguage === "") {
    currentLanguage = EMPTY_VALUE;
  }
  return /* @__PURE__ */ React__default.createElement("div", { className: styles.selectWithLabel }, /* @__PURE__ */ React__default.createElement("label", null, "Code block language:"), /* @__PURE__ */ React__default.createElement(
    Select,
    {
      value: currentLanguage,
      onChange: (language) => {
        theEditor == null ? void 0 : theEditor.update(() => {
          codeBlockNode.setLanguage(language === EMPTY_VALUE ? "" : language);
          setTimeout(() => {
            theEditor == null ? void 0 : theEditor.update(() => {
              codeBlockNode.getLatest().select();
            });
          });
        });
      },
      triggerTitle: "Select code block language",
      placeholder: "Code block language",
      items: Object.entries(codeBlockLanguages).map(([value, label]) => ({ value: value ? value : EMPTY_VALUE, label }))
    }
  ));
};
export {
  ChangeCodeMirrorLanguage
};

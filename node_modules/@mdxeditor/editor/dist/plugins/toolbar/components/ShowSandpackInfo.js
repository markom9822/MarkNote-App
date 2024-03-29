import React__default from "react";
import styles from "../../../styles/ui.module.css.js";
import { editorInFocus$, activeEditor$, iconComponentFor$ } from "../../core/index.js";
import { sandpackConfig$ } from "../../sandpack/index.js";
import { ButtonWithTooltip } from "../primitives/toolbar.js";
import { useCellValues } from "@mdxeditor/gurx";
const ShowSandpackInfo = () => {
  const [editorInFocus, theEditor, iconComponentFor, sandpackConfig] = useCellValues(
    editorInFocus$,
    activeEditor$,
    iconComponentFor$,
    sandpackConfig$
  );
  const sandpackNode = editorInFocus.rootNode;
  const preset = sandpackConfig.presets.find((preset2) => preset2.meta === sandpackNode.getMeta());
  return /* @__PURE__ */ React__default.createElement("div", { className: styles.selectWithLabel }, /* @__PURE__ */ React__default.createElement(
    ButtonWithTooltip,
    {
      title: "Delete this code block",
      onClick: () => {
        theEditor == null ? void 0 : theEditor.update(() => {
          if (sandpackNode.getNextSibling()) {
            sandpackNode.selectNext();
          } else {
            sandpackNode.selectPrevious();
          }
          sandpackNode.remove();
        });
      }
    },
    iconComponentFor("delete_big")
  ), /* @__PURE__ */ React__default.createElement("label", null, "Sandpack preset: ", preset.name));
};
export {
  ShowSandpackInfo
};

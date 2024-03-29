import React__default from "react";
import { ConditionalContents, Separator } from "../primitives/toolbar.js";
import { BlockTypeSelect } from "./BlockTypeSelect.js";
import { BoldItalicUnderlineToggles } from "./BoldItalicUnderlineToggles.js";
import { ChangeAdmonitionType } from "./ChangeAdmonitionType.js";
import { ChangeCodeMirrorLanguage } from "./ChangeCodeMirrorLanguage.js";
import { CodeToggle } from "./CodeToggle.js";
import { DiffSourceToggleWrapper } from "./DiffSourceToggleWrapper.js";
import { InsertAdmonition } from "./InsertAdmonition.js";
import { InsertCodeBlock } from "./InsertCodeBlock.js";
import { InsertFrontmatter } from "./InsertFrontmatter.js";
import { InsertImage } from "./InsertImage.js";
import { InsertSandpack } from "./InsertSandpack.js";
import { InsertTable } from "./InsertTable.js";
import { InsertThematicBreak } from "./InsertThematicBreak.js";
import { ListsToggle } from "./ListsToggle.js";
import { ShowSandpackInfo } from "./ShowSandpackInfo.js";
import { UndoRedo } from "./UndoRedo.js";
import { CreateLink } from "./CreateLink.js";
function whenInAdmonition(editorInFocus) {
  const node = editorInFocus == null ? void 0 : editorInFocus.rootNode;
  if (!node || node.getType() !== "directive") {
    return false;
  }
  return ["note", "tip", "danger", "info", "caution"].includes(node.getMdastNode().name);
}
const KitchenSinkToolbar = () => {
  return /* @__PURE__ */ React__default.createElement(DiffSourceToggleWrapper, null, /* @__PURE__ */ React__default.createElement(
    ConditionalContents,
    {
      options: [
        { when: (editor) => (editor == null ? void 0 : editor.editorType) === "codeblock", contents: () => /* @__PURE__ */ React__default.createElement(ChangeCodeMirrorLanguage, null) },
        { when: (editor) => (editor == null ? void 0 : editor.editorType) === "sandpack", contents: () => /* @__PURE__ */ React__default.createElement(ShowSandpackInfo, null) },
        {
          fallback: () => /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(UndoRedo, null), /* @__PURE__ */ React__default.createElement(Separator, null), /* @__PURE__ */ React__default.createElement(BoldItalicUnderlineToggles, null), /* @__PURE__ */ React__default.createElement(CodeToggle, null), /* @__PURE__ */ React__default.createElement(Separator, null), /* @__PURE__ */ React__default.createElement(ListsToggle, null), /* @__PURE__ */ React__default.createElement(Separator, null), /* @__PURE__ */ React__default.createElement(
            ConditionalContents,
            {
              options: [{ when: whenInAdmonition, contents: () => /* @__PURE__ */ React__default.createElement(ChangeAdmonitionType, null) }, { fallback: () => /* @__PURE__ */ React__default.createElement(BlockTypeSelect, null) }]
            }
          ), /* @__PURE__ */ React__default.createElement(Separator, null), /* @__PURE__ */ React__default.createElement(CreateLink, null), /* @__PURE__ */ React__default.createElement(InsertImage, null), /* @__PURE__ */ React__default.createElement(Separator, null), /* @__PURE__ */ React__default.createElement(InsertTable, null), /* @__PURE__ */ React__default.createElement(InsertThematicBreak, null), /* @__PURE__ */ React__default.createElement(Separator, null), /* @__PURE__ */ React__default.createElement(InsertCodeBlock, null), /* @__PURE__ */ React__default.createElement(InsertSandpack, null), /* @__PURE__ */ React__default.createElement(
            ConditionalContents,
            {
              options: [
                {
                  when: (editorInFocus) => !whenInAdmonition(editorInFocus),
                  contents: () => /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Separator, null), /* @__PURE__ */ React__default.createElement(InsertAdmonition, null))
                }
              ]
            }
          ), /* @__PURE__ */ React__default.createElement(Separator, null), /* @__PURE__ */ React__default.createElement(InsertFrontmatter, null))
        }
      ]
    }
  ));
};
export {
  KitchenSinkToolbar
};

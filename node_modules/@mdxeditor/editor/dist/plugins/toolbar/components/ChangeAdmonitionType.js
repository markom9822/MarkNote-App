import React__default from "react";
import { editorInFocus$, rootEditor$ } from "../../core/index.js";
import { Select } from "../primitives/select.js";
import { ADMONITION_TYPES } from "../../../directive-editors/AdmonitionDirectiveDescriptor.js";
import { useCellValues } from "@mdxeditor/gurx";
const ChangeAdmonitionType = () => {
  const [editorInFocus, rootEditor] = useCellValues(editorInFocus$, rootEditor$);
  const admonitionNode = editorInFocus.rootNode;
  return /* @__PURE__ */ React__default.createElement(
    Select,
    {
      value: admonitionNode.getMdastNode().name,
      onChange: (name) => {
        rootEditor == null ? void 0 : rootEditor.update(() => {
          admonitionNode.setMdastNode({ ...admonitionNode.getMdastNode(), name });
          setTimeout(() => {
            rootEditor == null ? void 0 : rootEditor.update(() => {
              admonitionNode.getLatest().select();
            });
          }, 80);
        });
      },
      triggerTitle: "Select admonition type",
      placeholder: "Admonition type",
      items: ADMONITION_TYPES.map((type) => ({ label: type.replace(/^./, (l) => l.toUpperCase()), value: type }))
    }
  );
};
export {
  ChangeAdmonitionType
};

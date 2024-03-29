import React__default from "react";
import { useNestedEditorContext, NestedLexicalEditor } from "../plugins/core/NestedLexicalEditor.js";
const ADMONITION_TYPES = ["note", "tip", "danger", "info", "caution"];
const AdmonitionDirectiveDescriptor = {
  name: "admonition",
  attributes: [],
  hasChildren: true,
  testNode(node) {
    return ADMONITION_TYPES.includes(node.name);
  },
  Editor({ mdastNode }) {
    const {
      config: { theme }
    } = useNestedEditorContext();
    return /* @__PURE__ */ React__default.createElement("div", { className: theme.admonition[mdastNode.name] }, /* @__PURE__ */ React__default.createElement(
      NestedLexicalEditor,
      {
        block: true,
        getContent: (node) => node.children,
        getUpdatedMdastNode: (mdastNode2, children) => ({ ...mdastNode2, children })
      }
    ));
  }
};
export {
  ADMONITION_TYPES,
  AdmonitionDirectiveDescriptor
};

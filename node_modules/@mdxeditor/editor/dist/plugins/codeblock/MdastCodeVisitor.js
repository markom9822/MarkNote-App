import { $createCodeBlockNode } from "./CodeBlockNode.js";
const MdastCodeVisitor = {
  testNode: (node, { codeBlockEditorDescriptors }) => {
    if (node.type === "code") {
      const descriptor = codeBlockEditorDescriptors.find((descriptor2) => descriptor2.match(node.lang, node.meta));
      return descriptor !== void 0;
    }
    return false;
  },
  visitNode({ mdastNode, actions }) {
    actions.addAndStepInto(
      $createCodeBlockNode({
        code: mdastNode.value,
        language: mdastNode.lang,
        meta: mdastNode.meta
      })
    );
  }
};
export {
  MdastCodeVisitor
};

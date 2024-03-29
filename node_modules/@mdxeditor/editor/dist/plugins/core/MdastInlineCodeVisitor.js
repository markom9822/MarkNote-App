import { $createTextNode } from "lexical";
import { IS_CODE } from "../../FormatConstants.js";
function isOpeningCodeNode(node) {
  return node.type === "html" && node.value === "<code>";
}
function isClosingCodeNode(node) {
  return node.type === "html" && node.value === "</code>";
}
const MdastInlineCodeVisitor = {
  testNode: (node) => {
    return node.type === "inlineCode" || isOpeningCodeNode(node) || isClosingCodeNode(node);
  },
  visitNode({ mdastNode, actions, mdastParent }) {
    if (isOpeningCodeNode(mdastNode)) {
      actions.addFormatting(IS_CODE, mdastParent);
      return;
    }
    if (isClosingCodeNode(mdastNode)) {
      actions.removeFormatting(IS_CODE, mdastParent);
      return;
    }
    actions.addAndStepInto($createTextNode(mdastNode.value).setFormat(IS_CODE));
  }
};
export {
  MdastInlineCodeVisitor
};

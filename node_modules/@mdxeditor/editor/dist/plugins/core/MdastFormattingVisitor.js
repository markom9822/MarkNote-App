import { IS_UNDERLINE, IS_ITALIC, IS_BOLD } from "../../FormatConstants.js";
function isOpeningUnderlineNode(node) {
  return node.type === "html" && node.value === "<u>";
}
function isClosingUnderlineNode(node) {
  return node.type === "html" && node.value === "</u>";
}
function isJsxUnderlineNode(node) {
  return node.type === "mdxJsxTextElement" && node.name === "u";
}
const MdastFormattingVisitor = {
  testNode(mdastNode) {
    return mdastNode.type === "emphasis" || mdastNode.type === "strong" || isJsxUnderlineNode(mdastNode) || isOpeningUnderlineNode(mdastNode) || isClosingUnderlineNode(mdastNode);
  },
  visitNode({ mdastNode, lexicalParent, actions, mdastParent }) {
    if (isOpeningUnderlineNode(mdastNode)) {
      actions.removeFormatting(IS_UNDERLINE, mdastParent);
      return;
    }
    if (isClosingUnderlineNode(mdastNode)) {
      actions.removeFormatting(IS_UNDERLINE, mdastParent);
      return;
    }
    if (mdastNode.type === "emphasis") {
      actions.addFormatting(IS_ITALIC);
    } else if (mdastNode.type === "strong") {
      actions.addFormatting(IS_BOLD);
    } else if (isJsxUnderlineNode(mdastNode)) {
      actions.addFormatting(IS_UNDERLINE);
    }
    actions.visitChildren(mdastNode, lexicalParent);
  }
};
export {
  MdastFormattingVisitor
};

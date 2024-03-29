import { $createTextNode } from "lexical";
const MdastTextVisitor = {
  testNode: "text",
  visitNode({ mdastNode, actions }) {
    actions.addAndStepInto($createTextNode(mdastNode.value).setFormat(actions.getParentFormatting()));
  }
};
export {
  MdastTextVisitor
};

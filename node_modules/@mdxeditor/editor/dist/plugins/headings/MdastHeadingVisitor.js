import { $createHeadingNode } from "@lexical/rich-text";
const MdastHeadingVisitor = {
  testNode: "heading",
  visitNode: function({ mdastNode, actions }) {
    actions.addAndStepInto($createHeadingNode(`h${mdastNode.depth}`));
  }
};
export {
  MdastHeadingVisitor
};

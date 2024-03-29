import { $createFrontmatterNode } from "./FrontmatterNode.js";
const MdastFrontmatterVisitor = {
  testNode: "yaml",
  visitNode({ mdastNode, actions }) {
    actions.addAndStepInto($createFrontmatterNode(mdastNode.value));
  }
};
export {
  MdastFrontmatterVisitor
};

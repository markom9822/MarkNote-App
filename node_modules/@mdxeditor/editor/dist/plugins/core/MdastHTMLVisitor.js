import { $createGenericHTMLNode } from "./GenericHTMLNode.js";
import { isMdastHTMLNode } from "./MdastHTMLNode.js";
const MdastHTMLVisitor = {
  testNode: isMdastHTMLNode,
  visitNode: function({ mdastNode, actions }) {
    actions.addAndStepInto($createGenericHTMLNode(mdastNode.name, mdastNode.type, mdastNode.attributes));
  },
  priority: -100
};
export {
  MdastHTMLVisitor
};

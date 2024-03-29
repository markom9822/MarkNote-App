import { $createDirectiveNode } from "./DirectiveNode.js";
const DIRECTIVE_TYPES = ["leafDirective", "containerDirective", "textDirective"];
function isMdastDirectivesNode(node) {
  return DIRECTIVE_TYPES.includes(node.type);
}
const MdastDirectiveVisitor = {
  testNode: (node, { directiveDescriptors }) => {
    if (isMdastDirectivesNode(node)) {
      const descriptor = directiveDescriptors.find((descriptor2) => descriptor2.testNode(node));
      return descriptor !== void 0;
    }
    return false;
  },
  visitNode({ lexicalParent, mdastNode }) {
    lexicalParent.append($createDirectiveNode(mdastNode));
  }
};
export {
  MdastDirectiveVisitor,
  isMdastDirectivesNode
};

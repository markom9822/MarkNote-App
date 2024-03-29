import { $createTableNode } from "./TableNode.js";
const MdastTableVisitor = {
  testNode: "table",
  visitNode({ mdastNode, lexicalParent }) {
    lexicalParent.append($createTableNode(mdastNode));
  }
};
export {
  MdastTableVisitor
};

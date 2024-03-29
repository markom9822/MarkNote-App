import { $createListNode, $isListItemNode, $createListItemNode } from "@lexical/list";
const MdastListVisitor = {
  testNode: "list",
  visitNode: function({ mdastNode, lexicalParent, actions }) {
    var _a;
    const listType = ((_a = mdastNode.children) == null ? void 0 : _a.some((e) => typeof e.checked === "boolean")) ? "check" : mdastNode.ordered ? "number" : "bullet";
    const lexicalNode = $createListNode(listType);
    if ($isListItemNode(lexicalParent)) {
      const dedicatedParent = $createListItemNode();
      dedicatedParent.append(lexicalNode);
      lexicalParent.insertAfter(dedicatedParent);
    } else {
      lexicalParent.append(lexicalNode);
    }
    actions.visitChildren(mdastNode, lexicalNode);
  }
};
export {
  MdastListVisitor
};

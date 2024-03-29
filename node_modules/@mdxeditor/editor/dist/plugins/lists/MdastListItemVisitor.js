import { $createListItemNode } from "@lexical/list";
const MdastListItemVisitor = {
  testNode: "listItem",
  visitNode({ mdastNode, actions, lexicalParent }) {
    const isChecked = lexicalParent.getListType() === "check" ? mdastNode.checked ?? false : void 0;
    actions.addAndStepInto($createListItemNode(isChecked));
  }
};
export {
  MdastListItemVisitor
};

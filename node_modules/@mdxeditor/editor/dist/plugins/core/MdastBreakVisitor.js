import { $createLineBreakNode } from "lexical";
const MdastBreakVisitor = {
  testNode: "break",
  visitNode: function({ lexicalParent }) {
    lexicalParent.append($createLineBreakNode());
  }
};
export {
  MdastBreakVisitor
};

const MdastRootVisitor = {
  testNode: "root",
  visitNode({ actions, mdastNode, lexicalParent }) {
    actions.visitChildren(mdastNode, lexicalParent);
  }
};
export {
  MdastRootVisitor
};

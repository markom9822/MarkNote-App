import { $createLinkNode } from "@lexical/link";
const MdastLinkVisitor = {
  testNode: "link",
  visitNode({ mdastNode, actions }) {
    actions.addAndStepInto(
      $createLinkNode(mdastNode.url, {
        title: mdastNode.title
      })
    );
  }
};
export {
  MdastLinkVisitor
};

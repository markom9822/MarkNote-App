import { $createQuoteNode } from "@lexical/rich-text";
const MdastBlockQuoteVisitor = {
  testNode: "blockquote",
  visitNode({ actions }) {
    actions.addAndStepInto($createQuoteNode());
  }
};
export {
  MdastBlockQuoteVisitor
};

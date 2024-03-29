import { $createParagraphNode } from "lexical";
const lexicalTypesThatShouldSkipParagraphs = ["listitem", "quote", "admonition"];
const MdastParagraphVisitor = {
  testNode: "paragraph",
  visitNode: function({ mdastNode, lexicalParent, actions }) {
    if (lexicalTypesThatShouldSkipParagraphs.includes(lexicalParent.getType())) {
      actions.visitChildren(mdastNode, lexicalParent);
    } else {
      actions.addAndStepInto($createParagraphNode());
    }
  }
};
export {
  MdastParagraphVisitor
};

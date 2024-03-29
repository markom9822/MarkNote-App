import { $isImageNode } from "./ImageNode.js";
const LexicalImageVisitor = {
  testLexicalNode: $isImageNode,
  visitLexicalNode({ mdastParent, lexicalNode, actions }) {
    if (lexicalNode.hasExplicitDimensions()) {
      const img = new Image();
      if (lexicalNode.getHeight() !== "inherit") {
        img.height = lexicalNode.getHeight();
      }
      if (lexicalNode.getWidth() !== "inherit") {
        img.width = lexicalNode.getWidth();
      }
      if (lexicalNode.getAltText()) {
        img.alt = lexicalNode.getAltText();
      }
      if (lexicalNode.getTitle()) {
        img.title = lexicalNode.getTitle();
      }
      actions.appendToParent(mdastParent, {
        type: "html",
        value: img.outerHTML.replace(/>$/, ` src="${lexicalNode.getSrc()}" />`)
      });
    } else {
      actions.appendToParent(mdastParent, {
        type: "image",
        url: lexicalNode.getSrc(),
        alt: lexicalNode.getAltText(),
        title: lexicalNode.getTitle()
      });
    }
  }
};
export {
  LexicalImageVisitor
};

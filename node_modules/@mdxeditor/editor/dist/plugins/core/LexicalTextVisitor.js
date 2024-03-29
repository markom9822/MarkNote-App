import { $isTextNode } from "lexical";
import { IS_CODE, IS_ITALIC, IS_BOLD, IS_UNDERLINE } from "../../FormatConstants.js";
function isMdastText(mdastNode) {
  return mdastNode.type === "text";
}
const JOINABLE_TAGS = ["u", "span"];
const LexicalTextVisitor = {
  shouldJoin: (prevNode, currentNode) => {
    if (["text", "emphasis", "strong"].includes(prevNode.type)) {
      return prevNode.type === currentNode.type;
    }
    if (prevNode.type === "mdxJsxTextElement" && currentNode.type === "mdxJsxTextElement" && JOINABLE_TAGS.includes(currentNode.name)) {
      const currentMdxNode = currentNode;
      return prevNode.name === currentMdxNode.name && JSON.stringify(prevNode.attributes) === JSON.stringify(currentMdxNode.attributes);
    }
    return false;
  },
  join(prevNode, currentNode) {
    if (isMdastText(prevNode) && isMdastText(currentNode)) {
      return {
        type: "text",
        value: prevNode.value + currentNode.value
      };
    } else {
      return {
        ...prevNode,
        children: [...prevNode.children, ...currentNode.children]
      };
    }
  },
  testLexicalNode: $isTextNode,
  visitLexicalNode: ({ lexicalNode, mdastParent, actions }) => {
    const previousSibling = lexicalNode.getPreviousSibling();
    const prevFormat = $isTextNode(previousSibling) ? previousSibling.getFormat() : 0;
    const textContent = lexicalNode.getTextContent();
    const format = lexicalNode.getFormat() ?? 0;
    const style = lexicalNode.getStyle();
    if (format & IS_CODE) {
      actions.addAndStepInto("inlineCode", {
        value: textContent
      });
      return;
    }
    let localParentNode = mdastParent;
    if (style) {
      localParentNode = actions.appendToParent(localParentNode, {
        type: "mdxJsxTextElement",
        name: "span",
        children: [],
        attributes: [{ type: "mdxJsxAttribute", name: "style", value: style }]
      });
    }
    if (prevFormat & format & IS_ITALIC) {
      localParentNode = actions.appendToParent(localParentNode, {
        type: "emphasis",
        children: []
      });
    }
    if (prevFormat & format & IS_BOLD) {
      localParentNode = actions.appendToParent(localParentNode, {
        type: "strong",
        children: []
      });
    }
    if (prevFormat & format & IS_UNDERLINE) {
      localParentNode = actions.appendToParent(localParentNode, {
        type: "mdxJsxTextElement",
        name: "u",
        children: [],
        attributes: []
      });
    }
    if (format & IS_ITALIC && !(prevFormat & IS_ITALIC)) {
      localParentNode = actions.appendToParent(localParentNode, {
        type: "emphasis",
        children: []
      });
    }
    if (format & IS_BOLD && !(prevFormat & IS_BOLD)) {
      localParentNode = actions.appendToParent(localParentNode, {
        type: "strong",
        children: []
      });
    }
    if (format & IS_UNDERLINE && !(prevFormat & IS_UNDERLINE)) {
      localParentNode = actions.appendToParent(localParentNode, {
        type: "mdxJsxTextElement",
        name: "u",
        children: [],
        attributes: []
      });
    }
    actions.appendToParent(localParentNode, {
      type: "text",
      value: textContent
    });
  }
};
export {
  LexicalTextVisitor,
  isMdastText
};

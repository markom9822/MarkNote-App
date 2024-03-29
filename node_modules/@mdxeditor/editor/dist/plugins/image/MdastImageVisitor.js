import { $createImageNode } from "./ImageNode.js";
import { $createParagraphNode } from "lexical";
const MdastImageVisitor = {
  testNode: "image",
  visitNode({ mdastNode, actions }) {
    actions.addAndStepInto(
      $createImageNode({
        src: mdastNode.url,
        altText: mdastNode.alt || "",
        title: mdastNode.title || ""
      })
    );
  }
};
const MdastHtmlImageVisitor = {
  testNode: (node) => {
    return node.type === "html" && node.value.trim().startsWith("<img");
  },
  visitNode({ mdastNode, lexicalParent }) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = mdastNode.value;
    const img = wrapper.querySelector("img");
    if (!img) {
      throw new Error("Invalid HTML image");
    }
    const src = img.src;
    const altText = img.alt;
    const title = img.title;
    const width = img.width;
    const height = img.height;
    const image = $createImageNode({
      src: src || "",
      altText,
      title,
      width,
      height
    });
    if (lexicalParent.getType() === "root") {
      const paragraph = $createParagraphNode();
      paragraph.append(image);
      lexicalParent.append(paragraph);
    } else {
      lexicalParent.append(image);
    }
  }
};
function getAttributeValue(node, attributeName) {
  const attribute = node.attributes.find((a) => a.type === "mdxJsxAttribute" && a.name === attributeName);
  if (!attribute) {
    return void 0;
  }
  return attribute.value;
}
const MdastJsxImageVisitor = {
  testNode: (node) => {
    return (node.type === "mdxJsxTextElement" || node.type === "mdxJsxFlowElement") && node.name === "img";
  },
  visitNode({ mdastNode, lexicalParent }) {
    const src = getAttributeValue(mdastNode, "src");
    if (!src) {
      return;
    }
    const altText = getAttributeValue(mdastNode, "alt") || "";
    const title = getAttributeValue(mdastNode, "title");
    const height = getAttributeValue(mdastNode, "height");
    const width = getAttributeValue(mdastNode, "width");
    const image = $createImageNode({
      src,
      altText,
      title,
      width: width ? parseInt(width, 10) : void 0,
      height: height ? parseInt(height, 10) : void 0
    });
    if (lexicalParent.getType() === "root") {
      const paragraph = $createParagraphNode();
      paragraph.append(image);
      lexicalParent.append(paragraph);
    } else {
      lexicalParent.append(image);
    }
  }
};
export {
  MdastHtmlImageVisitor,
  MdastImageVisitor,
  MdastJsxImageVisitor
};

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { ElementNode, $applyNodeReplacement } from "lexical";
const TYPE_NAME = "generic-html";
class GenericHTMLNode extends ElementNode {
  /**
   * Constructs a new {@link GenericHTMLNode} with the specified MDAST HTML node as the object to edit.
   */
  constructor(tag, type, attributes, key) {
    super(key);
    /** @internal */
    __publicField(this, "__tag");
    /** @internal */
    __publicField(this, "__nodeType");
    /** @internal */
    __publicField(this, "__attributes");
    this.__tag = tag;
    this.__nodeType = type;
    this.__attributes = attributes;
  }
  /** @internal */
  static getType() {
    return TYPE_NAME;
  }
  /** @internal */
  static clone(node) {
    return new GenericHTMLNode(node.__tag, node.__nodeType, node.__attributes, node.__key);
  }
  getTag() {
    return this.__tag;
  }
  getNodeType() {
    return this.__nodeType;
  }
  getAttributes() {
    return this.__attributes;
  }
  updateAttributes(attributes) {
    const self = this.getWritable();
    self.__attributes = attributes;
  }
  getStyle() {
    var _a;
    return (_a = this.__attributes.find((attribute) => attribute.name === "style")) == null ? void 0 : _a.value;
  }
  // View
  createDOM() {
    const tag = this.__tag;
    const element = document.createElement(tag);
    this.__attributes.forEach((attribute) => {
      element.setAttribute(attribute.name, attribute.value);
    });
    return element;
  }
  updateDOM() {
    return false;
  }
  static importDOM() {
    return {};
  }
  exportDOM(editor) {
    const { element } = super.exportDOM(editor);
    return {
      element
    };
  }
  static importJSON(serializedNode) {
    const node = $createGenericHTMLNode(serializedNode.tag, serializedNode.mdxType, serializedNode.attributes);
    node.setFormat(serializedNode.format);
    node.setIndent(serializedNode.indent);
    node.setDirection(serializedNode.direction);
    return node;
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      tag: this.getTag(),
      attributes: this.__attributes,
      mdxType: this.__nodeType,
      type: TYPE_NAME,
      version: 1
    };
  }
  /*
    // Mutation
    insertNewAfter(selection?: RangeSelection, restoreSelection = true): ParagraphNode | GenericHTMLNode {
      const anchorOffet = selection ? selection.anchor.offset : 0
      const newElement =
        anchorOffet > 0 && anchorOffet < this.getTextContentSize() ? $createHeadingNode(this.getTag()) : $createParagraphNode()
      const direction = this.getDirection()
      newElement.setDirection(direction)
      this.insertAfter(newElement, restoreSelection)
      return newElement
    }
  
    collapseAtStart(): true {
      const newElement = !this.isEmpty() ? $createHeadingNode(this.getTag()) : $createParagraphNode()
      const children = this.getChildren()
      children.forEach((child) => newElement.append(child))
      this.replace(newElement)
      return true
    }*/
  extractWithChild() {
    return true;
  }
  isInline() {
    return this.__nodeType === "mdxJsxTextElement";
  }
}
function $createGenericHTMLNode(tag, type, attributes) {
  return $applyNodeReplacement(new GenericHTMLNode(tag, type, attributes));
}
function $isGenericHTMLNode(node) {
  return node instanceof GenericHTMLNode;
}
export {
  $createGenericHTMLNode,
  $isGenericHTMLNode,
  GenericHTMLNode,
  TYPE_NAME
};

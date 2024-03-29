var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import React__default from "react";
import { DecoratorNode, $applyNodeReplacement } from "lexical";
import lexicalThemeStyles from "../../styles/lexical-theme.module.css.js";
import styles from "../../styles/ui.module.css.js";
class LexicalMdxTextExpressionNode extends DecoratorNode {
  /**
   * Constructs a new {@link GenericHTMLNode} with the specified MDAST HTML node as the object to edit.
   */
  constructor(value, key) {
    super(key);
    /** @internal */
    __publicField(this, "__value");
    this.__value = value;
  }
  /** @internal */
  static getType() {
    return "mdx-text-expression";
  }
  /** @internal */
  static clone(node) {
    return new LexicalMdxTextExpressionNode(node.__value, node.__key);
  }
  getValue() {
    return this.__value;
  }
  // View
  createDOM() {
    const element = document.createElement("span");
    element.classList.add(lexicalThemeStyles.mdxTextExpression);
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
    return $createLexicalMdxTextExpressionNode(serializedNode.value);
  }
  exportJSON() {
    return {
      ...super.exportJSON(),
      value: this.getValue(),
      type: "mdx-text-expression",
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
    return true;
  }
  decorate(editor) {
    return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, "{", /* @__PURE__ */ React__default.createElement("span", { className: styles.inputSizer, "data-value": this.getValue() }, /* @__PURE__ */ React__default.createElement(
      "input",
      {
        size: 1,
        onKeyDown: (e) => {
          const value = e.target.value;
          if (value === "" && e.key === "Backspace" || e.key === "Delete") {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            e.preventDefault();
            editor.update(() => {
              this.selectPrevious();
              this.remove();
            });
          }
        },
        onChange: (e) => {
          e.target.parentElement.dataset.value = e.target.value;
          editor.update(() => {
            this.getWritable().__value = e.target.value;
          });
        },
        type: "text",
        value: this.getValue()
      }
    )), "}");
  }
}
function $createLexicalMdxTextExpressionNode(value) {
  return $applyNodeReplacement(new LexicalMdxTextExpressionNode(value));
}
function $isLexicalMdxTextExpressionNode(node) {
  return node instanceof LexicalMdxTextExpressionNode;
}
export {
  $createLexicalMdxTextExpressionNode,
  $isLexicalMdxTextExpressionNode,
  LexicalMdxTextExpressionNode
};

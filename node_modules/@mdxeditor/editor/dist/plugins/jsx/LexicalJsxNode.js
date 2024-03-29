var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { DecoratorNode } from "lexical";
import React__default from "react";
import { NestedEditorsContext } from "../core/NestedLexicalEditor.js";
import { voidEmitter } from "../../utils/voidEmitter.js";
import { useCellValue } from "@mdxeditor/gurx";
import { jsxComponentDescriptors$ } from "../core/index.js";
class LexicalJsxNode extends DecoratorNode {
  constructor(mdastNode, key) {
    super(key);
    __publicField(this, "__mdastNode");
    __publicField(this, "__focusEmitter", voidEmitter());
    __publicField(this, "select", () => {
      this.__focusEmitter.publish();
    });
    this.__mdastNode = mdastNode;
  }
  static getType() {
    return "jsx";
  }
  static clone(node) {
    return new LexicalJsxNode(structuredClone(node.__mdastNode));
  }
  static importJSON(serializedNode) {
    return $createLexicalJsxNode(serializedNode.mdastNode);
  }
  getMdastNode() {
    return this.__mdastNode;
  }
  exportJSON() {
    return {
      mdastNode: this.getMdastNode(),
      type: "jsx",
      version: 1
    };
  }
  createDOM() {
    return document.createElement(this.__mdastNode.type === "mdxJsxTextElement" ? "span" : "div");
  }
  updateDOM() {
    return false;
  }
  setMdastNode(mdastNode) {
    this.getWritable().__mdastNode = mdastNode;
  }
  decorate(parentEditor, config) {
    return /* @__PURE__ */ React__default.createElement(
      JsxEditorContainer,
      {
        lexicalJsxNode: this,
        config,
        mdastNode: this.getMdastNode(),
        parentEditor,
        focusEmitter: this.__focusEmitter
      }
    );
  }
  isInline() {
    return this.__mdastNode.type === "mdxJsxTextElement";
  }
  isKeyboardSelectable() {
    return true;
  }
}
function JsxEditorContainer(props) {
  const { mdastNode } = props;
  const jsxComponentDescriptors = useCellValue(jsxComponentDescriptors$);
  const descriptor = jsxComponentDescriptors.find((descriptor2) => descriptor2.name === mdastNode.name);
  if (!descriptor) {
    throw new Error(`No JSX descriptor found for ${mdastNode.name}`);
  }
  const Editor = descriptor.Editor;
  return /* @__PURE__ */ React__default.createElement(
    NestedEditorsContext.Provider,
    {
      value: {
        config: props.config,
        focusEmitter: props.focusEmitter,
        mdastNode,
        parentEditor: props.parentEditor,
        lexicalNode: props.lexicalJsxNode
      }
    },
    /* @__PURE__ */ React__default.createElement(Editor, { descriptor, mdastNode })
  );
}
function $createLexicalJsxNode(mdastNode) {
  return new LexicalJsxNode(mdastNode);
}
function $isLexicalJsxNode(node) {
  return node instanceof LexicalJsxNode;
}
export {
  $createLexicalJsxNode,
  $isLexicalJsxNode,
  JsxEditorContainer,
  LexicalJsxNode
};

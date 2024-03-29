var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import React__default from "react";
import { DecoratorNode } from "lexical";
import { NestedEditorsContext } from "../core/NestedLexicalEditor.js";
import { voidEmitter } from "../../utils/voidEmitter.js";
import { useCellValues } from "@mdxeditor/gurx";
import { directiveDescriptors$ } from "../core/index.js";
let GENERATION = 0;
class DirectiveNode extends DecoratorNode {
  /**
   * Constructs a new {@link DirectiveNode} with the specified MDAST directive node as the object to edit.
   */
  constructor(mdastNode, key) {
    super(key);
    /** @internal */
    __publicField(this, "__mdastNode");
    /** @internal */
    __publicField(this, "__focusEmitter", voidEmitter());
    /**
     * Focuses the direcitive editor.
     */
    __publicField(this, "select", () => {
      this.__focusEmitter.publish();
    });
    this.__mdastNode = mdastNode;
    this.generation = GENERATION++;
  }
  /** @internal */
  static getType() {
    return "directive";
  }
  /** @internal */
  static clone(node) {
    return new DirectiveNode(structuredClone(node.__mdastNode), node.__key);
  }
  /** @internal */
  static importJSON(serializedNode) {
    return $createDirectiveNode(serializedNode.mdastNode);
  }
  /**
   * Returns the MDAST node that is being edited.
   */
  getMdastNode() {
    return this.__mdastNode;
  }
  /** @internal */
  exportJSON() {
    return {
      mdastNode: structuredClone(this.__mdastNode),
      type: "directive",
      version: 1
    };
  }
  /** @internal */
  createDOM() {
    return document.createElement(this.__mdastNode.type === "textDirective" ? "span" : "div");
  }
  /** @internal */
  updateDOM() {
    return false;
  }
  /**
   * Sets a new MDAST node to edit.
   */
  setMdastNode(mdastNode) {
    this.getWritable().__mdastNode = mdastNode;
  }
  /** @internal */
  decorate(parentEditor, config) {
    return /* @__PURE__ */ React__default.createElement(
      DirectiveEditorContainer,
      {
        lexicalNode: this,
        mdastNode: this.getMdastNode(),
        parentEditor,
        config,
        focusEmitter: this.__focusEmitter
      }
    );
  }
  /** @internal */
  isInline() {
    return this.__mdastNode.type === "textDirective";
  }
  /** @internal */
  isKeyboardSelectable() {
    return true;
  }
}
const DirectiveEditorContainer = (props) => {
  const { mdastNode } = props;
  const [directiveDescriptors] = useCellValues(directiveDescriptors$);
  const descriptor = directiveDescriptors.find((descriptor2) => descriptor2.testNode(mdastNode));
  if (!descriptor) {
    throw new Error(`No descriptor found for directive ${mdastNode.name}`);
  }
  const Editor = descriptor.Editor;
  return /* @__PURE__ */ React__default.createElement(NestedEditorsContext.Provider, { value: props }, /* @__PURE__ */ React__default.createElement(Editor, { descriptor, mdastNode, lexicalNode: props.lexicalNode, parentEditor: props.parentEditor }));
};
function $createDirectiveNode(mdastNode, key) {
  return new DirectiveNode(mdastNode, key);
}
function $isDirectiveNode(node) {
  return node instanceof DirectiveNode;
}
export {
  $createDirectiveNode,
  $isDirectiveNode,
  DirectiveNode
};

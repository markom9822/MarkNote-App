var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { DecoratorNode } from "lexical";
import React__default from "react";
import { FrontmatterEditor } from "./FrontmatterEditor.js";
class FrontmatterNode extends DecoratorNode {
  constructor(code, key) {
    super(key);
    __publicField(this, "__yaml");
    this.__yaml = code;
  }
  static getType() {
    return "frontmatter";
  }
  static clone(node) {
    return new FrontmatterNode(node.__yaml, node.__key);
  }
  static importJSON(serializedNode) {
    const { yaml } = serializedNode;
    const node = $createFrontmatterNode(yaml);
    return node;
  }
  exportJSON() {
    return {
      yaml: this.getYaml(),
      type: "frontmatter",
      version: 1
    };
  }
  // View
  createDOM(_config) {
    return document.createElement("div");
  }
  updateDOM() {
    return false;
  }
  getYaml() {
    return this.getLatest().__yaml;
  }
  setYaml(yaml) {
    if (yaml !== this.__yaml) {
      this.getWritable().__yaml = yaml;
    }
  }
  decorate(editor) {
    return /* @__PURE__ */ React__default.createElement(
      FrontmatterEditor,
      {
        yaml: this.getYaml(),
        onChange: (yaml) => editor == null ? void 0 : editor.update(() => {
          this.setYaml(yaml);
        })
      }
    );
  }
}
function $createFrontmatterNode(yaml) {
  return new FrontmatterNode(yaml);
}
function $isFrontmatterNode(node) {
  return node instanceof FrontmatterNode;
}
export {
  $createFrontmatterNode,
  $isFrontmatterNode,
  FrontmatterNode
};

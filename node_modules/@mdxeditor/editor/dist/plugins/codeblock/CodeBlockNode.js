var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { useCellValue } from "@mdxeditor/gurx";
import { DecoratorNode } from "lexical";
import React__default from "react";
import { voidEmitter } from "../../utils/voidEmitter.js";
import { codeBlockEditorDescriptors$, NESTED_EDITOR_UPDATED_COMMAND } from "../core/index.js";
class CodeBlockNode extends DecoratorNode {
  constructor(code, language, meta, key) {
    super(key);
    __publicField(this, "__code");
    __publicField(this, "__meta");
    __publicField(this, "__language");
    __publicField(this, "__focusEmitter", voidEmitter());
    __publicField(this, "setCode", (code) => {
      if (code !== this.__code) {
        this.getWritable().__code = code;
      }
    });
    __publicField(this, "setMeta", (meta) => {
      if (meta !== this.__meta) {
        this.getWritable().__meta = meta;
      }
    });
    __publicField(this, "setLanguage", (language) => {
      if (language !== this.__language) {
        this.getWritable().__language = language;
      }
    });
    __publicField(this, "select", () => {
      this.__focusEmitter.publish();
    });
    this.__code = code;
    this.__meta = meta;
    this.__language = language;
  }
  static getType() {
    return "codeblock";
  }
  static clone(node) {
    return new CodeBlockNode(node.__code, node.__language, node.__meta, node.__key);
  }
  static importJSON(serializedNode) {
    const { code, meta, language } = serializedNode;
    return $createCodeBlockNode({
      code,
      language,
      meta
    });
  }
  exportJSON() {
    return {
      code: this.getCode(),
      language: this.getLanguage(),
      meta: this.getMeta(),
      type: "codeblock",
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
  getCode() {
    return this.__code;
  }
  getMeta() {
    return this.__meta;
  }
  getLanguage() {
    return this.__language;
  }
  decorate(editor) {
    return /* @__PURE__ */ React__default.createElement(
      CodeBlockEditorContainer,
      {
        parentEditor: editor,
        code: this.getCode(),
        meta: this.getMeta(),
        language: this.getLanguage(),
        codeBlockNode: this,
        nodeKey: this.getKey(),
        focusEmitter: this.__focusEmitter
      }
    );
  }
  isInline() {
    return false;
  }
}
const CodeBlockEditorContext = React__default.createContext(null);
const CodeBlockEditorContextProvider = ({ parentEditor, lexicalNode, children }) => {
  return /* @__PURE__ */ React__default.createElement(
    CodeBlockEditorContext.Provider,
    {
      value: {
        lexicalNode,
        setCode: (code) => {
          parentEditor.update(() => {
            lexicalNode.setCode(code);
            setTimeout(() => {
              parentEditor.dispatchCommand(NESTED_EDITOR_UPDATED_COMMAND, void 0);
            }, 0);
          });
        },
        setLanguage: (language) => {
          parentEditor.update(() => {
            lexicalNode.setLanguage(language);
          });
        },
        setMeta: (meta) => {
          parentEditor.update(() => {
            lexicalNode.setMeta(meta);
          });
        }
      }
    },
    children
  );
};
function useCodeBlockEditorContext() {
  const context = React__default.useContext(CodeBlockEditorContext);
  if (!context) {
    throw new Error("useCodeBlockEditor must be used within a CodeBlockEditor");
  }
  return context;
}
const CodeBlockEditorContainer = (props) => {
  const codeBlockEditorDescriptors = useCellValue(codeBlockEditorDescriptors$);
  const descriptor = codeBlockEditorDescriptors.sort((a, b) => b.priority - a.priority).find((descriptor2) => descriptor2.match(props.language || "", props.meta || ""));
  if (!descriptor) {
    throw new Error(`No CodeBlockEditor registered for language=${props.language} meta=${props.meta}`);
  }
  const Editor = descriptor.Editor;
  const { codeBlockNode: _, parentEditor: __, ...restProps } = props;
  return /* @__PURE__ */ React__default.createElement(CodeBlockEditorContextProvider, { parentEditor: props.parentEditor, lexicalNode: props.codeBlockNode }, /* @__PURE__ */ React__default.createElement(Editor, { ...restProps }));
};
function $createCodeBlockNode(options) {
  const { code = "", language = "", meta = "" } = options;
  return new CodeBlockNode(code, language, meta);
}
function $isCodeBlockNode(node) {
  return node instanceof CodeBlockNode;
}
export {
  $createCodeBlockNode,
  $isCodeBlockNode,
  CodeBlockNode,
  useCodeBlockEditorContext
};

import React__default from "react";
import { useCodeMirrorRef } from "./useCodeMirrorRef.js";
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import { useCodeBlockEditorContext } from "../codeblock/CodeBlockNode.js";
import { readOnly$ } from "../core/index.js";
import { useCellValue } from "@mdxeditor/gurx";
const CodeUpdateEmitter = ({ onChange, snippetFileName }) => {
  const { sandpack } = useSandpack();
  onChange(sandpack.files[snippetFileName].code);
  return null;
};
const SandpackEditor = ({ nodeKey, code, focusEmitter, preset }) => {
  const codeMirrorRef = useCodeMirrorRef(nodeKey, "sandpack", "jsx", focusEmitter);
  const readOnly = useCellValue(readOnly$);
  const { setCode } = useCodeBlockEditorContext();
  return /* @__PURE__ */ React__default.createElement(
    SandpackProvider,
    {
      template: preset.sandpackTemplate,
      theme: preset.sandpackTheme,
      files: {
        [preset.snippetFileName]: code,
        ...Object.entries(preset.files || {}).reduce(
          (acc, [filePath, fileContents]) => ({ ...acc, ...{ [filePath]: { code: fileContents, readOnly: true } } }),
          {}
        )
      },
      customSetup: {
        dependencies: preset.dependencies
      }
    },
    /* @__PURE__ */ React__default.createElement(SandpackLayout, null, /* @__PURE__ */ React__default.createElement(SandpackCodeEditor, { readOnly, showLineNumbers: true, showInlineErrors: true, ref: codeMirrorRef }), /* @__PURE__ */ React__default.createElement(SandpackPreview, null)),
    /* @__PURE__ */ React__default.createElement(CodeUpdateEmitter, { onChange: setCode, snippetFileName: preset.snippetFileName })
  );
};
export {
  SandpackEditor
};

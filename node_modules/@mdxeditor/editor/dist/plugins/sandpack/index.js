import React__default from "react";
import { insertCodeBlock$, appendCodeBlockEditorDescriptor$ } from "../codeblock/index.js";
import { SandpackEditor } from "./SandpackEditor.js";
import { Cell, Signal, withLatestFrom, map, useCellValue } from "@mdxeditor/gurx";
import { realmPlugin } from "../../RealmWithPlugins.js";
const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`;
const defaultSandpackConfig = {
  defaultPreset: "react",
  presets: [
    {
      name: "react",
      meta: "live react",
      label: "React",
      sandpackTemplate: "react",
      sandpackTheme: "light",
      snippetFileName: "/App.js",
      snippetLanguage: "jsx",
      initialSnippetContent: defaultSnippetContent
    }
  ]
};
const sandpackConfig$ = Cell(defaultSandpackConfig);
const insertSandpack$ = Signal((r) => {
  r.link(
    r.pipe(
      insertSandpack$,
      withLatestFrom(sandpackConfig$),
      map(([presetName, sandpackConfig]) => {
        const preset = presetName ? sandpackConfig.presets.find((preset2) => preset2.name === presetName) : sandpackConfig.presets.find((preset2) => preset2.name == sandpackConfig.defaultPreset);
        if (!preset) {
          throw new Error(`No sandpack preset found with name ${presetName}`);
        }
        return {
          code: preset.initialSnippetContent || "",
          language: preset.snippetLanguage || "jsx",
          meta: preset.meta
        };
      })
    ),
    insertCodeBlock$
  );
});
const sandpackPlugin = realmPlugin({
  init(realm, params) {
    realm.pubIn({
      [sandpackConfig$]: params == null ? void 0 : params.sandpackConfig,
      [appendCodeBlockEditorDescriptor$]: sandpackCodeBlockDescriptor()
    });
  },
  update(realm, params) {
    realm.pub(sandpackConfig$, params == null ? void 0 : params.sandpackConfig);
  }
});
function sandpackCodeBlockDescriptor() {
  return {
    match(_language, meta) {
      return Boolean(meta == null ? void 0 : meta.startsWith("live"));
    },
    Editor(props) {
      const config = useCellValue(sandpackConfig$);
      const preset = config.presets.find((preset2) => preset2.meta === props.meta);
      if (!preset) {
        throw new Error(`No sandpack preset found with ${props.meta}`);
      }
      return /* @__PURE__ */ React__default.createElement(SandpackEditor, { ...props, preset });
    },
    priority: 1
  };
}
export {
  insertSandpack$,
  sandpackConfig$,
  sandpackPlugin
};

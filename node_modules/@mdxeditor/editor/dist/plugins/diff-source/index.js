import { addEditorWrapper$, viewMode$ } from "../core/index.js";
import { DiffSourceWrapper } from "./DiffSourceWrapper.js";
import { Cell } from "@mdxeditor/gurx";
import { realmPlugin } from "../../RealmWithPlugins.js";
const diffMarkdown$ = Cell("");
const cmExtensions$ = Cell([]);
const diffSourcePlugin = realmPlugin({
  update: (r, params) => {
    r.pub(diffMarkdown$, (params == null ? void 0 : params.diffMarkdown) || "");
  },
  init(r, params) {
    r.pubIn({
      [diffMarkdown$]: (params == null ? void 0 : params.diffMarkdown) || "",
      [cmExtensions$]: (params == null ? void 0 : params.codeMirrorExtensions) || [],
      [addEditorWrapper$]: DiffSourceWrapper,
      [viewMode$]: (params == null ? void 0 : params.viewMode) || "rich-text"
    });
  }
});
export {
  cmExtensions$,
  diffMarkdown$,
  diffSourcePlugin
};

import { realmPlugin } from "../../RealmWithPlugins.js";
import { Cell, useCellValues } from "@mdxeditor/gurx";
import React__default from "react";
import { addTopAreaChild$, readOnly$ } from "../core/index.js";
import { Root } from "./primitives/toolbar.js";
const toolbarContents$ = Cell(() => null);
const DEFAULT_TOOLBAR_CONTENTS = () => {
  return "This is an empty toolbar. Pass `{toolbarContents: () => { return <>toolbar components</> }}` to the toolbarPlugin to customize it.";
};
const toolbarPlugin = realmPlugin({
  init(realm, params) {
    realm.pubIn({
      [toolbarContents$]: (params == null ? void 0 : params.toolbarContents) ?? DEFAULT_TOOLBAR_CONTENTS,
      [addTopAreaChild$]: () => {
        const [toolbarContents, readOnly] = useCellValues(toolbarContents$, readOnly$);
        return /* @__PURE__ */ React__default.createElement(Root, { readOnly }, toolbarContents());
      }
    });
  },
  update(realm, params) {
    realm.pub(toolbarContents$, (params == null ? void 0 : params.toolbarContents) ?? DEFAULT_TOOLBAR_CONTENTS);
  }
});
export {
  toolbarContents$,
  toolbarPlugin
};

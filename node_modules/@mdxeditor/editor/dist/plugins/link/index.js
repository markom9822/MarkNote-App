import React__default from "react";
import { MdastLinkVisitor } from "./MdastLinkVisitor.js";
import { LexicalLinkVisitor } from "./LexicalLinkVisitor.js";
import { LinkNode, AutoLinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin.js";
import { LexicalAutoLinkPlugin } from "./AutoLinkPlugin.js";
import { Cell } from "@mdxeditor/gurx";
import { realmPlugin } from "../../RealmWithPlugins.js";
import { addActivePlugin$, addImportVisitor$, addLexicalNode$, addExportVisitor$, addComposerChild$ } from "../core/index.js";
const disableAutoLink$ = Cell(false);
const linkPlugin = realmPlugin({
  init(realm, params) {
    const disableAutoLink = Boolean(params == null ? void 0 : params.disableAutoLink);
    const linkPluginProps = (params == null ? void 0 : params.validateUrl) ? { validateUrl: params.validateUrl } : {};
    realm.pubIn({
      [addActivePlugin$]: "link",
      [addImportVisitor$]: MdastLinkVisitor,
      [addLexicalNode$]: [LinkNode, AutoLinkNode],
      [addExportVisitor$]: LexicalLinkVisitor,
      [disableAutoLink$]: disableAutoLink,
      [addComposerChild$]: () => /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(LinkPlugin, { ...linkPluginProps }), disableAutoLink ? null : /* @__PURE__ */ React__default.createElement(LexicalAutoLinkPlugin, null))
    });
  }
});
export {
  disableAutoLink$,
  linkPlugin
};

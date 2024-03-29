import { QuoteNode } from "@lexical/rich-text";
import { MdastBlockQuoteVisitor } from "./MdastBlockQuoteVisitor.js";
import { LexicalQuoteVisitor } from "./LexicalQuoteVisitor.js";
import { realmPlugin } from "../../RealmWithPlugins.js";
import { addActivePlugin$, addImportVisitor$, addLexicalNode$, addExportVisitor$ } from "../core/index.js";
const quotePlugin = realmPlugin({
  init(realm) {
    realm.pubIn({
      [addActivePlugin$]: "quote",
      [addImportVisitor$]: MdastBlockQuoteVisitor,
      [addLexicalNode$]: QuoteNode,
      [addExportVisitor$]: LexicalQuoteVisitor
    });
  }
});
export {
  quotePlugin
};

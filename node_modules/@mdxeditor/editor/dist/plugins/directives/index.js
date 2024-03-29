import { realmPlugin } from "../../RealmWithPlugins.js";
import { insertDecoratorNode$, directiveDescriptors$, addMdastExtension$, addSyntaxExtension$, addImportVisitor$, addLexicalNode$, addExportVisitor$, addToMarkdownExtension$ } from "../core/index.js";
import { Signal, map } from "@mdxeditor/gurx";
import { directiveFromMarkdown, directiveToMarkdown } from "mdast-util-directive";
import { directive } from "micromark-extension-directive";
import { $createDirectiveNode, DirectiveNode } from "./DirectiveNode.js";
import { $isDirectiveNode } from "./DirectiveNode.js";
import { DirectiveVisitor } from "./DirectiveVisitor.js";
import { MdastDirectiveVisitor } from "./MdastDirectiveVisitor.js";
const insertDirective$ = Signal((r) => {
  r.link(
    r.pipe(
      insertDirective$,
      map((payload) => {
        return () => $createDirectiveNode({ children: [], ...payload });
      })
    ),
    insertDecoratorNode$
  );
});
const directivesPlugin = realmPlugin({
  update: (realm, params) => {
    realm.pub(directiveDescriptors$, (params == null ? void 0 : params.directiveDescriptors) || []);
  },
  init: (realm, params) => {
    realm.pubIn({
      [directiveDescriptors$]: (params == null ? void 0 : params.directiveDescriptors) || [],
      // import
      [addMdastExtension$]: directiveFromMarkdown(),
      [addSyntaxExtension$]: directive(),
      [addImportVisitor$]: MdastDirectiveVisitor,
      // export
      [addLexicalNode$]: DirectiveNode,
      [addExportVisitor$]: DirectiveVisitor,
      [addToMarkdownExtension$]: directiveToMarkdown()
    });
  }
});
export {
  $createDirectiveNode,
  $isDirectiveNode,
  DirectiveNode,
  directivesPlugin,
  insertDirective$
};

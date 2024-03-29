import { mdxFromMarkdown, mdxToMarkdown } from "mdast-util-mdx";
import { mdxjs } from "micromark-extension-mdxjs";
import { insertDecoratorNode$, jsxIsAvailable$, addMdastExtension$, addSyntaxExtension$, addImportVisitor$, addLexicalNode$, addExportVisitor$, addToMarkdownExtension$, jsxComponentDescriptors$ } from "../core/index.js";
import { $createLexicalJsxNode, LexicalJsxNode } from "./LexicalJsxNode.js";
import { LexicalJsxVisitor } from "./LexicalJsxVisitor.js";
import { MdastMdxJsEsmVisitor } from "./MdastMdxJsEsmVisitor.js";
import { MdastMdxJsxElementVisitor } from "./MdastMdxJsxElementVisitor.js";
import { Signal, map } from "@mdxeditor/gurx";
import { realmPlugin } from "../../RealmWithPlugins.js";
import { MdastMdxTextExpressionVisitor } from "./MdastMdxTextExpressionVisitor.js";
import { LexicalMdxTextExpressionNode } from "./LexicalMdxTextExpressionNode.js";
import { LexicalMdxTextExpressionVisitor } from "./LexicalMdxTextExpressionVisitor.js";
function isMdastJsxNode(node) {
  return node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement";
}
function toMdastJsxAttributes(attributes) {
  return Object.entries(attributes).map(([name, value]) => ({
    type: "mdxJsxAttribute",
    name,
    value
  }));
}
const insertJsx$ = Signal((r) => {
  r.link(
    r.pipe(
      insertJsx$,
      map(({ kind, name, children, props }) => {
        return () => {
          const attributes = toMdastJsxAttributes(props);
          if (kind === "flow") {
            return $createLexicalJsxNode({
              type: "mdxJsxFlowElement",
              name,
              children: children ?? [],
              attributes
            });
          } else {
            return $createLexicalJsxNode({
              type: "mdxJsxTextElement",
              name,
              children: children ?? [],
              attributes
            });
          }
        };
      })
    ),
    insertDecoratorNode$
  );
});
const jsxPlugin = realmPlugin({
  init: (realm, params) => {
    realm.pubIn({
      // import
      [jsxIsAvailable$]: true,
      [addMdastExtension$]: mdxFromMarkdown(),
      [addSyntaxExtension$]: mdxjs(),
      [addImportVisitor$]: [MdastMdxJsxElementVisitor, MdastMdxJsEsmVisitor, MdastMdxTextExpressionVisitor],
      // export
      [addLexicalNode$]: [LexicalJsxNode, LexicalMdxTextExpressionNode],
      [addExportVisitor$]: [LexicalJsxVisitor, LexicalMdxTextExpressionVisitor],
      [addToMarkdownExtension$]: mdxToMarkdown(),
      [jsxComponentDescriptors$]: (params == null ? void 0 : params.jsxComponentDescriptors) || []
    });
  },
  update(realm, params) {
    realm.pub(jsxComponentDescriptors$, (params == null ? void 0 : params.jsxComponentDescriptors) || []);
  }
});
export {
  insertJsx$,
  isMdastJsxNode,
  jsxPlugin
};

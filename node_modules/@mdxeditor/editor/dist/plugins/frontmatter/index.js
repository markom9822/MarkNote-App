import { realmPlugin } from "../../RealmWithPlugins.js";
import { rootEditor$, createRootEditorSubscription$, addMdastExtension$, addSyntaxExtension$, addLexicalNode$, addImportVisitor$, addExportVisitor$, addToMarkdownExtension$ } from "../core/index.js";
import { Cell, Action, withLatestFrom } from "@mdxeditor/gurx";
import { $getRoot } from "lexical";
import { frontmatterFromMarkdown, frontmatterToMarkdown } from "mdast-util-frontmatter";
import { frontmatter } from "micromark-extension-frontmatter";
import { $isFrontmatterNode, $createFrontmatterNode, FrontmatterNode } from "./FrontmatterNode.js";
import { LexicalFrontmatterVisitor } from "./LexicalFrontmatterVisitor.js";
import { MdastFrontmatterVisitor } from "./MdastFrontmatterVisitor.js";
const frontmatterDialogOpen$ = Cell(false);
const insertFrontmatter$ = Action((r) => {
  r.sub(r.pipe(insertFrontmatter$, withLatestFrom(rootEditor$)), ([, rootEditor]) => {
    rootEditor == null ? void 0 : rootEditor.update(() => {
      const firstItem = $getRoot().getFirstChild();
      if (!$isFrontmatterNode(firstItem)) {
        const fmNode = $createFrontmatterNode('"": ""');
        if (firstItem) {
          firstItem.insertBefore(fmNode);
        } else {
          $getRoot().append(fmNode);
        }
      }
    });
    r.pub(frontmatterDialogOpen$, true);
  });
});
const removeFrontmatter$ = Action((r) => {
  r.sub(r.pipe(removeFrontmatter$, withLatestFrom(rootEditor$)), ([, rootEditor]) => {
    rootEditor == null ? void 0 : rootEditor.update(() => {
      const firstItem = $getRoot().getFirstChild();
      if ($isFrontmatterNode(firstItem)) {
        firstItem.remove();
      }
    });
    r.pub(frontmatterDialogOpen$, false);
  });
});
const hasFrontmatter$ = Cell(false, (r) => {
  r.pub(createRootEditorSubscription$, (rootEditor) => {
    return rootEditor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        r.pub(hasFrontmatter$, $isFrontmatterNode($getRoot().getFirstChild()));
      });
    });
  });
});
const frontmatterPlugin = realmPlugin({
  init: (realm) => {
    realm.pubIn({
      [addMdastExtension$]: frontmatterFromMarkdown("yaml"),
      [addSyntaxExtension$]: frontmatter(),
      [addLexicalNode$]: FrontmatterNode,
      [addImportVisitor$]: MdastFrontmatterVisitor,
      [addExportVisitor$]: LexicalFrontmatterVisitor,
      [addToMarkdownExtension$]: frontmatterToMarkdown("yaml")
    });
  }
});
export {
  frontmatterDialogOpen$,
  frontmatterPlugin,
  hasFrontmatter$,
  insertFrontmatter$,
  removeFrontmatter$
};

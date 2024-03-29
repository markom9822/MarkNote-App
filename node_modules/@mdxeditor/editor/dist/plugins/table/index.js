import { realmPlugin } from "../../RealmWithPlugins.js";
import { Signal, map } from "@mdxeditor/gurx";
import { gfmTableFromMarkdown, gfmTableToMarkdown } from "mdast-util-gfm-table";
import { gfmTable } from "micromark-extension-gfm-table";
import { insertDecoratorNode$, addMdastExtension$, addSyntaxExtension$, addImportVisitor$, addLexicalNode$, addExportVisitor$, addToMarkdownExtension$ } from "../core/index.js";
import { LexicalTableVisitor } from "./LexicalTableVisitor.js";
import { MdastTableVisitor } from "./MdastTableVisitor.js";
import { $createTableNode, TableNode } from "./TableNode.js";
import { $isTableNode } from "./TableNode.js";
function seedTable(rows = 1, columns = 1) {
  const table = {
    type: "table",
    children: []
  };
  for (let i = 0; i < rows; i++) {
    const tableRow = {
      type: "tableRow",
      children: []
    };
    for (let j = 0; j < columns; j++) {
      const cell = {
        type: "tableCell",
        children: []
      };
      tableRow.children.push(cell);
    }
    table.children.push(tableRow);
  }
  return table;
}
const insertTable$ = Signal((r) => {
  r.link(
    r.pipe(
      insertTable$,
      map(({ rows, columns }) => {
        return () => $createTableNode(seedTable(rows, columns));
      })
    ),
    insertDecoratorNode$
  );
});
const tablePlugin = realmPlugin({
  init(realm) {
    realm.pubIn({
      // import
      [addMdastExtension$]: gfmTableFromMarkdown(),
      [addSyntaxExtension$]: gfmTable(),
      [addImportVisitor$]: MdastTableVisitor,
      // export
      [addLexicalNode$]: TableNode,
      [addExportVisitor$]: LexicalTableVisitor,
      [addToMarkdownExtension$]: gfmTableToMarkdown({ tableCellPadding: true, tablePipeAlign: true })
    });
  }
});
export {
  $createTableNode,
  $isTableNode,
  TableNode,
  insertTable$,
  tablePlugin
};

import { realmPlugin } from "../../RealmWithPlugins.js";
import { QUOTE, LINK, ORDERED_LIST, UNORDERED_LIST, CHECK_LIST, CODE, BOLD_ITALIC_STAR, BOLD_ITALIC_UNDERSCORE, BOLD_STAR, BOLD_UNDERSCORE, INLINE_CODE, ITALIC_STAR, ITALIC_UNDERSCORE } from "@lexical/markdown";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin.js";
import { HeadingNode, $isHeadingNode, $createHeadingNode } from "@lexical/rich-text";
import React__default from "react";
import { CodeBlockNode, $createCodeBlockNode } from "../codeblock/CodeBlockNode.js";
import { activePlugins$, addComposerChild$, addNestedEditorChild$ } from "../core/index.js";
import { allowedHeadingLevels$ } from "../headings/index.js";
const markdownShortcutPlugin = realmPlugin({
  init(realm) {
    const pluginIds = realm.getValue(activePlugins$);
    const allowedHeadingLevels = pluginIds.includes("headings") ? realm.getValue(allowedHeadingLevels$) : [];
    const transformers = pickTransformersForActivePlugins(pluginIds, allowedHeadingLevels);
    realm.pubIn({
      [addComposerChild$]: () => /* @__PURE__ */ React__default.createElement(MarkdownShortcutPlugin, { transformers }),
      [addNestedEditorChild$]: () => /* @__PURE__ */ React__default.createElement(MarkdownShortcutPlugin, { transformers })
    });
  }
});
const createBlockNode = (createNode) => {
  return (parentNode, children, match) => {
    const node = createNode(match);
    node.append(...children);
    parentNode.replace(node);
    node.select(0, 0);
  };
};
function pickTransformersForActivePlugins(pluginIds, allowedHeadingLevels) {
  const transformers = [
    BOLD_ITALIC_STAR,
    BOLD_ITALIC_UNDERSCORE,
    BOLD_STAR,
    BOLD_UNDERSCORE,
    INLINE_CODE,
    ITALIC_STAR,
    ITALIC_UNDERSCORE
    // HIGHLIGHT,
    // STRIKETHROUGH
  ];
  if (pluginIds.includes("headings")) {
    const minHeadingLevel = Math.min(...allowedHeadingLevels);
    const maxHeadingLevel = Math.max(...allowedHeadingLevels);
    const headingRegExp = new RegExp(`^(#{${minHeadingLevel},${maxHeadingLevel}})\\s`);
    const HEADING = {
      dependencies: [HeadingNode],
      export: (node, exportChildren) => {
        if (!$isHeadingNode(node)) {
          return null;
        }
        const level = Number(node.getTag().slice(1));
        return "#".repeat(level) + " " + exportChildren(node);
      },
      regExp: headingRegExp,
      replace: createBlockNode((match) => {
        const tag = `h${match[1].length}`;
        return $createHeadingNode(tag);
      }),
      type: "element"
    };
    transformers.push(HEADING);
  }
  if (pluginIds.includes("quote")) {
    transformers.push(QUOTE);
  }
  if (pluginIds.includes("link")) {
    transformers.push(LINK);
  }
  if (pluginIds.includes("lists")) {
    transformers.push(ORDERED_LIST, UNORDERED_LIST, CHECK_LIST);
  }
  if (pluginIds.includes("codeblock")) {
    const codeTransformerCopy = {
      ...CODE,
      dependencies: [CodeBlockNode],
      replace: (parentNode, _children, match) => {
        const codeBlockNode = $createCodeBlockNode({ code: "", language: match ? match[1] : "", meta: "" });
        parentNode.replace(codeBlockNode);
        setTimeout(() => codeBlockNode.select(), 80);
      }
    };
    transformers.push(codeTransformerCopy);
  }
  return transformers;
}
export {
  markdownShortcutPlugin
};

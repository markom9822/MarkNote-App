import { fromMarkdown } from "mdast-util-from-markdown";
import { toMarkdown } from "mdast-util-to-markdown";
function isParent(node) {
  return node.children instanceof Array;
}
class MarkdownParseError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = "MarkdownParseError";
    this.cause = cause;
  }
}
class UnrecognizedMarkdownConstructError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnrecognizedMarkdownConstructError";
  }
}
function importMarkdownToLexical({
  root,
  markdown,
  visitors,
  syntaxExtensions,
  mdastExtensions,
  ...descriptors
}) {
  var _a;
  let mdastRoot;
  try {
    mdastRoot = fromMarkdown(markdown, {
      extensions: syntaxExtensions,
      mdastExtensions
    });
  } catch (e) {
    if (e instanceof Error) {
      throw new MarkdownParseError(`Error parsing markdown: ${e.message}`, e);
    } else {
      throw new MarkdownParseError(`Error parsing markdown: ${e}`, e);
    }
  }
  if (mdastRoot.children.length === 0) {
    mdastRoot.children.push({ type: "paragraph", children: [] });
  }
  if (((_a = mdastRoot.children.at(-1)) == null ? void 0 : _a.type) !== "paragraph") {
    mdastRoot.children.push({ type: "paragraph", children: [] });
  }
  importMdastTreeToLexical({ root, mdastRoot, visitors, ...descriptors });
}
function importMdastTreeToLexical({ root, mdastRoot, visitors, ...descriptors }) {
  const formattingMap = /* @__PURE__ */ new WeakMap();
  visitors = visitors.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
  function visitChildren(mdastNode, lexicalParent) {
    if (!isParent(mdastNode)) {
      throw new Error("Attempting to visit children of a non-parent");
    }
    mdastNode.children.forEach((child) => visit(child, lexicalParent, mdastNode));
  }
  function visit(mdastNode, lexicalParent, mdastParent) {
    const visitor = visitors.find((visitor2) => {
      if (typeof visitor2.testNode === "string") {
        return visitor2.testNode === mdastNode.type;
      }
      return visitor2.testNode(mdastNode, descriptors);
    });
    if (!visitor) {
      try {
        throw new UnrecognizedMarkdownConstructError(`Unsupported markdown syntax: ${toMarkdown(mdastNode)}`);
      } catch (e) {
        throw new UnrecognizedMarkdownConstructError(
          `Parsing of the following markdown structure failed: ${JSON.stringify({
            type: mdastNode.type,
            name: "name" in mdastNode ? mdastNode.name : "N/A"
          })}`
        );
      }
    }
    visitor.visitNode({
      //@ts-expect-error root type is glitching
      mdastNode,
      lexicalParent,
      mdastParent,
      actions: {
        visitChildren,
        addAndStepInto(lexicalNode) {
          lexicalParent.append(lexicalNode);
          if (isParent(mdastNode)) {
            visitChildren(mdastNode, lexicalNode);
          }
        },
        addFormatting(format, node) {
          if (!node) {
            if (isParent(mdastNode)) {
              node = mdastNode;
            }
          }
          if (node) {
            formattingMap.set(node, format | (formattingMap.get(mdastParent) ?? 0));
          }
        },
        removeFormatting(format, node) {
          if (!node) {
            if (isParent(mdastNode)) {
              node = mdastNode;
            }
          }
          if (node) {
            formattingMap.set(node, format ^ (formattingMap.get(mdastParent) ?? 0));
          }
        },
        getParentFormatting() {
          return formattingMap.get(mdastParent) ?? 0;
        }
      }
    });
  }
  visit(mdastRoot, root, null);
}
export {
  MarkdownParseError,
  UnrecognizedMarkdownConstructError,
  importMarkdownToLexical,
  importMdastTreeToLexical
};

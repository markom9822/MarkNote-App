import { $isElementNode } from "lexical";
import { toMarkdown } from "mdast-util-to-markdown";
import { isMdastHTMLNode } from "./plugins/core/MdastHTMLNode.js";
import { mergeStyleAttributes } from "./utils/mergeStyleAttributes.js";
function isParent(node) {
  return node.children instanceof Array;
}
function exportLexicalTreeToMdast({
  root,
  visitors,
  jsxComponentDescriptors,
  jsxIsAvailable,
  addImportStatements = true
}) {
  let unistRoot = null;
  const referredComponents = /* @__PURE__ */ new Set();
  visitors = visitors.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
  visit(root, null);
  function registerReferredComponent(componentName) {
    referredComponents.add(componentName);
  }
  function appendToParent(parentNode, node) {
    if (unistRoot === null) {
      unistRoot = node;
      return unistRoot;
    }
    if (!isParent(parentNode)) {
      throw new Error("Attempting to append children to a non-parent");
    }
    const siblings = parentNode.children;
    const prevSibling = siblings.at(-1);
    if (prevSibling) {
      const joinVisitor = visitors.find((visitor) => {
        var _a;
        return (_a = visitor.shouldJoin) == null ? void 0 : _a.call(visitor, prevSibling, node);
      });
      if (joinVisitor) {
        const joinedNode = joinVisitor.join(prevSibling, node);
        siblings.splice(siblings.length - 1, 1, joinedNode);
        return joinedNode;
      }
    }
    siblings.push(node);
    return node;
  }
  function visitChildren(lexicalNode, parentNode) {
    lexicalNode.getChildren().forEach((lexicalChild) => {
      visit(lexicalChild, parentNode);
    });
  }
  function visit(lexicalNode, mdastParent) {
    var _a;
    const visitor = visitors.find((visitor2) => {
      var _a2;
      return (_a2 = visitor2.testLexicalNode) == null ? void 0 : _a2.call(visitor2, lexicalNode);
    });
    if (!visitor) {
      throw new Error(`no lexical visitor found for ${lexicalNode.getType()}`, {
        cause: lexicalNode
      });
    }
    (_a = visitor.visitLexicalNode) == null ? void 0 : _a.call(visitor, {
      lexicalNode,
      mdastParent,
      actions: {
        addAndStepInto(type, props = {}, hasChildren = true) {
          const newNode = {
            type,
            ...props,
            ...hasChildren ? { children: [] } : {}
          };
          appendToParent(mdastParent, newNode);
          if ($isElementNode(lexicalNode) && hasChildren) {
            visitChildren(lexicalNode, newNode);
          }
        },
        appendToParent,
        visitChildren,
        registerReferredComponent
      }
    });
  }
  if (unistRoot === null) {
    throw new Error("traversal ended with no root element");
  }
  const importsMap = /* @__PURE__ */ new Map();
  const defaultImportsMap = /* @__PURE__ */ new Map();
  for (const componentName of referredComponents) {
    const descriptor = jsxComponentDescriptors.find((descriptor2) => descriptor2.name === componentName);
    if (!descriptor) {
      throw new Error(`Component ${componentName} is used but not imported`);
    }
    if (!descriptor.source) {
      continue;
    }
    if (descriptor.defaultExport) {
      defaultImportsMap.set(componentName, descriptor.source);
    } else {
      const { source } = descriptor;
      const existing = importsMap.get(source);
      if (existing) {
        existing.push(componentName);
      } else {
        importsMap.set(source, [componentName]);
      }
    }
  }
  const imports = Array.from(importsMap).map(([source, componentNames]) => {
    return {
      type: "mdxjsEsm",
      value: `import { ${componentNames.join(", ")} } from '${source}'`
    };
  });
  imports.push(
    ...Array.from(defaultImportsMap).map(([componentName, source]) => {
      return {
        type: "mdxjsEsm",
        value: `import ${componentName} from '${source}'`
      };
    })
  );
  const typedRoot = unistRoot;
  const frontmatter = typedRoot.children.find((child) => child.type === "yaml");
  if (addImportStatements) {
    if (frontmatter) {
      typedRoot.children.splice(typedRoot.children.indexOf(frontmatter) + 1, 0, ...imports);
    } else {
      typedRoot.children.unshift(...imports);
    }
  }
  fixWrappingWhitespace(typedRoot, []);
  collapseNestedHtmlTags(typedRoot);
  if (!jsxIsAvailable) {
    convertUnderlineJsxToHtml(typedRoot);
  }
  return typedRoot;
}
function collapseNestedHtmlTags(node) {
  if ("children" in node && node.children) {
    if (isMdastHTMLNode(node) && node.children.length === 1) {
      const onlyChild = node.children[0];
      if (onlyChild.type === "mdxJsxTextElement" && onlyChild.name === "span") {
        (onlyChild.attributes || []).forEach((attribute) => {
          var _a;
          if (attribute.type === "mdxJsxAttribute") {
            const parentAttribute = (_a = node.attributes) == null ? void 0 : _a.find((attr) => attr.type === "mdxJsxAttribute" && attr.name === attribute.name);
            if (parentAttribute) {
              if (attribute.name === "className") {
                const mergedClassesSet = /* @__PURE__ */ new Set([
                  ...parentAttribute.value.split(" "),
                  ...attribute.value.split(" ")
                ]);
                parentAttribute.value = Array.from(mergedClassesSet).join(" ");
              } else if (attribute.name === "style") {
                parentAttribute.value = mergeStyleAttributes(parentAttribute.value, attribute.value);
              }
            } else {
              node.attributes.push(attribute);
            }
          }
        });
        node.children = onlyChild.children;
      }
    }
    node.children.forEach((child) => collapseNestedHtmlTags(child));
  }
}
function convertUnderlineJsxToHtml(node) {
  if (Object.hasOwn(node, "children")) {
    const nodeAsParent = node;
    const newChildren = [];
    nodeAsParent.children.forEach((child) => {
      if (child.type === "mdxJsxTextElement" && child.name === "u") {
        newChildren.push(...[{ type: "html", value: "<u>" }, ...child.children, { type: "html", value: "</u>" }]);
      } else {
        newChildren.push(child);
        convertUnderlineJsxToHtml(child);
      }
    });
    nodeAsParent.children = newChildren;
  }
}
const TRAILING_WHITESPACE_REGEXP = /\s+$/;
const LEADING_WHITESPACE_REGEXP = /^\s+/;
function fixWrappingWhitespace(node, parentChain) {
  if (node.type === "strong" || node.type === "emphasis") {
    const lastChild = node.children.at(-1);
    if ((lastChild == null ? void 0 : lastChild.type) === "text") {
      const trailingWhitespace = lastChild.value.match(TRAILING_WHITESPACE_REGEXP);
      if (trailingWhitespace) {
        lastChild.value = lastChild.value.replace(TRAILING_WHITESPACE_REGEXP, "");
        const parent = parentChain.at(-1);
        if (parent) {
          parent.children.splice(parent.children.indexOf(node) + 1, 0, {
            type: "text",
            value: trailingWhitespace[0]
          });
          fixWrappingWhitespace(parent, parentChain.slice(0, -1));
        }
      }
    }
    const firstChild = node.children.at(0);
    if ((firstChild == null ? void 0 : firstChild.type) === "text") {
      const leadingWhitespace = firstChild.value.match(LEADING_WHITESPACE_REGEXP);
      if (leadingWhitespace) {
        firstChild.value = firstChild.value.replace(LEADING_WHITESPACE_REGEXP, "");
        const parent = parentChain.at(-1);
        if (parent) {
          parent.children.splice(parent.children.indexOf(node), 0, {
            type: "text",
            value: leadingWhitespace[0]
          });
          fixWrappingWhitespace(parent, parentChain.slice(0, -1));
        }
      }
    }
  }
  if ("children" in node && node.children) {
    const nodeAsParent = node;
    nodeAsParent.children.forEach((child) => fixWrappingWhitespace(child, [...parentChain, nodeAsParent]));
  }
}
function exportMarkdownFromLexical({
  root,
  toMarkdownOptions,
  toMarkdownExtensions,
  visitors,
  jsxComponentDescriptors,
  jsxIsAvailable
}) {
  return toMarkdown(exportLexicalTreeToMdast({ root, visitors, jsxComponentDescriptors, jsxIsAvailable }), {
    extensions: toMarkdownExtensions,
    ...toMarkdownOptions
  }) + "\n";
}
export {
  exportLexicalTreeToMdast,
  exportMarkdownFromLexical
};

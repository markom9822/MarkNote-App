import React__default from "react";
import { useMdastNodeUpdater, NestedLexicalEditor } from "../plugins/core/NestedLexicalEditor.js";
import { PropertyPopover } from "../plugins/core/PropertyPopover.js";
import styles from "../styles/ui.module.css.js";
const GenericDirectiveEditor = ({ mdastNode, descriptor }) => {
  const updateMdastNode = useMdastNodeUpdater();
  const properties = React__default.useMemo(() => {
    return descriptor.attributes.reduce(
      (acc, attributeName) => {
        acc[attributeName] = (mdastNode.attributes || {})[attributeName] || "";
        return acc;
      },
      {}
    );
  }, [mdastNode, descriptor]);
  const onChange = React__default.useCallback(
    (values) => {
      updateMdastNode({ attributes: Object.fromEntries(Object.entries(values).filter(([, value]) => value !== "")) });
    },
    [updateMdastNode]
  );
  return /* @__PURE__ */ React__default.createElement("div", { className: mdastNode.type === "textDirective" ? styles.inlineEditor : styles.blockEditor }, descriptor.attributes.length == 0 && descriptor.hasChildren && mdastNode.type !== "textDirective" ? /* @__PURE__ */ React__default.createElement("span", { className: styles.genericComponentName }, mdastNode.name) : null, descriptor.attributes.length > 0 ? /* @__PURE__ */ React__default.createElement(PropertyPopover, { properties, title: mdastNode.name || "", onChange }) : null, descriptor.hasChildren ? /* @__PURE__ */ React__default.createElement(
    NestedLexicalEditor,
    {
      block: mdastNode.type === "containerDirective",
      getContent: (node) => node.children,
      getUpdatedMdastNode: (mdastNode2, children) => {
        return { ...mdastNode2, children };
      }
    }
  ) : /* @__PURE__ */ React__default.createElement("span", { className: styles.genericComponentName }, mdastNode.name));
};
export {
  GenericDirectiveEditor
};

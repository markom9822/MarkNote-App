import React__default from "react";
import { useMdastNodeUpdater, NestedLexicalEditor } from "../plugins/core/NestedLexicalEditor.js";
import { PropertyPopover } from "../plugins/core/PropertyPopover.js";
import styles from "../styles/ui.module.css.js";
const GenericJsxEditor = ({ mdastNode, descriptor }) => {
  const updateMdastNode = useMdastNodeUpdater();
  const properties = React__default.useMemo(() => {
    return descriptor.props.reduce(
      (acc, descriptor2) => {
        const attribute = mdastNode.attributes.find((attr) => attr.name === descriptor2.name);
        if (attribute) {
          acc[descriptor2.name] = attribute.value;
        } else {
          acc[descriptor2.name] = "";
        }
        return acc;
      },
      {}
    );
  }, [mdastNode, descriptor]);
  const onChange = React__default.useCallback(
    (values) => {
      const newAttributes = mdastNode.attributes.slice();
      Object.entries(values).forEach(([key, value]) => {
        const attributeToUpdate = newAttributes.find((attr) => attr.name === key);
        if (value === "") {
          if (attributeToUpdate) {
            newAttributes.splice(newAttributes.indexOf(attributeToUpdate), 1);
          }
        } else {
          if (attributeToUpdate) {
            attributeToUpdate.value = value;
          } else {
            newAttributes.push({
              type: "mdxJsxAttribute",
              name: key,
              value
            });
          }
        }
      });
      updateMdastNode({ attributes: newAttributes });
    },
    [mdastNode, updateMdastNode]
  );
  return /* @__PURE__ */ React__default.createElement("div", { className: descriptor.kind === "text" ? styles.inlineEditor : styles.blockEditor }, descriptor.props.length == 0 && descriptor.hasChildren && descriptor.kind === "flow" ? /* @__PURE__ */ React__default.createElement("span", { className: styles.genericComponentName }, mdastNode.name) : null, descriptor.props.length > 0 ? /* @__PURE__ */ React__default.createElement(PropertyPopover, { properties, title: mdastNode.name || "", onChange }) : null, descriptor.hasChildren ? /* @__PURE__ */ React__default.createElement(
    NestedLexicalEditor,
    {
      block: descriptor.kind === "flow",
      getContent: (node) => node.children,
      getUpdatedMdastNode: (mdastNode2, children) => {
        return { ...mdastNode2, children };
      }
    }
  ) : /* @__PURE__ */ React__default.createElement("span", { className: styles.genericComponentName }, mdastNode.name));
};
export {
  GenericJsxEditor
};

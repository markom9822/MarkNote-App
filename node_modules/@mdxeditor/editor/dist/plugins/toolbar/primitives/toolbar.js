import * as RadixSelect from "@radix-ui/react-select";
import * as RadixToolbar from "@radix-ui/react-toolbar";
import classNames from "classnames";
import React__default from "react";
import styles from "../../../styles/ui.module.css.js";
import { TooltipWrap } from "./TooltipWrap.js";
import { SelectButtonTrigger, SelectContent, SelectItem } from "./select.js";
import { readOnly$, editorInFocus$ } from "../../core/index.js";
import { useCellValue } from "@mdxeditor/gurx";
function decorateWithRef(Component, decoratedProps) {
  return React__default.forwardRef((props, ref) => {
    const className = classNames(decoratedProps.className, props.className);
    return /* @__PURE__ */ React__default.createElement(Component, { ...decoratedProps, ...props, className, ref });
  });
}
function addTooltipToChildren(Component) {
  return ({ title, children, ...props }) => {
    return /* @__PURE__ */ React__default.createElement(Component, { ...props }, /* @__PURE__ */ React__default.createElement(TooltipWrap, { title }, children));
  };
}
const Root = ({ readOnly, children }) => {
  return /* @__PURE__ */ React__default.createElement(
    RadixToolbar.Root,
    {
      className: classNames("mdxeditor-toolbar", styles.toolbarRoot, { [styles.readOnlyToolbarRoot]: readOnly }),
      ...readOnly ? { tabIndex: -1 } : {}
    },
    children
  );
};
const Button = decorateWithRef(RadixToolbar.Button, { className: styles.toolbarButton, "data-toolbar-item": true });
const ButtonWithTooltip = addTooltipToChildren(Button);
const ToolbarToggleItem = decorateWithRef(RadixToolbar.ToggleItem, {
  className: styles.toolbarToggleItem,
  "data-toolbar-item": true
});
const SingleToggleGroup = decorateWithRef(RadixToolbar.ToggleGroup, {
  type: "single",
  className: styles.toolbarToggleSingleGroup
});
const ToggleSingleGroupWithItem = React__default.forwardRef(({ on, title, children, disabled, ...props }, forwardedRef) => {
  return /* @__PURE__ */ React__default.createElement(
    RadixToolbar.ToggleGroup,
    {
      type: "single",
      className: styles.toolbarToggleSingleGroup,
      ...props,
      value: on ? "on" : "off",
      ref: forwardedRef
    },
    /* @__PURE__ */ React__default.createElement(ToolbarToggleItem, { title, value: "on", disabled }, /* @__PURE__ */ React__default.createElement(TooltipWrap, { title }, children))
  );
});
const MultipleChoiceToggleGroup = ({ items }) => {
  return /* @__PURE__ */ React__default.createElement("div", { className: styles.toolbarGroupOfGroups }, items.map((item, index) => /* @__PURE__ */ React__default.createElement(
    ToggleSingleGroupWithItem,
    {
      key: index,
      title: item.title,
      on: item.active,
      onValueChange: (v) => item.onChange(v === "on"),
      disabled: item.disabled
    },
    item.contents
  )));
};
const SingleChoiceToggleGroup = ({
  value,
  onChange,
  className,
  items
}) => {
  return /* @__PURE__ */ React__default.createElement("div", { className: styles.toolbarGroupOfGroups }, /* @__PURE__ */ React__default.createElement(
    RadixToolbar.ToggleGroup,
    {
      type: "single",
      className: classNames(styles.toolbarToggleSingleGroup, className),
      onValueChange: onChange,
      value: value || "",
      onFocus: (e) => e.preventDefault()
    },
    items.map((item, index) => /* @__PURE__ */ React__default.createElement(ToolbarToggleItem, { key: index, value: item.value }, /* @__PURE__ */ React__default.createElement(TooltipWrap, { title: item.title }, item.contents)))
  ));
};
const ButtonOrDropdownButton = (props) => {
  const readOnly = useCellValue(readOnly$);
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, props.items.length === 1 ? /* @__PURE__ */ React__default.createElement(ButtonWithTooltip, { title: props.title, onClick: () => props.onChoose(""), disabled: readOnly }, props.children) : /* @__PURE__ */ React__default.createElement(RadixSelect.Root, { value: "", onValueChange: props.onChoose }, /* @__PURE__ */ React__default.createElement(SelectButtonTrigger, { title: props.title }, props.children), /* @__PURE__ */ React__default.createElement(SelectContent, { className: styles.toolbarButtonDropdownContainer }, props.items.map((item, index) => /* @__PURE__ */ React__default.createElement(SelectItem, { key: index, value: item.value }, item.label)))));
};
function isConditionalContentsOption(option) {
  return Object.hasOwn(option, "when");
}
const ConditionalContents = ({ options }) => {
  const editorInFocus = useCellValue(editorInFocus$);
  const contents = React__default.useMemo(() => {
    const option = options.find((option2) => {
      if (isConditionalContentsOption(option2)) {
        if (option2.when(editorInFocus)) {
          return true;
        }
      } else {
        return true;
      }
    });
    return option ? isConditionalContentsOption(option) ? option.contents() : option.fallback() : null;
  }, [options, editorInFocus]);
  return /* @__PURE__ */ React__default.createElement("div", { style: { display: "flex" } }, contents);
};
const Separator = RadixToolbar.Separator;
export {
  Button,
  ButtonOrDropdownButton,
  ButtonWithTooltip,
  ConditionalContents,
  MultipleChoiceToggleGroup,
  Root,
  Separator,
  SingleChoiceToggleGroup,
  SingleToggleGroup,
  ToggleSingleGroupWithItem,
  ToolbarToggleItem
};

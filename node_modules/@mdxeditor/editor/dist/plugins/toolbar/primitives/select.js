import React__default from "react";
import * as RadixSelect from "@radix-ui/react-select";
import classNames from "classnames";
import styles from "../../../styles/ui.module.css.js";
import { TooltipWrap } from "./TooltipWrap.js";
import { readOnly$, iconComponentFor$, editorRootElementRef$ } from "../../core/index.js";
import { useCellValues, useCellValue } from "@mdxeditor/gurx";
const SelectItem = React__default.forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return /* @__PURE__ */ React__default.createElement(RadixSelect.Item, { ...props, ref: forwardedRef, className: classNames(className, styles.selectItem) }, /* @__PURE__ */ React__default.createElement(RadixSelect.ItemText, null, children));
  }
);
const SelectTrigger = ({ title, placeholder, className }) => {
  const [readOnly, iconComponentFor] = useCellValues(readOnly$, iconComponentFor$);
  return /* @__PURE__ */ React__default.createElement(TooltipWrap, { title }, /* @__PURE__ */ React__default.createElement(
    RadixSelect.Trigger,
    {
      "aria-label": placeholder,
      className: classNames(styles.selectTrigger, className),
      "data-toolbar-item": true,
      disabled: readOnly
    },
    /* @__PURE__ */ React__default.createElement(RadixSelect.Value, { placeholder }),
    /* @__PURE__ */ React__default.createElement(RadixSelect.Icon, { className: styles.selectDropdownArrow }, iconComponentFor("arrow_drop_down"))
  ));
};
const SelectContent = ({
  children,
  className = styles.selectContainer
}) => {
  const editorRootElementRef = useCellValue(editorRootElementRef$);
  return /* @__PURE__ */ React__default.createElement(RadixSelect.Portal, { container: editorRootElementRef == null ? void 0 : editorRootElementRef.current }, /* @__PURE__ */ React__default.createElement(
    RadixSelect.Content,
    {
      className: classNames(className, "mdxeditor-select-content"),
      onCloseAutoFocus: (e) => e.preventDefault(),
      position: "popper"
    },
    /* @__PURE__ */ React__default.createElement(RadixSelect.Viewport, { "data-editor-dropdown": true }, children)
  ));
};
const SelectButtonTrigger = ({
  children,
  title,
  className
}) => {
  const [readOnly, iconComponentFor] = useCellValues(readOnly$, iconComponentFor$);
  return /* @__PURE__ */ React__default.createElement(TooltipWrap, { title }, /* @__PURE__ */ React__default.createElement(RadixSelect.Trigger, { className: classNames(styles.toolbarButtonSelectTrigger, className), disabled: readOnly }, children, /* @__PURE__ */ React__default.createElement(RadixSelect.Icon, { className: styles.selectDropdownArrow }, iconComponentFor("arrow_drop_down"))));
};
const Select = (props) => {
  return /* @__PURE__ */ React__default.createElement(RadixSelect.Root, { value: props.value || void 0, onValueChange: props.onChange }, /* @__PURE__ */ React__default.createElement(SelectTrigger, { title: props.triggerTitle, placeholder: props.placeholder }), /* @__PURE__ */ React__default.createElement(SelectContent, null, props.items.map((item, index) => {
    if (item === "separator") {
      return /* @__PURE__ */ React__default.createElement(RadixSelect.Separator, { key: index });
    }
    return /* @__PURE__ */ React__default.createElement(SelectItem, { key: index, value: item.value }, item.label);
  })));
};
export {
  Select,
  SelectButtonTrigger,
  SelectContent,
  SelectItem,
  SelectTrigger
};

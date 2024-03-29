import * as Dialog from "@radix-ui/react-dialog";
import * as RadixToolbar from "@radix-ui/react-toolbar";
import React__default from "react";
import classNames from "classnames";
import { useCombobox } from "downshift";
import { editorRootElementRef$, readOnly$, iconComponentFor$ } from "../../core/index.js";
import styles from "../../../styles/ui.module.css.js";
import { TooltipWrap } from "./TooltipWrap.js";
import { useCellValues, useCellValue } from "@mdxeditor/gurx";
const MAX_SUGGESTIONS = 20;
const DialogButton = React__default.forwardRef(({ autocompleteSuggestions = [], submitButtonTitle, dialogInputPlaceholder, onSubmit, tooltipTitle, buttonContent }, forwardedRef) => {
  const [editorRootElementRef, readOnly] = useCellValues(editorRootElementRef$, readOnly$);
  const [open, setOpen] = React__default.useState(false);
  const onSubmitCallback = React__default.useCallback(
    (value) => {
      onSubmit(value);
      setOpen(false);
    },
    [onSubmit]
  );
  return /* @__PURE__ */ React__default.createElement(Dialog.Root, { open, onOpenChange: setOpen }, /* @__PURE__ */ React__default.createElement(Dialog.Trigger, { asChild: true }, /* @__PURE__ */ React__default.createElement(RadixToolbar.Button, { className: styles.toolbarButton, ref: forwardedRef, disabled: readOnly }, /* @__PURE__ */ React__default.createElement(TooltipWrap, { title: tooltipTitle }, buttonContent))), /* @__PURE__ */ React__default.createElement(Dialog.Portal, { container: editorRootElementRef == null ? void 0 : editorRootElementRef.current }, /* @__PURE__ */ React__default.createElement(Dialog.Overlay, { className: styles.dialogOverlay }), /* @__PURE__ */ React__default.createElement(Dialog.Content, { className: styles.dialogContent }, /* @__PURE__ */ React__default.createElement(
    DialogForm,
    {
      submitButtonTitle,
      autocompleteSuggestions,
      onSubmitCallback,
      dialogInputPlaceholder
    }
  ))));
});
const DialogForm = ({ autocompleteSuggestions, onSubmitCallback, dialogInputPlaceholder, submitButtonTitle }) => {
  const [items, setItems] = React__default.useState(autocompleteSuggestions.slice(0, MAX_SUGGESTIONS));
  const iconComponentFor = useCellValue(iconComponentFor$);
  const enableAutoComplete = autocompleteSuggestions.length > 0;
  const { isOpen, getToggleButtonProps, getMenuProps, getInputProps, highlightedIndex, getItemProps, selectedItem } = useCombobox({
    initialInputValue: "",
    onInputValueChange({ inputValue }) {
      inputValue = (inputValue == null ? void 0 : inputValue.toLowerCase()) || "";
      const matchingItems = [];
      for (const suggestion of autocompleteSuggestions) {
        if (suggestion.toLowerCase().includes(inputValue)) {
          matchingItems.push(suggestion);
          if (matchingItems.length >= MAX_SUGGESTIONS) {
            break;
          }
        }
      }
      setItems(matchingItems);
    },
    items,
    itemToString(item) {
      return item ?? "";
    }
  });
  const onKeyDownEH = React__default.useCallback(
    (e) => {
      var _a;
      if (e.key === "Escape") {
        (_a = e.target.form) == null ? void 0 : _a.reset();
      } else if (e.key === "Enter" && (!isOpen || items.length === 0)) {
        e.preventDefault();
        onSubmitCallback(e.target.value);
      }
    },
    [isOpen, items, onSubmitCallback]
  );
  const downshiftInputProps = getInputProps();
  const inputProps = {
    ...downshiftInputProps,
    onKeyDown: (e) => {
      onKeyDownEH(e);
      downshiftInputProps.onKeyDown(e);
    }
  };
  const onSubmitEH = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmitCallback(inputProps.value);
  };
  const dropdownIsVisible = isOpen && items.length > 0;
  return /* @__PURE__ */ React__default.createElement("form", { onSubmit: onSubmitEH, className: classNames(styles.dialogForm) }, /* @__PURE__ */ React__default.createElement("div", { className: styles.linkDialogInputContainer }, /* @__PURE__ */ React__default.createElement("div", { "data-visible-dropdown": dropdownIsVisible, className: styles.linkDialogInputWrapper }, /* @__PURE__ */ React__default.createElement(
    "input",
    {
      placeholder: dialogInputPlaceholder,
      className: styles.linkDialogInput,
      ...inputProps,
      autoFocus: true,
      size: 30,
      "data-editor-dialog": true
    }
  ), enableAutoComplete && /* @__PURE__ */ React__default.createElement("button", { "aria-label": "toggle menu", type: "button", ...getToggleButtonProps() }, iconComponentFor("arrow_drop_down"))), /* @__PURE__ */ React__default.createElement("div", { className: styles.downshiftAutocompleteContainer }, /* @__PURE__ */ React__default.createElement("ul", { ...getMenuProps(), "data-visible": dropdownIsVisible }, items.map((item, index) => /* @__PURE__ */ React__default.createElement(
    "li",
    {
      "data-selected": selectedItem === item,
      "data-highlighted": highlightedIndex === index,
      key: `${item}${index}`,
      ...getItemProps({ item, index })
    },
    item
  ))))), /* @__PURE__ */ React__default.createElement(
    "button",
    {
      type: "submit",
      title: submitButtonTitle,
      "aria-label": submitButtonTitle,
      className: classNames(styles.actionButton, styles.primaryActionButton)
    },
    iconComponentFor("check")
  ), /* @__PURE__ */ React__default.createElement(Dialog.Close, { className: styles.actionButton }, iconComponentFor("close")));
};
export {
  DialogButton
};

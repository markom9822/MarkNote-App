import { useCombobox } from "downshift";
import React__default from "react";
import { Controller } from "react-hook-form";
import styles from "../../../styles/ui.module.css.js";
import { iconComponentFor$ } from "../index.js";
import { useCellValue } from "@mdxeditor/gurx";
const MAX_SUGGESTIONS = 20;
const DownshiftAutoComplete = (props) => {
  if (props.suggestions.length > 0) {
    return /* @__PURE__ */ React__default.createElement(DownshiftAutoCompleteWithSuggestions, { ...props });
  } else {
    return /* @__PURE__ */ React__default.createElement("input", { className: styles.textInput, size: 40, autoFocus: true, ...props.register(props.inputName) });
  }
};
const DownshiftAutoCompleteWithSuggestions = ({
  autofocus,
  suggestions,
  control,
  inputName,
  placeholder,
  initialInputValue,
  setValue
}) => {
  const [items, setItems] = React__default.useState(suggestions.slice(0, MAX_SUGGESTIONS));
  const iconComponentFor = useCellValue(iconComponentFor$);
  const enableAutoComplete = suggestions.length > 0;
  const { isOpen, getToggleButtonProps, getMenuProps, getInputProps, highlightedIndex, getItemProps, selectedItem } = useCombobox({
    initialInputValue,
    onInputValueChange({ inputValue = "" }) {
      setValue(inputName, inputValue);
      inputValue = (inputValue == null ? void 0 : inputValue.toLowerCase()) || "";
      const matchingItems = [];
      for (const suggestion of suggestions) {
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
  const dropdownIsVisible = isOpen && items.length > 0;
  return /* @__PURE__ */ React__default.createElement("div", { className: styles.downshiftAutocompleteContainer }, /* @__PURE__ */ React__default.createElement("div", { "data-visible-dropdown": dropdownIsVisible, className: styles.downshiftInputWrapper }, /* @__PURE__ */ React__default.createElement(
    Controller,
    {
      name: inputName,
      control,
      render: ({ field }) => {
        const downshiftSrcProps = getInputProps();
        return /* @__PURE__ */ React__default.createElement(
          "input",
          {
            ...downshiftSrcProps,
            name: field.name,
            placeholder,
            className: styles.downshiftInput,
            size: 30,
            "data-editor-dialog": true,
            autoFocus: autofocus
          }
        );
      }
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
  )))));
};
export {
  DownshiftAutoComplete,
  DownshiftAutoCompleteWithSuggestions
};

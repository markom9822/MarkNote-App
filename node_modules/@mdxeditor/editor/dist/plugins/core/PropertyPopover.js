import * as RadixPopover from "@radix-ui/react-popover";
import React__default from "react";
import { useForm } from "react-hook-form";
import styles from "../../styles/ui.module.css.js";
import { useCellValue } from "@mdxeditor/gurx";
import { iconComponentFor$ } from "./index.js";
import { PopoverPortal, PopoverContent } from "./ui/PopoverUtils.js";
const PropertyPopover = ({ title, properties, onChange }) => {
  const [open, setOpen] = React__default.useState(false);
  const iconComponentFor = useCellValue(iconComponentFor$);
  const { register, handleSubmit, reset } = useForm({ defaultValues: properties });
  return /* @__PURE__ */ React__default.createElement(RadixPopover.Root, { open, onOpenChange: (v) => setOpen(v) }, /* @__PURE__ */ React__default.createElement(RadixPopover.Trigger, { className: styles.iconButton }, /* @__PURE__ */ React__default.createElement("div", null, iconComponentFor("settings"))), /* @__PURE__ */ React__default.createElement(PopoverPortal, null, /* @__PURE__ */ React__default.createElement(PopoverContent, null, /* @__PURE__ */ React__default.createElement(
    "form",
    {
      onSubmit: (e) => {
        void handleSubmit(onChange)(e);
        setOpen(false);
        e.preventDefault();
        e.stopPropagation();
      }
    },
    /* @__PURE__ */ React__default.createElement("h3", { className: styles.propertyPanelTitle }, title, " Attributes"),
    /* @__PURE__ */ React__default.createElement("table", { className: styles.propertyEditorTable }, /* @__PURE__ */ React__default.createElement("thead", null, /* @__PURE__ */ React__default.createElement("tr", null, /* @__PURE__ */ React__default.createElement("th", { className: styles.readOnlyColumnCell }, "Attribute"), /* @__PURE__ */ React__default.createElement("th", null, "Value"))), /* @__PURE__ */ React__default.createElement("tbody", null, Object.keys(properties).map((propName) => /* @__PURE__ */ React__default.createElement("tr", { key: propName }, /* @__PURE__ */ React__default.createElement("th", { className: styles.readOnlyColumnCell }, " ", propName, " "), /* @__PURE__ */ React__default.createElement("td", null, /* @__PURE__ */ React__default.createElement("input", { ...register(propName), className: styles.propertyEditorInput }))))), /* @__PURE__ */ React__default.createElement("tfoot", null, /* @__PURE__ */ React__default.createElement("tr", null, /* @__PURE__ */ React__default.createElement("td", { colSpan: 2 }, /* @__PURE__ */ React__default.createElement("div", { className: styles.buttonsFooter }, /* @__PURE__ */ React__default.createElement("button", { type: "submit", className: styles.primaryButton }, "Save"), /* @__PURE__ */ React__default.createElement(
      "button",
      {
        type: "reset",
        className: styles.secondaryButton,
        onClick: (e) => {
          e.preventDefault();
          reset(properties);
          setOpen(false);
        }
      },
      "Cancel"
    ))))))
  ))));
};
export {
  PropertyPopover
};

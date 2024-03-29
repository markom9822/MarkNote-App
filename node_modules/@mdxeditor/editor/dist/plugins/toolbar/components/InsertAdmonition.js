import React__default from "react";
import { ButtonOrDropdownButton } from "../primitives/toolbar.js";
import { insertDirective$ } from "../../directives/index.js";
import { ADMONITION_TYPES } from "../../../directive-editors/AdmonitionDirectiveDescriptor.js";
import { usePublisher, useCellValue } from "@mdxeditor/gurx";
import { iconComponentFor$ } from "../../core/index.js";
const InsertAdmonition = () => {
  const insertDirective = usePublisher(insertDirective$);
  const iconComponentFor = useCellValue(iconComponentFor$);
  const items = React__default.useMemo(
    () => ADMONITION_TYPES.map((type) => ({ value: type, label: type.replace(/^./, (l) => l.toUpperCase()) })),
    []
  );
  return /* @__PURE__ */ React__default.createElement(
    ButtonOrDropdownButton,
    {
      title: "Insert admonition",
      onChoose: (admonitionName) => {
        insertDirective({
          type: "containerDirective",
          name: admonitionName
        });
      },
      items
    },
    iconComponentFor("admonition")
  );
};
export {
  InsertAdmonition
};

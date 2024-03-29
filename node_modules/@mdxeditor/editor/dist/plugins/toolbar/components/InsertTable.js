import { ButtonWithTooltip } from "../primitives/toolbar.js";
import React__default from "react";
import { insertTable$ } from "../../table/index.js";
import { useCellValue, usePublisher } from "@mdxeditor/gurx";
import { iconComponentFor$ } from "../../core/index.js";
const InsertTable = () => {
  const iconComponentFor = useCellValue(iconComponentFor$);
  const insertTable = usePublisher(insertTable$);
  return /* @__PURE__ */ React__default.createElement(
    ButtonWithTooltip,
    {
      title: "Insert table",
      onClick: () => {
        insertTable({ rows: 3, columns: 3 });
      }
    },
    iconComponentFor("table")
  );
};
export {
  InsertTable
};

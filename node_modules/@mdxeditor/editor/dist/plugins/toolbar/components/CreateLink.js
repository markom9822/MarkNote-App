import React__default from "react";
import { ButtonWithTooltip } from "../primitives/toolbar.js";
import { openLinkEditDialog$ } from "../../link-dialog/index.js";
import { usePublisher, useCellValue } from "@mdxeditor/gurx";
import { iconComponentFor$ } from "../../core/index.js";
const CreateLink = () => {
  const openLinkDialog = usePublisher(openLinkEditDialog$);
  const iconComponentFor = useCellValue(iconComponentFor$);
  return /* @__PURE__ */ React__default.createElement(
    ButtonWithTooltip,
    {
      title: "Create link",
      onClick: (_) => {
        openLinkDialog();
      }
    },
    iconComponentFor("link")
  );
};
export {
  CreateLink
};

import React__default from "react";
import { ButtonWithTooltip } from "../primitives/toolbar.js";
import { insertFrontmatter$, hasFrontmatter$ } from "../../frontmatter/index.js";
import styles from "../../../styles/ui.module.css.js";
import classNames from "classnames";
import { usePublisher, useCellValues } from "@mdxeditor/gurx";
import { iconComponentFor$ } from "../../core/index.js";
const InsertFrontmatter = () => {
  const insertFrontmatter = usePublisher(insertFrontmatter$);
  const [hasFrontmatter, iconComponentFor] = useCellValues(hasFrontmatter$, iconComponentFor$);
  return /* @__PURE__ */ React__default.createElement(
    ButtonWithTooltip,
    {
      title: hasFrontmatter ? "Edit frontmatter" : "Insert frontmatter",
      className: classNames({
        [styles.activeToolbarButton]: hasFrontmatter
      }),
      onClick: () => insertFrontmatter()
    },
    iconComponentFor("frontmatter")
  );
};
export {
  InsertFrontmatter
};

import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { usePublisher, useCellValue } from "@mdxeditor/gurx";
import { $createParagraphNode } from "lexical";
import React__default from "react";
import { convertSelectionToNode$, currentBlockType$, activePlugins$ } from "../../core/index.js";
import { allowedHeadingLevels$ } from "../../headings/index.js";
import { Select } from "../primitives/select.js";
const BlockTypeSelect = () => {
  const convertSelectionToNode = usePublisher(convertSelectionToNode$);
  const currentBlockType = useCellValue(currentBlockType$);
  const activePlugins = useCellValue(activePlugins$);
  const hasQuote = activePlugins.includes("quote");
  const hasHeadings = activePlugins.includes("headings");
  if (!hasQuote && !hasHeadings) {
    return null;
  }
  const items = [{ label: "Paragraph", value: "paragraph" }];
  if (hasQuote) {
    items.push({ label: "Quote", value: "quote" });
  }
  if (hasHeadings) {
    const allowedHeadingLevels = useCellValue(allowedHeadingLevels$);
    items.push(...allowedHeadingLevels.map((n) => ({ label: `Heading ${n}`, value: `h${n}` })));
  }
  return /* @__PURE__ */ React__default.createElement(
    Select,
    {
      value: currentBlockType,
      onChange: (blockType) => {
        switch (blockType) {
          case "quote":
            convertSelectionToNode(() => $createQuoteNode());
            break;
          case "paragraph":
            convertSelectionToNode(() => $createParagraphNode());
            break;
          default:
            if (blockType == "")
              ;
            else if (blockType.startsWith("h")) {
              convertSelectionToNode(() => $createHeadingNode(blockType));
            } else {
              throw new Error(`Unknown block type: ${blockType}`);
            }
        }
      },
      triggerTitle: "Select block type",
      placeholder: "Block type",
      items
    }
  );
};
export {
  BlockTypeSelect
};

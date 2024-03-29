import React__default from "react";
import SvgAddColumn from "../../icons/add_column.svg.js";
import SvgAddPhoto from "../../icons/add_photo.svg.js";
import SvgAddRow from "../../icons/add_row.svg.js";
import SvgArrowDropDown from "../../icons/arrow_drop_down.svg.js";
import SvgCheck from "../../icons/check.svg.js";
import SvgCheckSmall from "../../icons/check_small.svg.js";
import SvgClose from "../../icons/close.svg.js";
import SvgCode from "../../icons/code.svg.js";
import SvgContentCopy from "../../icons/content_copy.svg.js";
import SvgDeleteBig from "../../icons/delete_big.svg.js";
import SvgDeleteSmall from "../../icons/delete_small.svg.js";
import SvgSandpack from "../../icons/sandpack.svg.js";
import SvgDifference from "../../icons/difference.svg.js";
import SvgEdit from "../../icons/edit.svg.js";
import SvgAdmonition from "../../icons/admonition.svg.js";
import SvgExtension from "../../icons/extension.svg.js";
import SvgFormatAlignCenter from "../../icons/format_align_center.svg.js";
import SvgFormatAlignLeft from "../../icons/format_align_left.svg.js";
import SvgFormatAlignRight from "../../icons/format_align_right.svg.js";
import SvgFormatBold from "../../icons/format_bold.svg.js";
import SvgFormatItalic from "../../icons/format_italic.svg.js";
import SvgFormatListBulleted from "../../icons/format_list_bulleted.svg.js";
import SvgFormatListChecked from "../../icons/format_list_checked.svg.js";
import SvgFormatListNumbered from "../../icons/format_list_numbered.svg.js";
import SvgFormatUnderlined from "../../icons/format_underlined.svg.js";
import SvgFrameSource from "../../icons/frame_source.svg.js";
import SvgFrontmatter from "../../icons/frontmatter.svg.js";
import SvgHorizontalRule from "../../icons/horizontal_rule.svg.js";
import SvgInsertColLeft from "../../icons/insert_col_left.svg.js";
import SvgInsertColRight from "../../icons/insert_col_right.svg.js";
import SvgInsertRowAbove from "../../icons/insert_row_above.svg.js";
import SvgInsertRowBelow from "../../icons/insert_row_below.svg.js";
import SvgLink from "../../icons/link.svg.js";
import SvgLinkOff from "../../icons/link_off.svg.js";
import SvgMarkdown from "../../icons/markdown.svg.js";
import SvgMoreHoriz from "../../icons/more_horiz.svg.js";
import SvgMoreVert from "../../icons/more_vert.svg.js";
import SvgOpenInNew from "../../icons/open_in_new.svg.js";
import SvgRedo from "../../icons/redo.svg.js";
import SvgRichText from "../../icons/rich_text.svg.js";
import SvgSettings from "../../icons/settings.svg.js";
import SvgTable from "../../icons/table.svg.js";
import SvgUndo from "../../icons/undo.svg.js";
const IconMap = {
  add_column: SvgAddColumn,
  add_photo: SvgAddPhoto,
  add_row: SvgAddRow,
  arrow_drop_down: SvgArrowDropDown,
  check: SvgCheck,
  check_small: SvgCheckSmall,
  close: SvgClose,
  code: SvgCode,
  content_copy: SvgContentCopy,
  delete_big: SvgDeleteBig,
  delete_small: SvgDeleteSmall,
  sandpack: SvgSandpack,
  difference: SvgDifference,
  edit: SvgEdit,
  admonition: SvgAdmonition,
  extension: SvgExtension,
  format_align_center: SvgFormatAlignCenter,
  format_align_left: SvgFormatAlignLeft,
  format_align_right: SvgFormatAlignRight,
  format_bold: SvgFormatBold,
  format_italic: SvgFormatItalic,
  format_list_bulleted: SvgFormatListBulleted,
  format_list_checked: SvgFormatListChecked,
  format_list_numbered: SvgFormatListNumbered,
  format_underlined: SvgFormatUnderlined,
  frame_source: SvgFrameSource,
  frontmatter: SvgFrontmatter,
  horizontal_rule: SvgHorizontalRule,
  insert_col_left: SvgInsertColLeft,
  insert_col_right: SvgInsertColRight,
  insert_row_above: SvgInsertRowAbove,
  insert_row_below: SvgInsertRowBelow,
  link: SvgLink,
  link_off: SvgLinkOff,
  markdown: SvgMarkdown,
  more_horiz: SvgMoreHoriz,
  more_vert: SvgMoreVert,
  open_in_new: SvgOpenInNew,
  redo: SvgRedo,
  rich_text: SvgRichText,
  settings: SvgSettings,
  table: SvgTable,
  undo: SvgUndo
};
const Icon = ({ name }) => {
  const IconComponent = IconMap[name];
  return /* @__PURE__ */ React__default.createElement(IconComponent, null);
};
export {
  Icon as default
};

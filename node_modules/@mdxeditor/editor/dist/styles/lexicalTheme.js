import lexicalThemeStyles from "./lexical-theme.module.css.js";
const lexicalTheme = {
  text: {
    bold: lexicalThemeStyles.bold,
    italic: lexicalThemeStyles.italic,
    underline: lexicalThemeStyles.underline,
    code: lexicalThemeStyles.code,
    strikethrough: lexicalThemeStyles.strikethrough,
    subscript: lexicalThemeStyles.subscript,
    superscript: lexicalThemeStyles.superscript,
    underlineStrikethrough: lexicalThemeStyles.underlineStrikethrough
  },
  list: {
    listitem: lexicalThemeStyles.listitem,
    listitemChecked: lexicalThemeStyles.listItemChecked,
    listitemUnchecked: lexicalThemeStyles.listItemUnchecked,
    nested: {
      listitem: lexicalThemeStyles.nestedListItem
    }
  },
  admonition: {
    danger: lexicalThemeStyles.admonitionDanger,
    info: lexicalThemeStyles.admonitionInfo,
    note: lexicalThemeStyles.admonitionNote,
    tip: lexicalThemeStyles.admonitionTip,
    caution: lexicalThemeStyles.admonitionCaution
  }
};
export {
  lexicalTheme
};

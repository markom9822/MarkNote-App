function isPartOftheEditorUI(element, editorRoot) {
  if (element === null || element === editorRoot) {
    return false;
  }
  if (element.dataset["editorDialog"] !== void 0 || element.dataset["toolbarItem"] !== void 0 || element.dataset["editorDropdown"]) {
    return true;
  }
  return isPartOftheEditorUI(element.parentElement, editorRoot);
}
export {
  isPartOftheEditorUI
};

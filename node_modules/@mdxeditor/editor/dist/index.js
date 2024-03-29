import "./styles/globals.css.js";
export * from "@mdxeditor/gurx";
import { MDXEditor } from "./MDXEditor.js";
import { MarkdownParseError, UnrecognizedMarkdownConstructError, importMarkdownToLexical, importMdastTreeToLexical } from "./importMarkdownToLexical.js";
import { exportLexicalTreeToMdast, exportMarkdownFromLexical } from "./exportMarkdownFromLexical.js";
import { Appender, NESTED_EDITOR_UPDATED_COMMAND, activeEditor$, activeEditorSubscriptions$, activePlugins$, addActivePlugin$, addComposerChild$, addEditorWrapper$, addExportVisitor$, addImportVisitor$, addLexicalNode$, addMdastExtension$, addNestedEditorChild$, addSyntaxExtension$, addToMarkdownExtension$, addTopAreaChild$, applyBlockType$, applyFormat$, autoFocus$, codeBlockEditorDescriptors$, composerChildren$, contentEditableClassName$, convertSelectionToNode$, corePlugin, createActiveEditorSubscription$, createRootEditorSubscription$, currentBlockType$, currentFormat$, currentSelection$, directiveDescriptors$, editorInFocus$, editorRootElementRef$, editorWrappers$, exportVisitors$, historyState$, iconComponentFor$, importVisitors$, inFocus$, initialMarkdown$, initialRootEditorState$, insertDecoratorNode$, insertMarkdown$, jsxComponentDescriptors$, jsxIsAvailable$, markdown$, markdownErrorSignal$, markdownProcessingError$, markdownSourceEditorValue$, mdastExtensions$, muteChange$, nestedEditorChildren$, onBlur$, placeholder$, readOnly$, rootEditor$, rootEditorSubscriptions$, setMarkdown$, syntaxExtensions$, toMarkdownExtensions$, toMarkdownOptions$, topAreaChildren$, usedLexicalNodes$, viewMode$ } from "./plugins/core/index.js";
import { ALL_HEADING_LEVELS, allowedHeadingLevels$, headingsPlugin } from "./plugins/headings/index.js";
import { insertThematicBreak$, thematicBreakPlugin } from "./plugins/thematic-break/index.js";
import { applyListType$, currentListType$, listsPlugin } from "./plugins/lists/index.js";
import { insertTable$, tablePlugin } from "./plugins/table/index.js";
import { disableAutoLink$, linkPlugin } from "./plugins/link/index.js";
import { INSERT_IMAGE_COMMAND, closeImageDialog$, disableImageResize$, imageAutocompleteSuggestions$, imageDialogState$, imagePlugin, imagePreviewHandler$, imageUploadHandler$, insertImage$, openEditImageDialog$, openNewImageDialog$, saveImage$ } from "./plugins/image/index.js";
import { frontmatterDialogOpen$, frontmatterPlugin, hasFrontmatter$, insertFrontmatter$, removeFrontmatter$ } from "./plugins/frontmatter/index.js";
import { quotePlugin } from "./plugins/quote/index.js";
import { maxLengthPlugin } from "./plugins/maxlength/index.js";
import { insertJsx$, isMdastJsxNode, jsxPlugin } from "./plugins/jsx/index.js";
import { GenericJsxEditor } from "./jsx-editors/GenericJsxEditor.js";
import { insertSandpack$, sandpackConfig$, sandpackPlugin } from "./plugins/sandpack/index.js";
import { codeBlockLanguages$, codeMirrorPlugin, codeMirrorTheme$, insertCodeMirror$ } from "./plugins/codemirror/index.js";
import { CodeMirrorEditor } from "./plugins/codemirror/CodeMirrorEditor.js";
import { appendCodeBlockEditorDescriptor$, codeBlockPlugin, defaultCodeBlockLanguage$, insertCodeBlock$ } from "./plugins/codeblock/index.js";
import { directivesPlugin, insertDirective$ } from "./plugins/directives/index.js";
import { ADMONITION_TYPES, AdmonitionDirectiveDescriptor } from "./directive-editors/AdmonitionDirectiveDescriptor.js";
import { GenericDirectiveEditor } from "./directive-editors/GenericDirectiveEditor.js";
import { applyLinkChanges$, cancelLinkEdit$, linkAutocompleteSuggestions$, linkDialogPlugin, linkDialogState$, onClickLinkCallback$, onWindowChange$, openLinkEditDialog$, removeLink$, switchFromPreviewToLinkEdit$, updateLink$ } from "./plugins/link-dialog/index.js";
import { toolbarContents$, toolbarPlugin } from "./plugins/toolbar/index.js";
import { cmExtensions$, diffMarkdown$, diffSourcePlugin } from "./plugins/diff-source/index.js";
import { markdownShortcutPlugin } from "./plugins/markdown-shortcut/index.js";
import { BlockTypeSelect } from "./plugins/toolbar/components/BlockTypeSelect.js";
import { BoldItalicUnderlineToggles } from "./plugins/toolbar/components/BoldItalicUnderlineToggles.js";
import { ChangeAdmonitionType } from "./plugins/toolbar/components/ChangeAdmonitionType.js";
import { ChangeCodeMirrorLanguage } from "./plugins/toolbar/components/ChangeCodeMirrorLanguage.js";
import { CodeToggle } from "./plugins/toolbar/components/CodeToggle.js";
import { CreateLink } from "./plugins/toolbar/components/CreateLink.js";
import { DiffSourceToggleWrapper } from "./plugins/toolbar/components/DiffSourceToggleWrapper.js";
import { InsertAdmonition } from "./plugins/toolbar/components/InsertAdmonition.js";
import { InsertCodeBlock } from "./plugins/toolbar/components/InsertCodeBlock.js";
import { InsertFrontmatter } from "./plugins/toolbar/components/InsertFrontmatter.js";
import { InsertImage } from "./plugins/toolbar/components/InsertImage.js";
import { InsertSandpack } from "./plugins/toolbar/components/InsertSandpack.js";
import { InsertTable } from "./plugins/toolbar/components/InsertTable.js";
import { InsertThematicBreak } from "./plugins/toolbar/components/InsertThematicBreak.js";
import { ListsToggle } from "./plugins/toolbar/components/ListsToggle.js";
import { ShowSandpackInfo } from "./plugins/toolbar/components/ShowSandpackInfo.js";
import { UndoRedo } from "./plugins/toolbar/components/UndoRedo.js";
import { KitchenSinkToolbar } from "./plugins/toolbar/components/KitchenSinkToolbar.js";
import { Button, ButtonOrDropdownButton, ButtonWithTooltip, ConditionalContents, MultipleChoiceToggleGroup, Root, Separator, SingleChoiceToggleGroup, SingleToggleGroup, ToggleSingleGroupWithItem, ToolbarToggleItem } from "./plugins/toolbar/primitives/toolbar.js";
import { DialogButton } from "./plugins/toolbar/primitives/DialogButton.js";
import { TooltipWrap } from "./plugins/toolbar/primitives/TooltipWrap.js";
import { Select, SelectButtonTrigger, SelectContent, SelectItem, SelectTrigger } from "./plugins/toolbar/primitives/select.js";
import { NestedEditorsContext, NestedLexicalEditor, useLexicalNodeRemove, useMdastNodeUpdater, useNestedEditorContext } from "./plugins/core/NestedLexicalEditor.js";
import { PropertyPopover } from "./plugins/core/PropertyPopover.js";
import { CAN_USE_DOM, IS_APPLE, controlOrMeta } from "./utils/detectMac.js";
import { always, call, compose, curry1to0, curry2to1, joinProc, noop, prop, tap, thrush } from "./utils/fp.js";
import { isPartOftheEditorUI } from "./utils/isPartOftheEditorUI.js";
import { fromWithinEditorRead, getSelectedNode, getSelectionRectangle, getStateAsMarkdown } from "./utils/lexicalHelpers.js";
import { makeHslTransparent } from "./utils/makeHslTransparent.js";
import { uuidv4 } from "./utils/uuid4.js";
import { voidEmitter } from "./utils/voidEmitter.js";
import { RealmWithPlugins, realmPlugin } from "./RealmWithPlugins.js";
import { htmlTags, isMdastHTMLNode } from "./plugins/core/MdastHTMLNode.js";
import { $createGenericHTMLNode, $isGenericHTMLNode, GenericHTMLNode, TYPE_NAME } from "./plugins/core/GenericHTMLNode.js";
import { $createTableNode, $isTableNode, TableNode } from "./plugins/table/TableNode.js";
import { $createImageNode, $isImageNode, ImageNode } from "./plugins/image/ImageNode.js";
import { $createCodeBlockNode, $isCodeBlockNode, CodeBlockNode, useCodeBlockEditorContext } from "./plugins/codeblock/CodeBlockNode.js";
import { $createDirectiveNode, $isDirectiveNode, DirectiveNode } from "./plugins/directives/DirectiveNode.js";
export {
  $createCodeBlockNode,
  $createDirectiveNode,
  $createGenericHTMLNode,
  $createImageNode,
  $createTableNode,
  $isCodeBlockNode,
  $isDirectiveNode,
  $isGenericHTMLNode,
  $isImageNode,
  $isTableNode,
  ADMONITION_TYPES,
  ALL_HEADING_LEVELS,
  AdmonitionDirectiveDescriptor,
  Appender,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  Button,
  ButtonOrDropdownButton,
  ButtonWithTooltip,
  CAN_USE_DOM,
  ChangeAdmonitionType,
  ChangeCodeMirrorLanguage,
  CodeBlockNode,
  CodeMirrorEditor,
  CodeToggle,
  ConditionalContents,
  CreateLink,
  DialogButton,
  DiffSourceToggleWrapper,
  DirectiveNode,
  GenericDirectiveEditor,
  GenericHTMLNode,
  GenericJsxEditor,
  INSERT_IMAGE_COMMAND,
  IS_APPLE,
  ImageNode,
  InsertAdmonition,
  InsertCodeBlock,
  InsertFrontmatter,
  InsertImage,
  InsertSandpack,
  InsertTable,
  InsertThematicBreak,
  KitchenSinkToolbar,
  ListsToggle,
  MDXEditor,
  MarkdownParseError,
  MultipleChoiceToggleGroup,
  NESTED_EDITOR_UPDATED_COMMAND,
  NestedEditorsContext,
  NestedLexicalEditor,
  PropertyPopover,
  RealmWithPlugins,
  Root,
  Select,
  SelectButtonTrigger,
  SelectContent,
  SelectItem,
  SelectTrigger,
  Separator,
  ShowSandpackInfo,
  SingleChoiceToggleGroup,
  SingleToggleGroup,
  TYPE_NAME,
  TableNode,
  ToggleSingleGroupWithItem,
  ToolbarToggleItem,
  TooltipWrap,
  UndoRedo,
  UnrecognizedMarkdownConstructError,
  activeEditor$,
  activeEditorSubscriptions$,
  activePlugins$,
  addActivePlugin$,
  addComposerChild$,
  addEditorWrapper$,
  addExportVisitor$,
  addImportVisitor$,
  addLexicalNode$,
  addMdastExtension$,
  addNestedEditorChild$,
  addSyntaxExtension$,
  addToMarkdownExtension$,
  addTopAreaChild$,
  allowedHeadingLevels$,
  always,
  appendCodeBlockEditorDescriptor$,
  applyBlockType$,
  applyFormat$,
  applyLinkChanges$,
  applyListType$,
  autoFocus$,
  call,
  cancelLinkEdit$,
  closeImageDialog$,
  cmExtensions$,
  codeBlockEditorDescriptors$,
  codeBlockLanguages$,
  codeBlockPlugin,
  codeMirrorPlugin,
  codeMirrorTheme$,
  compose,
  composerChildren$,
  contentEditableClassName$,
  controlOrMeta,
  convertSelectionToNode$,
  corePlugin,
  createActiveEditorSubscription$,
  createRootEditorSubscription$,
  currentBlockType$,
  currentFormat$,
  currentListType$,
  currentSelection$,
  curry1to0,
  curry2to1,
  defaultCodeBlockLanguage$,
  diffMarkdown$,
  diffSourcePlugin,
  directiveDescriptors$,
  directivesPlugin,
  disableAutoLink$,
  disableImageResize$,
  editorInFocus$,
  editorRootElementRef$,
  editorWrappers$,
  exportLexicalTreeToMdast,
  exportMarkdownFromLexical,
  exportVisitors$,
  fromWithinEditorRead,
  frontmatterDialogOpen$,
  frontmatterPlugin,
  getSelectedNode,
  getSelectionRectangle,
  getStateAsMarkdown,
  hasFrontmatter$,
  headingsPlugin,
  historyState$,
  htmlTags,
  iconComponentFor$,
  imageAutocompleteSuggestions$,
  imageDialogState$,
  imagePlugin,
  imagePreviewHandler$,
  imageUploadHandler$,
  importMarkdownToLexical,
  importMdastTreeToLexical,
  importVisitors$,
  inFocus$,
  initialMarkdown$,
  initialRootEditorState$,
  insertCodeBlock$,
  insertCodeMirror$,
  insertDecoratorNode$,
  insertDirective$,
  insertFrontmatter$,
  insertImage$,
  insertJsx$,
  insertMarkdown$,
  insertSandpack$,
  insertTable$,
  insertThematicBreak$,
  isMdastHTMLNode,
  isMdastJsxNode,
  isPartOftheEditorUI,
  joinProc,
  jsxComponentDescriptors$,
  jsxIsAvailable$,
  jsxPlugin,
  linkAutocompleteSuggestions$,
  linkDialogPlugin,
  linkDialogState$,
  linkPlugin,
  listsPlugin,
  makeHslTransparent,
  markdown$,
  markdownErrorSignal$,
  markdownProcessingError$,
  markdownShortcutPlugin,
  markdownSourceEditorValue$,
  maxLengthPlugin,
  mdastExtensions$,
  muteChange$,
  nestedEditorChildren$,
  noop,
  onBlur$,
  onClickLinkCallback$,
  onWindowChange$,
  openEditImageDialog$,
  openLinkEditDialog$,
  openNewImageDialog$,
  placeholder$,
  prop,
  quotePlugin,
  readOnly$,
  realmPlugin,
  removeFrontmatter$,
  removeLink$,
  rootEditor$,
  rootEditorSubscriptions$,
  sandpackConfig$,
  sandpackPlugin,
  saveImage$,
  setMarkdown$,
  switchFromPreviewToLinkEdit$,
  syntaxExtensions$,
  tablePlugin,
  tap,
  thematicBreakPlugin,
  thrush,
  toMarkdownExtensions$,
  toMarkdownOptions$,
  toolbarContents$,
  toolbarPlugin,
  topAreaChildren$,
  updateLink$,
  useCodeBlockEditorContext,
  useLexicalNodeRemove,
  useMdastNodeUpdater,
  useNestedEditorContext,
  usedLexicalNodes$,
  uuidv4,
  viewMode$,
  voidEmitter
};

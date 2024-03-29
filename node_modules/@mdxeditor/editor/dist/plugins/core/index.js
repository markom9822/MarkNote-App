import { realmPlugin } from "../../RealmWithPlugins.js";
import { createEmptyHistoryState } from "@lexical/react/LexicalHistoryPlugin.js";
import { $isHeadingNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { $findMatchingParent, $wrapNodeInElement, $insertNodeToNearestRoot } from "@lexical/utils";
import { Cell, withLatestFrom, Signal, filter, map, scan } from "@mdxeditor/gurx";
import { createCommand, FORMAT_TEXT_COMMAND, $isRootOrShadowRoot, $getRoot, $setSelection, $getSelection, $insertNodes, SELECTION_CHANGE_COMMAND, COMMAND_PRIORITY_CRITICAL, FOCUS_COMMAND, KEY_DOWN_COMMAND, $isDecoratorNode, BLUR_COMMAND, $isRangeSelection, $createParagraphNode, ParagraphNode, TextNode } from "lexical";
import { mdxJsxFromMarkdown, mdxJsxToMarkdown } from "mdast-util-mdx-jsx";
import { mdxJsx } from "micromark-extension-mdx-jsx";
import { mdxMd } from "micromark-extension-mdx-md";
import { exportMarkdownFromLexical } from "../../exportMarkdownFromLexical.js";
import { importMarkdownToLexical, MarkdownParseError, UnrecognizedMarkdownConstructError } from "../../importMarkdownToLexical.js";
import { controlOrMeta } from "../../utils/detectMac.js";
import { noop } from "../../utils/fp.js";
import { GenericHTMLNode } from "./GenericHTMLNode.js";
import { $createGenericHTMLNode, $isGenericHTMLNode, TYPE_NAME } from "./GenericHTMLNode.js";
import { LexicalGenericHTMLVisitor } from "./LexicalGenericHTMLNodeVisitor.js";
import { LexicalLinebreakVisitor } from "./LexicalLinebreakVisitor.js";
import { LexicalParagraphVisitor } from "./LexicalParagraphVisitor.js";
import { LexicalRootVisitor } from "./LexicalRootVisitor.js";
import { LexicalTextVisitor } from "./LexicalTextVisitor.js";
import { MdastBreakVisitor } from "./MdastBreakVisitor.js";
import { MdastFormattingVisitor } from "./MdastFormattingVisitor.js";
import { MdastHTMLVisitor } from "./MdastHTMLVisitor.js";
import { MdastInlineCodeVisitor } from "./MdastInlineCodeVisitor.js";
import { MdastParagraphVisitor } from "./MdastParagraphVisitor.js";
import { MdastRootVisitor } from "./MdastRootVisitor.js";
import { MdastTextVisitor } from "./MdastTextVisitor.js";
import { SharedHistoryPlugin } from "./SharedHistoryPlugin.js";
import { commentFromMarkdown, comment } from "../../mdastUtilHtmlComment.js";
const NESTED_EDITOR_UPDATED_COMMAND = createCommand("NESTED_EDITOR_UPDATED_COMMAND");
const rootEditor$ = Cell(null);
const activeEditor$ = Cell(null);
const contentEditableClassName$ = Cell("");
const readOnly$ = Cell(false, (r) => {
  r.sub(r.pipe(readOnly$, withLatestFrom(rootEditor$)), ([readOnly, rootEditor]) => {
    rootEditor == null ? void 0 : rootEditor.setEditable(!readOnly);
  });
});
const placeholder$ = Cell("");
const autoFocus$ = Cell(false);
const inFocus$ = Cell(false);
const currentFormat$ = Cell(0);
const markdownProcessingError$ = Cell(null);
const markdownErrorSignal$ = Signal((r) => {
  r.link(
    r.pipe(
      markdownProcessingError$,
      filter((e) => e !== null)
    ),
    markdownErrorSignal$
  );
});
const applyFormat$ = Signal((r) => {
  r.sub(r.pipe(applyFormat$, withLatestFrom(activeEditor$)), ([format, theEditor]) => {
    theEditor == null ? void 0 : theEditor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  });
});
const currentSelection$ = Cell(null, (r) => {
  r.sub(r.pipe(currentSelection$, withLatestFrom(activeEditor$)), ([selection, theEditor]) => {
    if (!selection || !theEditor) {
      return;
    }
    const anchorNode = selection.anchor.getNode();
    let element = anchorNode.getKey() === "root" ? anchorNode : $findMatchingParent(anchorNode, (e) => {
      const parent = e.getParent();
      return parent !== null && $isRootOrShadowRoot(parent);
    });
    if (element === null) {
      element = anchorNode.getTopLevelElementOrThrow();
    }
    const elementKey = element.getKey();
    const elementDOM = theEditor.getElementByKey(elementKey);
    if (elementDOM !== null) {
      const blockType = $isHeadingNode(element) ? element.getTag() : element.getType();
      r.pub(currentBlockType$, blockType);
    }
  });
});
const initialMarkdown$ = Cell("");
const markdown$ = Cell("");
const markdownSignal$ = Signal((r) => {
  r.link(markdown$, markdownSignal$);
  r.link(initialMarkdown$, markdown$);
});
const mutableMarkdownSignal$ = Signal((r) => {
  r.link(
    r.pipe(
      markdownSignal$,
      withLatestFrom(muteChange$),
      filter(([, muted]) => !muted),
      map(([value]) => value)
    ),
    mutableMarkdownSignal$
  );
});
const importVisitors$ = Cell([]);
const syntaxExtensions$ = Cell([]);
const mdastExtensions$ = Cell([]);
const usedLexicalNodes$ = Cell([]);
const exportVisitors$ = Cell([]);
const toMarkdownExtensions$ = Cell([]);
const toMarkdownOptions$ = Cell({});
const jsxIsAvailable$ = Cell(false);
const jsxComponentDescriptors$ = Cell([]);
const directiveDescriptors$ = Cell([]);
const codeBlockEditorDescriptors$ = Cell([]);
const editorRootElementRef$ = Cell(null);
const addLexicalNode$ = Appender(usedLexicalNodes$);
const addImportVisitor$ = Appender(importVisitors$);
const addSyntaxExtension$ = Appender(syntaxExtensions$);
const addMdastExtension$ = Appender(mdastExtensions$);
const addExportVisitor$ = Appender(exportVisitors$);
const addToMarkdownExtension$ = Appender(toMarkdownExtensions$);
const muteChange$ = Cell(false);
const setMarkdown$ = Signal((r) => {
  r.sub(
    r.pipe(
      setMarkdown$,
      withLatestFrom(markdown$, rootEditor$, inFocus$),
      filter(([newMarkdown, oldMarkdown]) => {
        return newMarkdown.trim() !== oldMarkdown.trim();
      })
    ),
    ([theNewMarkdownValue, , editor, inFocus]) => {
      r.pub(muteChange$, true);
      editor == null ? void 0 : editor.update(
        () => {
          $getRoot().clear();
          tryImportingMarkdown(r, $getRoot(), theNewMarkdownValue);
          if (!inFocus) {
            $setSelection(null);
          } else {
            editor.focus();
          }
        },
        {
          onUpdate: () => r.pub(muteChange$, false)
        }
      );
    }
  );
});
const insertMarkdown$ = Signal((r) => {
  r.sub(r.pipe(insertMarkdown$, withLatestFrom(activeEditor$, inFocus$)), ([markdownToInsert, editor, inFocus]) => {
    editor == null ? void 0 : editor.update(() => {
      const selection = $getSelection();
      if (selection !== null) {
        const importPoint = {
          children: [],
          append(node) {
            this.children.push(node);
          },
          getType() {
            return selection == null ? void 0 : selection.getNodes()[0].getType();
          }
        };
        tryImportingMarkdown(r, importPoint, markdownToInsert);
        $insertNodes(importPoint.children);
      }
      if (!inFocus) {
        $setSelection(null);
      } else {
        editor.focus();
      }
    });
  });
});
function rebind() {
  return scan((teardowns, [subs, activeEditorValue]) => {
    teardowns.forEach((teardown) => {
      if (!teardown) {
        throw new Error("You have a subscription that does not return a teardown");
      }
      teardown();
    });
    return activeEditorValue ? subs.map((s) => s(activeEditorValue)) : [];
  }, []);
}
const activeEditorSubscriptions$ = Cell([], (r) => {
  r.pipe(r.combine(activeEditorSubscriptions$, activeEditor$), rebind());
});
const rootEditorSubscriptions$ = Cell([], (r) => {
  r.pipe(r.combine(rootEditorSubscriptions$, rootEditor$), rebind());
});
const editorInFocus$ = Cell(null);
const onBlur$ = Signal();
const iconComponentFor$ = Cell((name) => {
  throw new Error(`No icon component for ${name}`);
});
function Appender(cell$, init) {
  return Signal((r, sig$) => {
    r.changeWith(cell$, sig$, (values, newValue) => {
      if (!Array.isArray(newValue)) {
        newValue = [newValue];
      }
      let result = values;
      for (const v of newValue) {
        if (!values.includes(v)) {
          result = [...result, v];
        }
      }
      return result;
    });
    init == null ? void 0 : init(r, sig$);
  });
}
function handleSelectionChange(r) {
  const selection = $getSelection();
  if ($isRangeSelection(selection)) {
    r.pubIn({
      [currentSelection$]: selection,
      [currentFormat$]: selection.format
    });
  }
}
const createRootEditorSubscription$ = Appender(rootEditorSubscriptions$, (r, sig$) => {
  r.pub(sig$, [
    (rootEditor) => {
      return rootEditor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_, theActiveEditor) => {
          r.pubIn({
            [activeEditor$]: theActiveEditor,
            [inFocus$]: true
          });
          if (theActiveEditor._parentEditor === null) {
            theActiveEditor.getEditorState().read(() => {
              r.pub(editorInFocus$, {
                rootNode: $getRoot(),
                editorType: "lexical"
              });
            });
          }
          handleSelectionChange(r);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      );
    },
    // Export handler
    (rootEditor) => {
      return rootEditor.registerUpdateListener(({ dirtyElements, dirtyLeaves, editorState }) => {
        const err = r.getValue(markdownProcessingError$);
        if (err !== null) {
          return;
        }
        if (dirtyElements.size === 0 && dirtyLeaves.size === 0) {
          return;
        }
        let theNewMarkdownValue;
        editorState.read(() => {
          theNewMarkdownValue = exportMarkdownFromLexical({
            root: $getRoot(),
            visitors: r.getValue(exportVisitors$),
            jsxComponentDescriptors: r.getValue(jsxComponentDescriptors$),
            toMarkdownExtensions: r.getValue(toMarkdownExtensions$),
            toMarkdownOptions: r.getValue(toMarkdownOptions$),
            jsxIsAvailable: r.getValue(jsxIsAvailable$)
          });
        });
        r.pub(markdown$, theNewMarkdownValue.trim());
      });
    },
    (rootEditor) => {
      return rootEditor.registerCommand(
        FOCUS_COMMAND,
        () => {
          r.pub(inFocus$, true);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      );
    },
    // Fixes select all when frontmatter is present
    (rootEditor) => {
      return rootEditor.registerCommand(
        KEY_DOWN_COMMAND,
        (event) => {
          const { keyCode, ctrlKey, metaKey } = event;
          if (keyCode === 65 && controlOrMeta(metaKey, ctrlKey)) {
            let shouldOverride = false;
            rootEditor.getEditorState().read(() => {
              shouldOverride = $isDecoratorNode($getRoot().getFirstChild()) || $isDecoratorNode($getRoot().getLastChild());
            });
            if (shouldOverride) {
              event.preventDefault();
              event.stopImmediatePropagation();
              rootEditor.update(() => {
                var _a;
                const rootElement = rootEditor.getRootElement();
                (_a = window.getSelection()) == null ? void 0 : _a.selectAllChildren(rootElement);
                rootElement.focus({
                  preventScroll: true
                });
              });
              return true;
            }
          }
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      );
    }
  ]);
});
const createActiveEditorSubscription$ = Appender(activeEditorSubscriptions$, (r, sig$) => {
  r.pub(sig$, [
    (editor) => {
      return editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          handleSelectionChange(r);
        });
      });
    },
    (editor) => {
      return editor.registerCommand(
        BLUR_COMMAND,
        (payload) => {
          var _a;
          const theRootEditor = r.getValue(rootEditor$);
          if (theRootEditor) {
            const movingOutside = !((_a = theRootEditor.getRootElement()) == null ? void 0 : _a.contains(payload.relatedTarget));
            if (movingOutside) {
              r.pubIn({
                [inFocus$]: false,
                [onBlur$]: payload
              });
            }
          }
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      );
    }
  ]);
});
function tryImportingMarkdown(r, node, markdownValue) {
  try {
    importMarkdownToLexical({
      root: node,
      visitors: r.getValue(importVisitors$),
      mdastExtensions: r.getValue(mdastExtensions$),
      markdown: markdownValue,
      syntaxExtensions: r.getValue(syntaxExtensions$),
      jsxComponentDescriptors: r.getValue(jsxComponentDescriptors$),
      directiveDescriptors: r.getValue(directiveDescriptors$),
      codeBlockEditorDescriptors: r.getValue(codeBlockEditorDescriptors$)
    });
    r.pub(markdownProcessingError$, null);
  } catch (e) {
    if (e instanceof MarkdownParseError || e instanceof UnrecognizedMarkdownConstructError) {
      r.pubIn({
        [markdown$]: markdownValue,
        [markdownProcessingError$]: {
          error: e.message,
          source: markdownValue
        }
      });
    } else {
      throw e;
    }
  }
}
const initialRootEditorState$ = Cell(null, (r) => {
  r.pub(initialRootEditorState$, (theRootEditor) => {
    r.pub(rootEditor$, theRootEditor);
    r.pub(activeEditor$, theRootEditor);
    tryImportingMarkdown(r, $getRoot(), r.getValue(initialMarkdown$));
    const autoFocusValue = r.getValue(autoFocus$);
    if (autoFocusValue) {
      if (autoFocusValue === true) {
        setTimeout(() => theRootEditor.focus(noop, { defaultSelection: "rootStart" }));
        return;
      }
      setTimeout(
        () => theRootEditor.focus(noop, {
          defaultSelection: autoFocusValue.defaultSelection ?? "rootStart"
        })
      );
    }
  });
});
const composerChildren$ = Cell([]);
const addComposerChild$ = Appender(composerChildren$);
const topAreaChildren$ = Cell([]);
const addTopAreaChild$ = Appender(topAreaChildren$);
const editorWrappers$ = Cell([]);
const addEditorWrapper$ = Appender(editorWrappers$);
const nestedEditorChildren$ = Cell([]);
const addNestedEditorChild$ = Appender(nestedEditorChildren$);
const historyState$ = Cell(createEmptyHistoryState());
const currentBlockType$ = Cell("");
const applyBlockType$ = Signal();
const convertSelectionToNode$ = Signal((r) => {
  r.sub(r.pipe(convertSelectionToNode$, withLatestFrom(activeEditor$)), ([factory, editor]) => {
    editor == null ? void 0 : editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, factory);
        setTimeout(() => {
          editor.focus();
        });
      }
    });
  });
});
const insertDecoratorNode$ = Signal((r) => {
  r.sub(r.pipe(insertDecoratorNode$, withLatestFrom(activeEditor$)), ([nodeFactory, theEditor]) => {
    theEditor == null ? void 0 : theEditor.focus(
      () => {
        theEditor.getEditorState().read(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const focusNode = selection.focus.getNode();
            if (focusNode !== null) {
              theEditor.update(() => {
                const node = nodeFactory();
                if (node.isInline()) {
                  $insertNodes([node]);
                  if ($isRootOrShadowRoot(node.getParentOrThrow())) {
                    $wrapNodeInElement(node, $createParagraphNode).selectEnd();
                  }
                } else {
                  $insertNodeToNearestRoot(node);
                }
                if ("select" in node && typeof node.select === "function") {
                  setTimeout(() => node.select());
                }
              });
              setTimeout(() => {
                theEditor.dispatchCommand(NESTED_EDITOR_UPDATED_COMMAND, void 0);
              });
            }
          }
        });
      },
      { defaultSelection: "rootEnd" }
    );
  });
});
const viewMode$ = Cell("rich-text", (r) => {
  function currentNextViewMode() {
    return scan(
      (prev, next) => {
        return {
          current: prev.next,
          next
        };
      },
      { current: "rich-text", next: "rich-text" }
    );
  }
  r.sub(r.pipe(viewMode$, currentNextViewMode(), withLatestFrom(markdownSourceEditorValue$)), ([{ current }, markdownSourceFromEditor]) => {
    if (current === "source" || current === "diff") {
      r.pub(setMarkdown$, markdownSourceFromEditor);
    }
  });
  r.sub(
    r.pipe(
      viewMode$,
      currentNextViewMode(),
      filter((mode) => mode.current === "rich-text"),
      withLatestFrom(activeEditor$)
    ),
    ([, editor]) => {
      editor == null ? void 0 : editor.dispatchCommand(NESTED_EDITOR_UPDATED_COMMAND, void 0);
    }
  );
});
const markdownSourceEditorValue$ = Cell("", (r) => {
  r.link(markdown$, markdownSourceEditorValue$);
  r.link(markdownSourceEditorValue$, markdownSignal$);
});
const activePlugins$ = Cell([]);
const addActivePlugin$ = Appender(activePlugins$);
const corePlugin = realmPlugin({
  init(r, params) {
    r.register(createRootEditorSubscription$);
    r.register(createActiveEditorSubscription$);
    r.register(markdownSignal$);
    r.pubIn({
      [initialMarkdown$]: params == null ? void 0 : params.initialMarkdown.trim(),
      [iconComponentFor$]: params == null ? void 0 : params.iconComponentFor,
      [addImportVisitor$]: [
        MdastRootVisitor,
        MdastParagraphVisitor,
        MdastTextVisitor,
        MdastFormattingVisitor,
        MdastInlineCodeVisitor,
        MdastBreakVisitor
      ],
      [addLexicalNode$]: [ParagraphNode, TextNode, GenericHTMLNode],
      [addExportVisitor$]: [
        LexicalRootVisitor,
        LexicalParagraphVisitor,
        LexicalTextVisitor,
        LexicalLinebreakVisitor,
        LexicalGenericHTMLVisitor
      ],
      [addComposerChild$]: SharedHistoryPlugin,
      [contentEditableClassName$]: params == null ? void 0 : params.contentEditableClassName,
      [toMarkdownOptions$]: params == null ? void 0 : params.toMarkdownOptions,
      [autoFocus$]: params == null ? void 0 : params.autoFocus,
      [placeholder$]: params == null ? void 0 : params.placeholder,
      [readOnly$]: params == null ? void 0 : params.readOnly
    });
    if (!(params == null ? void 0 : params.suppressHtmlProcessing)) {
      r.pubIn({
        [addMdastExtension$]: [mdxJsxFromMarkdown(), commentFromMarkdown({ ast: false })],
        [addSyntaxExtension$]: [mdxJsx(), mdxMd(), comment],
        [addToMarkdownExtension$]: mdxJsxToMarkdown(),
        [addImportVisitor$]: MdastHTMLVisitor
      });
    }
  },
  update(realm, params) {
    realm.pubIn({
      [contentEditableClassName$]: params == null ? void 0 : params.contentEditableClassName,
      [toMarkdownOptions$]: params == null ? void 0 : params.toMarkdownOptions,
      [autoFocus$]: params == null ? void 0 : params.autoFocus,
      [placeholder$]: params == null ? void 0 : params.placeholder,
      [readOnly$]: params == null ? void 0 : params.readOnly
    });
    realm.singletonSub(mutableMarkdownSignal$, params == null ? void 0 : params.onChange);
    realm.singletonSub(onBlur$, params == null ? void 0 : params.onBlur);
    realm.singletonSub(markdownErrorSignal$, params == null ? void 0 : params.onError);
  }
});
export {
  $createGenericHTMLNode,
  $isGenericHTMLNode,
  Appender,
  GenericHTMLNode,
  NESTED_EDITOR_UPDATED_COMMAND,
  TYPE_NAME,
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
  applyBlockType$,
  applyFormat$,
  autoFocus$,
  codeBlockEditorDescriptors$,
  composerChildren$,
  contentEditableClassName$,
  convertSelectionToNode$,
  corePlugin,
  createActiveEditorSubscription$,
  createRootEditorSubscription$,
  currentBlockType$,
  currentFormat$,
  currentSelection$,
  directiveDescriptors$,
  editorInFocus$,
  editorRootElementRef$,
  editorWrappers$,
  exportVisitors$,
  historyState$,
  iconComponentFor$,
  importVisitors$,
  inFocus$,
  initialMarkdown$,
  initialRootEditorState$,
  insertDecoratorNode$,
  insertMarkdown$,
  jsxComponentDescriptors$,
  jsxIsAvailable$,
  markdown$,
  markdownErrorSignal$,
  markdownProcessingError$,
  markdownSourceEditorValue$,
  mdastExtensions$,
  muteChange$,
  nestedEditorChildren$,
  onBlur$,
  placeholder$,
  readOnly$,
  rootEditor$,
  rootEditorSubscriptions$,
  setMarkdown$,
  syntaxExtensions$,
  toMarkdownExtensions$,
  toMarkdownOptions$,
  topAreaChildren$,
  usedLexicalNodes$,
  viewMode$
};

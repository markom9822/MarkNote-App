import React__default from "react";
import { corePlugin, initialRootEditorState$, usedLexicalNodes$, readOnly$, contentEditableClassName$, composerChildren$, topAreaChildren$, editorWrappers$, placeholder$, editorRootElementRef$, viewMode$, markdownSourceEditorValue$, markdown$, setMarkdown$, insertMarkdown$, rootEditor$ } from "./plugins/core/index.js";
import { RealmWithPlugins } from "./RealmWithPlugins.js";
import { useCellValues, usePublisher, useRealm } from "@mdxeditor/gurx";
import { lexicalTheme } from "./styles/lexicalTheme.js";
import { LexicalComposer } from "@lexical/react/LexicalComposer.js";
import styles from "./styles/ui.module.css.js";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin.js";
import { ContentEditable } from "@lexical/react/LexicalContentEditable.js";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary.js";
import classNames from "classnames";
import { noop } from "./utils/fp.js";
const LexicalProvider = ({ children }) => {
  const [initialRootEditorState, nodes, readOnly] = useCellValues(initialRootEditorState$, usedLexicalNodes$, readOnly$);
  return /* @__PURE__ */ React__default.createElement(
    LexicalComposer,
    {
      initialConfig: {
        editable: !readOnly,
        editorState: initialRootEditorState,
        namespace: "MDXEditor",
        theme: lexicalTheme,
        nodes,
        onError: (error) => {
          throw error;
        }
      }
    },
    children
  );
};
const RichTextEditor = () => {
  const [contentEditableClassName, composerChildren, topAreaChildren, editorWrappers, placeholder] = useCellValues(
    contentEditableClassName$,
    composerChildren$,
    topAreaChildren$,
    editorWrappers$,
    placeholder$
  );
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, topAreaChildren.map((Child, index) => /* @__PURE__ */ React__default.createElement(Child, { key: index })), /* @__PURE__ */ React__default.createElement(RenderRecursiveWrappers, { wrappers: editorWrappers }, /* @__PURE__ */ React__default.createElement("div", { className: classNames(styles.rootContentEditableWrapper, "mdxeditor-root-contenteditable") }, /* @__PURE__ */ React__default.createElement(
    RichTextPlugin,
    {
      contentEditable: /* @__PURE__ */ React__default.createElement(ContentEditable, { className: classNames(styles.contentEditable, contentEditableClassName) }),
      placeholder: /* @__PURE__ */ React__default.createElement("div", { className: classNames(styles.contentEditable, styles.placeholder, contentEditableClassName) }, /* @__PURE__ */ React__default.createElement("p", null, placeholder)),
      ErrorBoundary: LexicalErrorBoundary
    }
  ))), composerChildren.map((Child, index) => /* @__PURE__ */ React__default.createElement(Child, { key: index })));
};
const DEFAULT_MARKDOWN_OPTIONS = {
  listItemIndent: "one"
};
const DefaultIcon = React__default.lazy(() => import("./plugins/core/Icon.js"));
const IconFallback = () => {
  return /* @__PURE__ */ React__default.createElement("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none" });
};
const defaultIconComponentFor = (name) => {
  return /* @__PURE__ */ React__default.createElement(React__default.Suspense, { fallback: /* @__PURE__ */ React__default.createElement(IconFallback, null) }, /* @__PURE__ */ React__default.createElement(DefaultIcon, { name }));
};
const RenderRecursiveWrappers = ({
  wrappers,
  children
}) => {
  if (wrappers.length === 0) {
    return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, children);
  }
  const Wrapper = wrappers[0];
  return /* @__PURE__ */ React__default.createElement(Wrapper, null, /* @__PURE__ */ React__default.createElement(RenderRecursiveWrappers, { wrappers: wrappers.slice(1) }, children));
};
const EditorRootElement = ({ children, className }) => {
  const editorRootElementRef = React__default.useRef(null);
  const setEditorRootElementRef = usePublisher(editorRootElementRef$);
  React__default.useEffect(() => {
    const popupContainer = document.createElement("div");
    popupContainer.classList.add(
      "mdxeditor-popup-container",
      styles.editorRoot,
      styles.popupContainer,
      ...(className ?? "").trim().split(" ").filter(Boolean)
    );
    document.body.appendChild(popupContainer);
    editorRootElementRef.current = popupContainer;
    setEditorRootElementRef(editorRootElementRef);
    return () => {
      popupContainer.remove();
    };
  }, [className, editorRootElementRef, setEditorRootElementRef]);
  return /* @__PURE__ */ React__default.createElement("div", { className: classNames("mdxeditor", styles.editorRoot, styles.editorWrapper, className) }, children);
};
const Methods = ({ mdxRef }) => {
  const realm = useRealm();
  React__default.useImperativeHandle(
    mdxRef,
    () => {
      return {
        getMarkdown: () => {
          if (realm.getValue(viewMode$) === "source") {
            return realm.getValue(markdownSourceEditorValue$);
          }
          return realm.getValue(markdown$);
        },
        setMarkdown: (markdown) => {
          realm.pub(setMarkdown$, markdown);
        },
        insertMarkdown: (markdown) => {
          realm.pub(insertMarkdown$, markdown);
        },
        focus: (callbackFn, opts) => {
          var _a;
          (_a = realm.getValue(rootEditor$)) == null ? void 0 : _a.focus(callbackFn, opts);
        }
      };
    },
    [realm]
  );
  return null;
};
const MDXEditor = React__default.forwardRef((props, ref) => {
  return /* @__PURE__ */ React__default.createElement(
    RealmWithPlugins,
    {
      plugins: [
        corePlugin({
          contentEditableClassName: props.contentEditableClassName ?? "",
          initialMarkdown: props.markdown,
          onChange: props.onChange ?? noop,
          onBlur: props.onBlur ?? noop,
          toMarkdownOptions: props.toMarkdownOptions ?? DEFAULT_MARKDOWN_OPTIONS,
          autoFocus: props.autoFocus ?? false,
          placeholder: props.placeholder ?? "",
          readOnly: Boolean(props.readOnly),
          iconComponentFor: props.iconComponentFor ?? defaultIconComponentFor,
          suppressHtmlProcessing: props.suppressHtmlProcessing ?? false,
          onError: props.onError ?? noop
        }),
        ...props.plugins || []
      ]
    },
    /* @__PURE__ */ React__default.createElement(EditorRootElement, { className: props.className }, /* @__PURE__ */ React__default.createElement(LexicalProvider, null, /* @__PURE__ */ React__default.createElement(RichTextEditor, null))),
    /* @__PURE__ */ React__default.createElement(Methods, { mdxRef: ref })
  );
});
export {
  MDXEditor
};

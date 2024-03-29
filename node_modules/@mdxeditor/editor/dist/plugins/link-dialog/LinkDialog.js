import * as RadixPopover from "@radix-ui/react-popover";
import * as Tooltip from "@radix-ui/react-tooltip";
import React__default from "react";
import { editorRootElementRef$, activeEditor$, iconComponentFor$ } from "../core/index.js";
import { DownshiftAutoComplete } from "../core/ui/DownshiftAutoComplete.js";
import styles from "../../styles/ui.module.css.js";
import classNames from "classnames";
import { createCommand } from "lexical";
import { useForm } from "react-hook-form";
import { linkDialogState$, linkAutocompleteSuggestions$, onClickLinkCallback$, onWindowChange$, updateLink$, cancelLinkEdit$, switchFromPreviewToLinkEdit$, removeLink$ } from "./index.js";
import { useCellValues, usePublisher } from "@mdxeditor/gurx";
createCommand();
function LinkEditForm({ url, title, onSubmit, onCancel, linkAutocompleteSuggestions }) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset: _
  } = useForm({
    values: {
      url,
      title
    }
  });
  return /* @__PURE__ */ React__default.createElement(
    "form",
    {
      onSubmit: (e) => {
        void handleSubmit(onSubmit)(e);
        e.stopPropagation();
        e.preventDefault();
      },
      onReset: (e) => {
        e.stopPropagation();
        onCancel();
      },
      className: classNames(styles.multiFieldForm, styles.linkDialogEditForm)
    },
    /* @__PURE__ */ React__default.createElement("div", { className: styles.formField }, /* @__PURE__ */ React__default.createElement("label", { htmlFor: "link-url" }, "URL"), /* @__PURE__ */ React__default.createElement(
      DownshiftAutoComplete,
      {
        register,
        initialInputValue: url,
        inputName: "url",
        suggestions: linkAutocompleteSuggestions,
        setValue,
        control,
        placeholder: "Select or paste an URL",
        autofocus: true
      }
    )),
    /* @__PURE__ */ React__default.createElement("div", { className: styles.formField }, /* @__PURE__ */ React__default.createElement("label", { htmlFor: "link-title" }, "Title"), /* @__PURE__ */ React__default.createElement("input", { id: "link-title", className: styles.textInput, size: 40, ...register("title") })),
    /* @__PURE__ */ React__default.createElement("div", { style: { display: "flex", justifyContent: "flex-end", gap: "var(--spacing-2)" } }, /* @__PURE__ */ React__default.createElement("button", { type: "submit", title: "Set URL", "aria-label": "Set URL", className: classNames(styles.primaryButton) }, "Save"), /* @__PURE__ */ React__default.createElement("button", { type: "reset", title: "Cancel change", "aria-label": "Cancel change", className: classNames(styles.secondaryButton) }, "Cancel"))
  );
}
const LinkDialog = () => {
  const [editorRootElementRef, activeEditor, iconComponentFor, linkDialogState, linkAutocompleteSuggestions, onClickLinkCallback] = useCellValues(
    editorRootElementRef$,
    activeEditor$,
    iconComponentFor$,
    linkDialogState$,
    linkAutocompleteSuggestions$,
    onClickLinkCallback$
  );
  const publishWindowChange = usePublisher(onWindowChange$);
  const updateLink = usePublisher(updateLink$);
  const cancelLinkEdit = usePublisher(cancelLinkEdit$);
  const switchFromPreviewToLinkEdit = usePublisher(switchFromPreviewToLinkEdit$);
  const removeLink = usePublisher(removeLink$);
  React__default.useEffect(() => {
    const update = () => {
      activeEditor == null ? void 0 : activeEditor.getEditorState().read(() => {
        publishWindowChange(true);
      });
    };
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, [activeEditor, publishWindowChange]);
  const [copyUrlTooltipOpen, setCopyUrlTooltipOpen] = React__default.useState(false);
  const theRect = linkDialogState == null ? void 0 : linkDialogState.rectangle;
  const urlIsExternal = linkDialogState.type === "preview" && linkDialogState.url.startsWith("http");
  return /* @__PURE__ */ React__default.createElement(RadixPopover.Root, { open: linkDialogState.type !== "inactive" }, /* @__PURE__ */ React__default.createElement(
    RadixPopover.Anchor,
    {
      "data-visible": linkDialogState.type === "edit",
      className: styles.linkDialogAnchor,
      style: {
        top: `${(theRect == null ? void 0 : theRect.top) ?? 0}px`,
        left: `${(theRect == null ? void 0 : theRect.left) ?? 0}px`,
        width: `${(theRect == null ? void 0 : theRect.width) ?? 0}px`,
        height: `${(theRect == null ? void 0 : theRect.height) ?? 0}px`
      }
    }
  ), /* @__PURE__ */ React__default.createElement(RadixPopover.Portal, { container: editorRootElementRef == null ? void 0 : editorRootElementRef.current }, /* @__PURE__ */ React__default.createElement(
    RadixPopover.Content,
    {
      className: classNames(styles.linkDialogPopoverContent),
      sideOffset: 5,
      onOpenAutoFocus: (e) => e.preventDefault(),
      key: linkDialogState.linkNodeKey
    },
    linkDialogState.type === "edit" && /* @__PURE__ */ React__default.createElement(
      LinkEditForm,
      {
        url: linkDialogState.url,
        title: linkDialogState.title,
        onSubmit: updateLink,
        onCancel: cancelLinkEdit.bind(null),
        linkAutocompleteSuggestions
      }
    ),
    linkDialogState.type === "preview" && /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(
      "a",
      {
        className: styles.linkDialogPreviewAnchor,
        href: linkDialogState.url,
        ...urlIsExternal ? { target: "_blank", rel: "noreferrer" } : {},
        onClick: (e) => {
          if (onClickLinkCallback !== null) {
            e.preventDefault();
            onClickLinkCallback(linkDialogState.url);
          }
        },
        title: urlIsExternal ? `Open ${linkDialogState.url} in new window` : linkDialogState.url
      },
      /* @__PURE__ */ React__default.createElement("span", null, linkDialogState.url),
      urlIsExternal && iconComponentFor("open_in_new")
    ), /* @__PURE__ */ React__default.createElement(ActionButton, { onClick: () => switchFromPreviewToLinkEdit(), title: "Edit link URL", "aria-label": "Edit link URL" }, iconComponentFor("edit")), /* @__PURE__ */ React__default.createElement(Tooltip.Provider, null, /* @__PURE__ */ React__default.createElement(Tooltip.Root, { open: copyUrlTooltipOpen }, /* @__PURE__ */ React__default.createElement(Tooltip.Trigger, { asChild: true }, /* @__PURE__ */ React__default.createElement(
      ActionButton,
      {
        title: "Copy to clipboard",
        "aria-label": "Copy link URL",
        onClick: () => {
          void window.navigator.clipboard.writeText(linkDialogState.url).then(() => {
            setCopyUrlTooltipOpen(true);
            setTimeout(() => setCopyUrlTooltipOpen(false), 1e3);
          });
        }
      },
      copyUrlTooltipOpen ? iconComponentFor("check") : iconComponentFor("content_copy")
    )), /* @__PURE__ */ React__default.createElement(Tooltip.Portal, { container: editorRootElementRef == null ? void 0 : editorRootElementRef.current }, /* @__PURE__ */ React__default.createElement(Tooltip.Content, { className: classNames(styles.tooltipContent), sideOffset: 5 }, "Copied!", /* @__PURE__ */ React__default.createElement(Tooltip.Arrow, null))))), /* @__PURE__ */ React__default.createElement(ActionButton, { title: "Remove link", "aria-label": "Remove link", onClick: () => removeLink() }, iconComponentFor("link_off"))),
    /* @__PURE__ */ React__default.createElement(RadixPopover.Arrow, { className: styles.popoverArrow })
  )));
};
const ActionButton = React__default.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ React__default.createElement("button", { className: classNames(styles.actionButton, className), ref, ...props });
});
export {
  LinkDialog,
  LinkEditForm
};

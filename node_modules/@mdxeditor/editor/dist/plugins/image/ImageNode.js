var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import React__default from "react";
import { DecoratorNode } from "lexical";
import { ImageEditor } from "./ImageEditor.js";
function convertImageElement(domNode) {
  if (domNode instanceof HTMLImageElement) {
    const { alt: altText, src, title, width, height } = domNode;
    const node = $createImageNode({ altText, src, title, width, height });
    return { node };
  }
  return null;
}
class ImageNode extends DecoratorNode {
  /**
   * Constructs a new {@link ImageNode} with the specified image parameters.
   * Use {@link $createImageNode} to construct one.
   */
  constructor(src, altText, title, width, height, key) {
    super(key);
    /** @internal */
    __publicField(this, "__src");
    /** @internal */
    __publicField(this, "__altText");
    /** @internal */
    __publicField(this, "__title");
    /** @internal */
    __publicField(this, "__width");
    /** @internal */
    __publicField(this, "__height");
    this.__src = src;
    this.__title = title;
    this.__altText = altText;
    this.__width = width || "inherit";
    this.__height = height || "inherit";
  }
  /** @internal */
  static getType() {
    return "image";
  }
  /** @internal */
  static clone(node) {
    return new ImageNode(node.__src, node.__altText, node.__title, node.__width, node.__height, node.__key);
  }
  /** @internal */
  static importJSON(serializedNode) {
    const { altText, title, src, width, height } = serializedNode;
    const node = $createImageNode({
      altText,
      title,
      src,
      height,
      width
    });
    return node;
  }
  /** @internal */
  exportDOM() {
    const element = document.createElement("img");
    element.setAttribute("src", this.__src);
    element.setAttribute("alt", this.__altText);
    if (this.__title) {
      element.setAttribute("title", this.__title);
    }
    if (this.__width) {
      element.setAttribute("width", this.__width.toString());
    }
    if (this.__height) {
      element.setAttribute("height", this.__height.toString());
    }
    return { element };
  }
  /** @internal */
  static importDOM() {
    return {
      img: () => ({
        conversion: convertImageElement,
        priority: 0
      })
    };
  }
  /** @internal */
  exportJSON() {
    return {
      altText: this.getAltText(),
      title: this.getTitle(),
      height: this.__height === "inherit" ? 0 : this.__height,
      width: this.__width === "inherit" ? 0 : this.__width,
      src: this.getSrc(),
      type: "image",
      version: 1
    };
  }
  /**
   * Sets the image dimensions
   */
  setWidthAndHeight(width, height) {
    const writable = this.getWritable();
    writable.__width = width;
    writable.__height = height;
  }
  /** @internal */
  createDOM(config) {
    const span = document.createElement("span");
    const theme = config.theme;
    const className = theme.image;
    if (className !== void 0) {
      span.className = className;
    }
    return span;
  }
  /** @internal */
  updateDOM() {
    return false;
  }
  getSrc() {
    return this.__src;
  }
  getAltText() {
    return this.__altText;
  }
  getTitle() {
    return this.__title;
  }
  getHeight() {
    return this.__height;
  }
  getWidth() {
    return this.__width;
  }
  setTitle(title) {
    this.getWritable().__title = title;
  }
  setSrc(src) {
    this.getWritable().__src = src;
  }
  setAltText(altText) {
    this.getWritable().__altText = altText ?? "";
  }
  /** @internal */
  hasExplicitDimensions() {
    return this.__width !== "inherit" || this.__height !== "inherit";
  }
  /** @internal */
  decorate(_parentEditor) {
    return /* @__PURE__ */ React__default.createElement(
      ImageEditor,
      {
        src: this.getSrc(),
        title: this.getTitle(),
        nodeKey: this.getKey(),
        width: this.__width,
        height: this.__height,
        alt: this.__altText
      }
    );
  }
}
function $createImageNode(params) {
  const { altText, title, src, key, width, height } = params;
  return new ImageNode(src, altText, title, width, height, key);
}
function $isImageNode(node) {
  return node instanceof ImageNode;
}
export {
  $createImageNode,
  $isImageNode,
  ImageNode
};

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { DecoratorNode } from "lexical";
import React__default from "react";
import { noop } from "../../utils/fp.js";
import { TableEditor } from "./TableEditor.js";
const EMPTY_CELL = { type: "tableCell", children: [] };
function coordinatesEmitter() {
  let subscription = noop;
  return {
    publish: (coords) => {
      subscription(coords);
    },
    subscribe: (cb) => {
      subscription = cb;
    }
  };
}
class TableNode extends DecoratorNode {
  /**
   * Constructs a new {@link TableNode} with the specified MDAST table node as the object to edit.
   * See {@link https://github.com/micromark/micromark-extension-gfm-table | micromark/micromark-extension-gfm-table} for more information on the MDAST table node.
   */
  constructor(mdastNode, key) {
    super(key);
    /** @internal */
    __publicField(this, "__mdastNode");
    /** @internal */
    __publicField(this, "focusEmitter", coordinatesEmitter());
    this.__mdastNode = mdastNode || { type: "table", children: [] };
  }
  /** @internal */
  static getType() {
    return "table";
  }
  /** @internal */
  static clone(node) {
    return new TableNode(structuredClone(node.__mdastNode), node.__key);
  }
  /** @internal */
  static importJSON(serializedNode) {
    return $createTableNode(serializedNode.mdastNode);
  }
  /** @internal */
  exportJSON() {
    return {
      mdastNode: structuredClone(this.__mdastNode),
      type: "table",
      version: 1
    };
  }
  /**
   * Returns the mdast node that this node is constructed from.
   */
  getMdastNode() {
    return this.__mdastNode;
  }
  /**
   * Returns the number of rows in the table.
   */
  getRowCount() {
    return this.__mdastNode.children.length;
  }
  /**
   * Returns the number of columns in the table.
   */
  getColCount() {
    var _a;
    return ((_a = this.__mdastNode.children[0]) == null ? void 0 : _a.children.length) || 0;
  }
  /** @internal */
  createDOM() {
    return document.createElement("div");
  }
  /** @internal */
  updateDOM() {
    return false;
  }
  /** @internal */
  updateCellContents(colIndex, rowIndex, children) {
    const self = this.getWritable();
    const table = self.__mdastNode;
    const row = table.children[rowIndex];
    const cells = row.children;
    const cell = cells[colIndex];
    const cellsClone = Array.from(cells);
    const cellClone = { ...cell, children };
    const rowClone = { ...row, children: cellsClone };
    cellsClone[colIndex] = cellClone;
    table.children[rowIndex] = rowClone;
  }
  insertColumnAt(colIndex) {
    const self = this.getWritable();
    const table = self.__mdastNode;
    for (let rowIndex = 0; rowIndex < table.children.length; rowIndex++) {
      const row = table.children[rowIndex];
      const cells = row.children;
      const cellsClone = Array.from(cells);
      const rowClone = { ...row, children: cellsClone };
      cellsClone.splice(colIndex, 0, structuredClone(EMPTY_CELL));
      table.children[rowIndex] = rowClone;
    }
    if (table.align && table.align.length > 0) {
      table.align.splice(colIndex, 0, "left");
    }
  }
  deleteColumnAt(colIndex) {
    const self = this.getWritable();
    const table = self.__mdastNode;
    for (let rowIndex = 0; rowIndex < table.children.length; rowIndex++) {
      const row = table.children[rowIndex];
      const cells = row.children;
      const cellsClone = Array.from(cells);
      const rowClone = { ...row, children: cellsClone };
      cellsClone.splice(colIndex, 1);
      table.children[rowIndex] = rowClone;
    }
  }
  insertRowAt(y) {
    const self = this.getWritable();
    const table = self.__mdastNode;
    const newRow = {
      type: "tableRow",
      children: Array.from({ length: this.getColCount() }, () => structuredClone(EMPTY_CELL))
    };
    table.children.splice(y, 0, newRow);
  }
  deleteRowAt(rowIndex) {
    if (this.getRowCount() === 1) {
      this.selectNext();
      this.remove();
    } else {
      this.getWritable().__mdastNode.children.splice(rowIndex, 1);
    }
  }
  addRowToBottom() {
    this.insertRowAt(this.getRowCount());
  }
  addColumnToRight() {
    this.insertColumnAt(this.getColCount());
  }
  setColumnAlign(colIndex, align) {
    const self = this.getWritable();
    const table = self.__mdastNode;
    if (table.align == null) {
      table.align = [];
    }
    table.align[colIndex] = align;
  }
  /** @internal */
  decorate(parentEditor) {
    return /* @__PURE__ */ React__default.createElement(TableEditor, { lexicalTable: this, mdastNode: this.__mdastNode, parentEditor });
  }
  /**
   * Focuses the table cell at the specified coordinates.
   * Pass `undefined` to remove the focus.
   */
  select(coords) {
    this.focusEmitter.publish(coords || [0, 0]);
  }
  /** @internal */
  isInline() {
    return false;
  }
}
function $isTableNode(node) {
  return node instanceof TableNode;
}
function $createTableNode(mdastNode) {
  return new TableNode(mdastNode);
}
export {
  $createTableNode,
  $isTableNode,
  TableNode
};

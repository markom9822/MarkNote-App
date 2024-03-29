/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { BaseSelection, INTERNAL_PointSelection, LexicalNode, NodeKey, PointType } from 'lexical';
export type GridSelectionShape = {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
};
export declare class GridSelection extends INTERNAL_PointSelection {
    gridKey: NodeKey;
    constructor(gridKey: NodeKey, anchor: PointType, focus: PointType);
    getCachedNodes(): LexicalNode[] | null;
    setCachedNodes(nodes: LexicalNode[] | null): void;
    is(selection: null | BaseSelection): boolean;
    set(gridKey: NodeKey, anchorCellKey: NodeKey, focusCellKey: NodeKey): void;
    clone(): GridSelection;
    isCollapsed(): boolean;
    extract(): Array<LexicalNode>;
    insertRawText(text: string): void;
    insertText(): void;
    insertNodes(nodes: Array<LexicalNode>): void;
    getShape(): GridSelectionShape;
    getNodes(): Array<LexicalNode>;
    getTextContent(): string;
}
export declare function $isGridSelection(x: unknown): x is GridSelection;
export declare function $createGridSelection(): GridSelection;
export declare function $getChildrenRecursively(node: LexicalNode): Array<LexicalNode>;

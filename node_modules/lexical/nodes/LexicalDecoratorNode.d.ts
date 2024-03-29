/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import type { KlassConstructor, LexicalEditor } from '../LexicalEditor';
import type { NodeKey } from '../LexicalNode';
import { EditorConfig } from 'lexical';
import { LexicalNode } from '../LexicalNode';
/** @noInheritDoc */
export declare class DecoratorNode<T> extends LexicalNode {
    ['constructor']: KlassConstructor<typeof DecoratorNode<T>>;
    constructor(key?: NodeKey);
    /**
     * The returned value is added to the LexicalEditor._decorators
     */
    decorate(editor: LexicalEditor, config: EditorConfig): T;
    isIsolated(): boolean;
    isInline(): boolean;
    isKeyboardSelectable(): boolean;
}
export declare function $isDecoratorNode<T>(node: LexicalNode | null | undefined): node is DecoratorNode<T>;

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
/// <reference types="react" />
import { EditorState, EditorThemeClasses, HTMLConfig, Klass, LexicalEditor, LexicalNode, LexicalNodeReplacement } from 'lexical';
export type InitialEditorStateType = null | string | EditorState | ((editor: LexicalEditor) => void);
export type InitialConfigType = Readonly<{
    editor__DEPRECATED?: LexicalEditor | null;
    namespace: string;
    nodes?: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement>;
    onError: (error: Error, editor: LexicalEditor) => void;
    editable?: boolean;
    theme?: EditorThemeClasses;
    editorState?: InitialEditorStateType;
    html?: HTMLConfig;
}>;
type Props = {
    children: JSX.Element | string | (JSX.Element | string)[];
    initialConfig: InitialConfigType;
};
export declare function LexicalComposer({ initialConfig, children }: Props): JSX.Element;
export {};

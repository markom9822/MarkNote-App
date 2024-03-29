/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';var b=require("@lexical/react/LexicalComposerContext"),f=require("lexical"),h=require("react");function k(c,a){return c.getEditorState().read(()=>{let g=f.$getNodeByKey(a);return null===g?!1:g.isSelected()})}
exports.useLexicalNodeSelection=function(c){let [a]=b.useLexicalComposerContext(),[g,l]=h.useState(()=>k(a,c));h.useEffect(()=>{let e=!0,d=a.registerUpdateListener(()=>{e&&l(k(a,c))});return()=>{e=!1;d()}},[a,c]);let m=h.useCallback(e=>{a.update(()=>{let d=f.$getSelection();f.$isNodeSelection(d)||(d=f.$createNodeSelection(),f.$setSelection(d));f.$isNodeSelection(d)&&(e?d.add(c):d.delete(c))})},[a,c]),n=h.useCallback(()=>{a.update(()=>{const e=f.$getSelection();f.$isNodeSelection(e)&&e.clear()})},
[a]);return[g,m,n]}

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';var e=require("@lexical/link"),m=require("@lexical/react/LexicalComposerContext"),q=require("@lexical/utils"),r=require("lexical"),t=require("react");
module.exports=function({newTab:n=!0}){let [h]=m.useLexicalComposerContext();t.useEffect(()=>{let l=b=>{const c=b.target;if(c instanceof Node){var d=r.getNearestEditorFromDOMNode(c);if(null!==d){var f=null,k=null;d.update(()=>{var a=r.$getNearestNodeFromDOMNode(c);if(null!==a)if(a=q.$findMatchingParent(a,r.$isElementNode),e.$isLinkNode(a))f=a.sanitizeUrl(a.getURL()),k=a.getTarget();else{a:{a=q.isHTMLAnchorElement;let g=c;for(;null!=g;){if(a(g)){a=g;break a}g=g.parentNode}a=null}null!==a&&(f=a.href,
k=a.target)}});if(null!==f&&""!==f){d=h.getEditorState().read(r.$getSelection);if(!r.$isRangeSelection(d)||d.isCollapsed())d="auxclick"===b.type&&1===b.button,window.open(f,n||d||b.metaKey||b.ctrlKey||"_blank"===k?"_blank":"_self");b.preventDefault()}}}},p=b=>{1===b.button&&h.isEditable()&&l(b)};return h.registerRootListener((b,c)=>{null!==c&&(c.removeEventListener("click",l),c.removeEventListener("mouseup",p));null!==b&&(b.addEventListener("click",l),b.addEventListener("mouseup",p))})},[h,n]);return null}

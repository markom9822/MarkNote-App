/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';var d=require("@lexical/react/LexicalCollaborationContext"),m=require("@lexical/react/LexicalComposerContext"),r=require("react");function t(a){let h=new URLSearchParams;h.append("code",a);for(let e=1;e<arguments.length;e++)h.append("v",arguments[e]);throw Error(`Minified Lexical error #${a}; visit https://lexical.dev/docs/error?${h} for the full message or `+"use the non-minified dev environment for full errors and additional helpful warnings.");}
exports.LexicalNestedComposer=function({initialEditor:a,children:h,initialNodes:e,initialTheme:u,skipCollabChecks:v}){let q=r.useRef(!1),n=r.useContext(m.LexicalComposerContext);null==n&&t(9);let [f,{getTheme:w}]=n,y=r.useMemo(()=>{var b=u||w()||void 0;const x=m.createLexicalComposerContext(n,b);void 0!==b&&(a._config.theme=b);a._parentEditor=f;if(e)for(var c of e){var g=b=null;"function"!==typeof c&&(g=c,c=g.replace,b=g.with,g=g.withKlass||null);const k=a._nodes.get(c.getType());a._nodes.set(c.getType(),
{exportDOM:k?k.exportDOM:void 0,klass:c,replace:b,replaceWithKlass:g,transforms:new Set})}else{c=a._nodes=new Map(f._nodes);for(const [k,l]of c)a._nodes.set(k,{exportDOM:l.exportDOM,klass:l.klass,replace:l.replace,replaceWithKlass:l.replaceWithKlass,transforms:new Set})}a._config.namespace=f._config.namespace;a._editable=f._editable;return[a,x]},[]),{isCollabActive:z,yjsDocMap:A}=d.useCollaborationContext(),p=v||q.current||A.has(a.getKey());r.useEffect(()=>{p&&(q.current=!0)},[p]);r.useEffect(()=>
f.registerEditableListener(b=>{a.setEditable(b)}),[a,f]);return r.createElement(m.LexicalComposerContext.Provider,{value:y},!z||p?h:null)}

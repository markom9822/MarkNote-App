/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';var m=require("@lexical/selection"),p=require("@lexical/utils"),q=require("lexical");
function u(c,e,h,a=null){let f=null!=a?e.isSelected(a):!0,k=q.$isElementNode(e)&&e.excludeFromCopy("html");var d=e;null!==a&&(d=m.$cloneWithProperties(e),d=q.$isTextNode(d)&&null!=a?m.$sliceSelectedTextNodeContent(a,d):d);let g=q.$isElementNode(d)?d.getChildren():[];var b=c._nodes.get(d.getType());b=b&&void 0!==b.exportDOM?b.exportDOM(c,d):d.exportDOM(c);let {element:l,after:r}=b;if(!l)return!1;b=document.createDocumentFragment();for(let n=0;n<g.length;n++){let t=g[n],x=u(c,t,b,a);!f&&q.$isElementNode(e)&&
x&&e.extractWithChild(t,a,"html")&&(f=!0)}f&&!k?(p.isHTMLElement(l)&&l.append(b),h.append(l),r&&(c=r.call(d,l))&&l.replaceWith(c)):h.append(b);return f}let v=new Set(["STYLE","SCRIPT"]);
function w(c,e,h=new Map,a){let f=[];if(v.has(c.nodeName))return f;let k=null;var d,{nodeName:g}=c,b=e._htmlConversions.get(g.toLowerCase());g=null;if(void 0!==b)for(d of b)b=d(c),null!==b&&(null===g||(g.priority||0)<(b.priority||0))&&(g=b);g=(d=null!==g?g.conversion:null)?d(c):null;d=null;if(null!==g){d=g.after;b=g.node;k=Array.isArray(b)?b[b.length-1]:b;if(null!==k){for(var [,l]of h)if(k=l(k,a),!k)break;k&&f.push(...(Array.isArray(b)?b:[k]))}null!=g.forChild&&h.set(c.nodeName,g.forChild)}c=c.childNodes;
a=[];for(l=0;l<c.length;l++)a.push(...w(c[l],e,new Map(h),k));null!=d&&(a=d(a));null==k?f=f.concat(a):q.$isElementNode(k)&&k.append(...a);return f}
exports.$generateHtmlFromNodes=function(c,e){if("undefined"===typeof document||"undefined"===typeof window)throw Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");let h=document.createElement("div"),a=q.$getRoot().getChildren();for(let f=0;f<a.length;f++)u(c,a[f],h,e);return h.innerHTML};
exports.$generateNodesFromDOM=function(c,e){e=e.body?e.body.childNodes:[];let h=[];for(let f=0;f<e.length;f++){var a=e[f];v.has(a.nodeName)||(a=w(a,c),null!==a&&(h=h.concat(a)))}return h}

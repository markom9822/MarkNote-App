import ReactMarkdown from 'react-markdown'
import 'github-markdown-css/github-markdown.css'
import remarkGfm from "remark-gfm"
import remarkGemoji from 'remark-gemoji'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

import 'katex/dist/katex.min.css'
import 'github-markdown-css/github-markdown.css'

import React from "react"
import { visit } from "unist-util-visit";

export type MarkdownPreviewProps = {
    markdownContent: string
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = (props) => {

  // custom underline plugin
  const underlinePlugin = () => {
    function transformer(tree) {
      // Basically, find all strong nodes.
      // Convert strong nodes created by "__" to a different unist node type.
      visit(tree, "strong", (node) => {
        const startOg = node.position.start.offset;
        const endOg = node.position.end.offset;
  
        const strToOperateOn = props.markdownContent.substring(startOg, endOg);
        const wasUnderscores =
          strToOperateOn.startsWith("__") && strToOperateOn.endsWith("__");
  
        if (wasUnderscores) {
          node.type = "underline";
          node.data = {
            hName: "u",
            hProperties: {}
          };
        }
      });
    }
  
    return transformer;
  };

    
  return <ReactMarkdown className={`font-roboto outline-none min-h-screen max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert
  prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1
   prose-code:text-white`}
  
  remarkPlugins={[remarkGfm, remarkGemoji, remarkMath, underlinePlugin]} rehypePlugins={[rehypeKatex]}>{props.markdownContent}</ReactMarkdown>
}
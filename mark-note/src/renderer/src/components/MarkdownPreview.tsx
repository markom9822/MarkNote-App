import ReactMarkdown from 'react-markdown'
import 'github-markdown-css/github-markdown.css'
import remarkGfm from "remark-gfm"
import remarkGemoji from 'remark-gemoji'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import 'katex/dist/katex.min.css'
import 'github-markdown-css/github-markdown.css'

import React from "react"
import { visit } from "unist-util-visit";
import { selectedNoteIndexAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'

export type MarkdownPreviewProps = {
    markdownContent: string
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = (props) => {

  // if no note selected then dont show preview
  const selectedNoteIndex = useAtomValue(selectedNoteIndexAtom)
  if(selectedNoteIndex == null) return

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

    
  return <ReactMarkdown className={`font-mono outline-none min-h-screen max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert
  prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-blockquote:bg-gray-800 prose-blockquote:bg-opacity-30 prose-blockquote:border-gray-500
  prose-ul:my-2 prose-li:my-0 prose-li:marker:text-stone-300
  prose-a:text-blue-300 hover:prose-a:text-blue-500
  prose-th:bg-zinc-500 prose-th:text-white prose-td:text-white prose-th:text-center prose-th:p-2 prose-td:p-2 prose-table:bg-zinc-800 prose-td:border prose-th:border
  prose-code:px-1 prose-code:text-white prose-inline-code:rounded prose-inline-code:bg-gray-500`}
  
  remarkPlugins={[remarkGfm, remarkGemoji, remarkMath, underlinePlugin]} 
  rehypePlugins={[rehypeKatex, rehypeRaw]}
  components={{
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');

      return !inline && match ? (
        <SyntaxHighlighter style={dracula} PreTag="div" language={match[1]} {...props}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  }}
  >
  {props.markdownContent}</ReactMarkdown>
}
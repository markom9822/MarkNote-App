import ReactMarkdown from 'react-markdown'
import 'github-markdown-css/github-markdown.css'
import remarkGfm from "remark-gfm"
import remarkGemoji from 'remark-gemoji'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw';
import { remarkAlert } from 'remark-github-blockquote-alert'

import { oneDarkHighlightStyle } from '@codemirror/theme-one-dark'
import { Highlighter } from 'react-codemirror-runmode'

import '@renderer/assets/darkpreview.css'
import 'katex/dist/katex.min.css';


import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

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


    
  return <ReactMarkdown className="markdown-body"
  
  remarkPlugins={[remarkGfm, remarkGemoji, remarkMath, remarkAlert, underlinePlugin]} 
  rehypePlugins={[rehypeKatex, rehypeRaw]}
  components={{
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');

      return !inline && match ? (
        <SyntaxHighlighter 
        children={String(children).replace(/\n$/, "")} 
        language={match[1]} 
        {...props} 
        />
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
import { ComponentProps } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import style from "@/styles/Markdown.module.scss";

interface CodeBlockProps extends ComponentProps<"code"> {
  inline: boolean;
}
const CodeBlock = ({
  className,
  children,
  inline,
  style,
  ref,
  ...props
}: CodeBlockProps) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxHighlighter
      language={match[1]}
      PreTag="div"
      useInlineStyles={false}
      {...props}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export default function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      components={{
        code: (props) => <CodeBlock inline={false} {...props} />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

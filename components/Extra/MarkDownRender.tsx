import React, { useMemo } from "react";
import Markdown, { Components } from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import "katex/dist/katex.min.css";
import { cleanLatexMarkdown } from "./parseMarkdown";

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const MarkdownRenderer = React.memo(({ children }: { children: string }) => {
  const { tag, cleanedText } = useMemo(() => {
    const match = children.match(/<([^>]+)>/);
    const tag = match ? match[1] : null;
    const cleanedText = cleanLatexMarkdown(children).replace(/\\n/g, "\n");
    return { tag, cleanedText };
  }, [children]);

  const components: Components = {
    h1: ({ node, ...props }) => (
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginTop: "1.5rem",
          marginBottom: "0.75rem",
        }}
        {...props}
      />
    ),
    h2: ({ node, ...props }) => (
      <h2
        style={{
          fontSize: "1.25rem",
          fontWeight: 600,
          marginTop: "1.25rem",
          marginBottom: "0.75rem",
        }}
        {...props}
      />
    ),
    h3: ({ node, ...props }) => (
      <h3
        style={{
          fontSize: "1.125rem",
          fontWeight: 600,
          marginTop: "1rem",
          marginBottom: "0.5rem",
        }}
        {...props}
      />
    ),
    h4: ({ node, ...props }) => (
      <h4
        style={{
          fontSize: "1rem",
          fontWeight: 500,
          marginTop: "1rem",
          marginBottom: "0.5rem",
        }}
        {...props}
      />
    ),
    h5: ({ node, ...props }) => (
      <h5
        style={{
          fontSize: "0.875rem",
          fontWeight: 500,
          marginTop: "0.75rem",
          marginBottom: "0.5rem",
        }}
        {...props}
      />
    ),
    h6: ({ node, ...props }) => (
      <h6
        style={{
          fontSize: "0.875rem",
          fontWeight: 500,
          marginTop: "0.5rem",
          marginBottom: "0.25rem",
          color: "#6b7280",
        }}
        {...props}
      />
    ),
    p: ({ node, ...props }) => (
      <p
        style={{
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
          lineHeight: "1.5",
        }}
        {...props}
      />
    ),
    a: ({ node, ...props }) => (
      <a
        style={{
          color: "#2563eb",
          textDecoration: "underline",
          cursor: "pointer",
        }}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),
    ul: ({ node, ...props }) => (
      <ul
        style={{
          listStyleType: "disc",
          paddingLeft: "1.5rem",
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
        }}
        {...props}
      />
    ),
    ol: ({ node, ...props }) => (
      <ol
        style={{
          listStyleType: "decimal",
          paddingLeft: "1.5rem",
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
        }}
        {...props}
      />
    ),
    li: ({ node, ...props }) => (
      <li style={{ marginBottom: "0.25rem" }} {...props} />
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote
        style={{
          borderLeft: "4px solid #d1d5db",
          paddingLeft: "1rem",
          fontStyle: "italic",
          color: "#4b5563",
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
        {...props}
      />
    ),
    // 👇 Fixed `code` renderer with proper typing
    code: ({ inline, className, children, ...props }: CodeProps) => {
      const language = /language-(\w+)/.exec(className || "");
      if (inline) {
        return (
          <code
            style={{
              backgroundColor: "#f3f4f6",
              padding: "0.125rem 0.25rem",
              borderRadius: "0.25rem",
              fontSize: "0.875rem",
              fontFamily: "monospace",
            }}
            {...props}
          >
            {children}
          </code>
        );
      }
      return (
        <pre
          style={{
            backgroundColor: "#111827",
            color: "#ffffff",
            fontSize: "0.875rem",
            borderRadius: "0.375rem",
            padding: "1rem",
            overflowX: "auto",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          <code className={`language-${language?.[1] || "text"}`} {...props}>
            {children}
          </code>
        </pre>
      );
    },
    hr: () => (
      <hr
        style={{
          marginTop: "1.5rem",
          marginBottom: "1.5rem",
          borderColor: "#d1d5db",
        }}
      />
    ),
    strong: ({ node, ...props }) => (
      <strong style={{ fontWeight: 600 }} {...props} />
    ),
    em: ({ node, ...props }) => (
      <em style={{ fontStyle: "italic" }} {...props} />
    ),
    del: ({ node, ...props }) => (
      <del
        style={{ textDecoration: "line-through", color: "#6b7280" }}
        {...props}
      />
    ),
    table: ({ node, ...props }) => (
      <div
        style={{
          overflowX: "auto",
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
            border: "1px solid #d1d5db",
          }}
          {...props}
        />
      </div>
    ),
    thead: ({ node, ...props }) => (
      <thead style={{ backgroundColor: "#f3f4f6" }} {...props} />
    ),
    tbody: ({ node, ...props }) => <tbody {...props} />,
    tr: ({ node, ...props }) => (
      <tr style={{ borderBottom: "1px solid #d1d5db" }} {...props} />
    ),
    th: ({ node, ...props }) => (
      <th
        style={{
          padding: "0.5rem 1rem",
          fontWeight: 600,
          border: "1px solid #d1d5db",
        }}
        {...props}
      />
    ),
    td: ({ node, ...props }) => (
      <td
        style={{ padding: "0.5rem 1rem", border: "1px solid #d1d5db" }}
        {...props}
      />
    ),
    img: ({ node, ...props }) => (
      <img
        style={{
          marginTop: "1rem",
          marginBottom: "1rem",
          maxWidth: "100%",
          borderRadius: "0.375rem",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
        }}
        alt=""
        {...props}
      />
    ),
  };

  return (
    <div>
      {tag ? (
        <div
          style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            marginBottom: "0.5rem",
          }}
        >
          {tag}
        </div>
      ) : (
        <Markdown
          remarkPlugins={[remarkMath, remarkBreaks, remarkGfm]}
          rehypePlugins={[rehypeKatex]}
          components={components}
        >
          {cleanedText}
        </Markdown>
      )}
    </div>
  );
});

MarkdownRenderer.displayName = "MarkdownRenderer";
export default MarkdownRenderer;

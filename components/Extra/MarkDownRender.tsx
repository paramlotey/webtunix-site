import React, { useMemo, useEffect } from "react";
import Markdown, { Components } from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import hljs from "highlight.js";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github-dark.css";
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

  // Initialize highlight.js
  useEffect(() => {
    hljs.highlightAll();
  }, [cleanedText]);

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
    // 🔧 Fixed code renderer with proper syntax highlighting
    code: ({ inline, className, children, ...props }: CodeProps) => {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "text";
      
      // Convert children to string safely
      const codeString = Array.isArray(children) 
        ? children.join("") 
        : String(children || "").replace(/\n$/, "");

      if (inline) {
        return (
          <code
            style={{
              backgroundColor: "#374151",
              color: "#f9fafb",
              padding: "0.125rem 0.375rem",
              borderRadius: "0.25rem",
              fontSize: "0.875rem",
              fontFamily: '"Fira Code", "Monaco", "Cascadia Code", "Roboto Mono", monospace',
              border: "1px solid #4b5563",
            }}
            {...props}
          >
            {children}
          </code>
        );
      }

      // For code blocks, use highlight.js
      let highlightedCode;
      try {
        if (language && language !== "text" && hljs.getLanguage(language)) {
          highlightedCode = hljs.highlight(codeString, { language }).value;
        } else {
          highlightedCode = hljs.highlightAuto(codeString).value;
        }
      } catch (error) {
        console.error("Syntax highlighting failed:", error);
        highlightedCode = codeString;
      }

      return (
        <div
          style={{
            position: "relative",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          {/* Language label */}
          {language && language !== "text" && (
            <div
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "0.75rem",
                fontSize: "0.75rem",
                color: "#9ca3af",
                backgroundColor: "#1f2937",
                padding: "0.25rem 0.5rem",
                borderRadius: "0.25rem",
                zIndex: 10,
              }}
            >
              {language}
            </div>
          )}
          <pre
            style={{
              backgroundColor: "#111827",
              color: "#f9fafb",
              fontSize: "0.875rem",
              lineHeight: "1.5",
              borderRadius: "0.5rem",
              padding: "1rem",
              overflowX: "auto",
              border: "1px solid #374151",
              fontFamily: '"Fira Code", "Monaco", "Cascadia Code", "Roboto Mono", monospace',
            }}
          >
            <code
              className={`hljs language-${language}`}
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
              style={{
                backgroundColor: "transparent",
                padding: "0",
                fontSize: "inherit",
                fontFamily: "inherit",
              }}
            />
          </pre>
        </div>
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
      <thead style={{ color:"#000000",
          backgroundColor:"#646464bf" }} {...props} />
    ),
    tbody: ({ node, ...props }) => <tbody {...props} />,
    tr: ({ node, ...props }) => (
      <tr className="hover:bg-gray-500" style={{ borderBottom: "1px solid #d1d5db" }} {...props} />
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
// components/QuillEditor.tsx
"use client";

import { useEffect, useRef } from "react";
import Quill from "quill";
import type QuillType from "quill";
import "quill/dist/quill.snow.css";

type QuillEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function QuillEditor({ value, onChange }: QuillEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<QuillType | null>(null);

  // Fix icon typing
  const icons = Quill.import("ui/icons") as Record<string, string>;
  icons["undo"] =
    '<svg viewBox="0 0 18 18"><polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon><path class="ql-stroke" d="m8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path></svg>';
  icons["redo"] =
    '<svg viewBox="0 0 18 18"><polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon><path class="ql-stroke" d="m9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path></svg>';

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: {
            container: [
              ["undo", "redo"],
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"],
              ["link", "image", "video", "formula"],
              [{ header: 1 }, { header: 2 }],
              [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
              [{ script: "sub" }, { script: "super" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ direction: "rtl" }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ color: [] }, { background: [] }],
              [{ font: [] }],
              [{ align: [] }],
              ["table"],
              ["clean"],
            ],
            handlers: {
              undo: () => quill.history.undo(),
              redo: () => quill.history.redo(),
            },
          },
          history: { delay: 1000, maxStack: 100, userOnly: true },
        },
      });

      quill.on("text-change", () => {
        onChange(quill.root.innerHTML);
      });

      quillRef.current = quill;
    }
  }, [onChange]);

  useEffect(() => {
    const editor = quillRef.current;
    if (editor && value) {
      const currentHTML = editor.root.innerHTML;
      if (currentHTML !== value) {
        editor.root.innerHTML = value;
      }
    }
  }, [value]);

  return <div ref={editorRef} style={{ height: "600px" }} />;
}

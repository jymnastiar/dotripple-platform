"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import UnderlineExtension from "@tiptap/extension-underline";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Underline,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TiptapProps {
  content?: string;
  onChange?: (html: string) => void;
}

const extensions = [
  StarterKit.configure({}),
  UnderlineExtension,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];

const isMac =
  typeof window !== "undefined" &&
  /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);
const modKey = isMac ? "⌘" : "Ctrl";

export default function Tiptap({ content = "", onChange }: TiptapProps) {
  const editor = useEditor({
    extensions,
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (onChange) {
        onChange(html);
      }
    },
  });

  const [activeFormats, setActiveFormats] = useState<string[]>([]);
  const [activeHeading, setActiveHeading] = useState<string | null>(null);
  const [activeList, setActiveList] = useState<string | null>(null);
  const [activeAlign, setActiveAlign] = useState("left");

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      if (editor.isActive("heading", { level: 1 })) setActiveHeading("1");
      else if (editor.isActive("heading", { level: 2 })) setActiveHeading("2");
      else if (editor.isActive("heading", { level: 3 })) setActiveHeading("3");
      else setActiveHeading(null);

      if (editor.isActive("bulletList")) setActiveList("bullet");
      else if (editor.isActive("orderedList")) setActiveList("ordered");
      else setActiveList(null);

      const formats: string[] = [];
      if (editor.isActive("bold")) formats.push("bold");
      if (editor.isActive("italic")) formats.push("italic");
      if (editor.isActive("strike")) formats.push("strike");
      if (editor.isActive("underline")) formats.push("underline");
      if (editor.isActive("codeBlock")) formats.push("code");
      setActiveFormats(formats);

      if (editor.isActive({ textAlign: "center" })) setActiveAlign("center");
      else if (editor.isActive({ textAlign: "right" })) setActiveAlign("right");
      else if (editor.isActive({ textAlign: "justify" }))
        setActiveAlign("justify");
      else setActiveAlign("left");
    };

    editor.on("selectionUpdate", handleUpdate);
    editor.on("update", handleUpdate);
    editor.on("transaction", handleUpdate);
    handleUpdate();

    return () => {
      editor.off("selectionUpdate", handleUpdate);
      editor.off("update", handleUpdate);
      editor.off("transaction", handleUpdate);
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  const toolbarBtn = (active: boolean) =>
    `inline-flex items-center justify-center h-8 w-8 rounded-md text-sm transition-colors ${
      active
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    }`;

  return (
    <TooltipProvider delayDuration={300}>
      <div className="w-full rounded-md border border-input bg-transparent dark:bg-input/30 shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 overflow-hidden">
        <div className="flex flex-wrap items-center gap-0.5 p-1.5 border-b border-input bg-muted/40">
          <ToolbarButton
            label="Heading 1"
            shortcut={`${modKey}+Alt+1`}
            active={activeHeading === "1"}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <Heading1 className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Heading 2"
            shortcut={`${modKey}+Alt+2`}
            active={activeHeading === "2"}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2 className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Heading 3"
            shortcut={`${modKey}+Alt+3`}
            active={activeHeading === "3"}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <Heading3 className="w-4 h-4" />
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            label="Bold"
            shortcut={`${modKey}+B`}
            active={activeFormats.includes("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Italic"
            shortcut={`${modKey}+I`}
            active={activeFormats.includes("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Underline"
            shortcut={`${modKey}+U`}
            active={activeFormats.includes("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <Underline className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Strikethrough"
            shortcut={`${modKey}+Shift+S`}
            active={activeFormats.includes("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Code block"
            shortcut={`${modKey}+Alt+C`}
            active={activeFormats.includes("code")}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          >
            <Code className="w-4 h-4" />
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            label="Bullet list"
            shortcut={`${modKey}+Shift+8`}
            active={activeList === "bullet"}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Numbered list"
            shortcut={`${modKey}+Shift+7`}
            active={activeList === "ordered"}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            label="Align left"
            shortcut={`${modKey}+Shift+L`}
            active={activeAlign === "left"}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            <AlignLeft className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Align center"
            shortcut={`${modKey}+Shift+E`}
            active={activeAlign === "center"}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            <AlignCenter className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Align right"
            shortcut={`${modKey}+Shift+R`}
            active={activeAlign === "right"}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          >
            <AlignRight className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            label="Justify"
            shortcut={`${modKey}+Shift+J`}
            active={activeAlign === "justify"}
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          >
            <AlignJustify className="w-4 h-4" />
          </ToolbarButton>
        </div>

        <EditorContent
          editor={editor}
          className="p-3 text-base md:text-sm min-h-[150px] w-full outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[150px] prose dark:prose-invert max-w-none"
        />
      </div>
    </TooltipProvider>
  );

  function ToolbarButton({
    label,
    shortcut,
    active,
    onClick,
    children,
  }: {
    label: string;
    shortcut?: string;
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label={label}
            aria-pressed={active}
            onClick={onClick}
            className={toolbarBtn(active)}
          >
            {children}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <span className="flex items-center gap-2">
            {label}
            {shortcut && (
              <kbd className="text-[10px] text-muted-foreground/80">
                {shortcut}
              </kbd>
            )}
          </span>
        </TooltipContent>
      </Tooltip>
    );
  }

  function Divider() {
    return <div className="w-px h-6 bg-border mx-1" />;
  }
}

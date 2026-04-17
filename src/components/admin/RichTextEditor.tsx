'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { sanitizeHTML } from '@/lib/sanitize';

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  name?: string;
}

export const RichTextEditor = ({ value, onChange, placeholder = 'Start typing...', name }: Props) => {
  const editor = useEditor({
    immediatelyRender: false, // Prevent SSR hydration mismatch
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank'
        }
      }),
      Placeholder.configure({ placeholder })
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(sanitizeHTML(html));
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px]'
      }
    }
  });

  if (!editor) return null;

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${editor.isActive('bold') ? 'bg-primary/10 text-[#1ea05f]' : 'hover:bg-gray-100'}`}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${editor.isActive('italic') ? 'bg-primary/10 text-[#1ea05f]' : 'hover:bg-gray-100'}`}
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-primary/10 text-[#1ea05f]' : 'hover:bg-gray-100'}`}
          title="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-primary/10 text-[#1ea05f]' : 'hover:bg-gray-100'}`}
          title="Numbered List"
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => {
            const url = prompt('Enter URL');
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className="p-2 rounded hover:bg-gray-100"
          title="Add Link"
        >
          🔗
        </button>
      </div>
      <EditorContent editor={editor} className="p-4" />
    </div>
  );
};

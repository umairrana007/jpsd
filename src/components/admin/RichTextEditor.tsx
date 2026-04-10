'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

export const RichTextEditor = ({ value, onChange }: { value: string; onChange: (html: string) => void }) => {
  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false })],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML())
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-lg overflow-hidden flex flex-col">
      <div className="p-2 border-b bg-gray-50 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded ${editor.isActive('bold') ? 'bg-indigo-200 text-indigo-900 border-indigo-300' : 'bg-white hover:bg-gray-100 border-gray-200'} border text-sm`}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded ${editor.isActive('italic') ? 'bg-indigo-200 text-indigo-900 border-indigo-300' : 'bg-white hover:bg-gray-100 border-gray-200'} border text-sm`}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-1 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-indigo-200 text-indigo-900 border-indigo-300' : 'bg-white hover:bg-gray-100 border-gray-200'} border text-sm`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-2 py-1 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-indigo-200 text-indigo-900 border-indigo-300' : 'bg-white hover:bg-gray-100 border-gray-200'} border text-sm`}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded ${editor.isActive('bulletList') ? 'bg-indigo-200 text-indigo-900 border-indigo-300' : 'bg-white hover:bg-gray-100 border-gray-200'} border text-sm`}
        >
          Bullet List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-1 rounded ${editor.isActive('orderedList') ? 'bg-indigo-200 text-indigo-900 border-indigo-300' : 'bg-white hover:bg-gray-100 border-gray-200'} border text-sm`}
        >
          Numbered List
        </button>
      </div>
      <EditorContent editor={editor} className="p-4 min-h-[200px] prose max-w-none focus:outline-none" />
    </div>
  );
};

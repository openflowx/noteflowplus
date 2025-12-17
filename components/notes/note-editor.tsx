"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { EditorToolbar } from './editor-toolbar'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { all, createLowlight } from 'lowlight'

const lowlight = createLowlight(all)

interface NoteEditorProps {
    content?: string;
    onChange?: (content: string) => void;
}

const NoteEditor = ({ content = '', onChange }: NoteEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2],
                },
                codeBlock: false,
            }),
            CodeBlockLowlight.configure({
                lowlight,
            }),
        ],
        content: content,
        editorProps: {
            attributes: {
                class: 'prose max-w-full focus:outline-none min-h-[300px] p-4 bg-background/50 prose-p:my-0 prose-ul:my-0 prose-ol:my-0 prose-li:my-0 prose-headings:mt-2 prose-headings:mb-1',
            },
        },
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML());
        },
        immediatelyRender: false,
    })

    if (!editor) {
        return null
    }

    return (
        <div className="flex flex-col w-full border rounded-xl overflow-hidden bg-white shadow-sm">
            <EditorToolbar editor={editor} />
            <EditorContent editor={editor} className="min-h-100 w-full p-4" />
        </div>
    )
}

export default NoteEditor

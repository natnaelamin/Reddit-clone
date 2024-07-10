"use client"
import {Editor, EditorContent, useEditor } from "@tiptap/react"
import { Button } from "./ui/button";
import StarterKit from "@tiptap/starter-kit"

export const Menubar =({editor} : {editor : Editor | null}) =>{
    if (!editor){
        return null;
    }

    return (
        <div className="flex flex-wrap gap-5 mt-5">
            <Button type="button"
             onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
            variant={editor.isActive("heading", {level: 1}) ? "default" : "secondary"} 
            >H1</Button>

            <Button type="button"
             onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
            variant={editor.isActive("heading", {level: 2}) ? "default" : "secondary"} 
            >H2</Button>

            <Button type="button"
             onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
            variant={editor.isActive("heading", {level: 3}) ? "default" : "secondary"} 
            >H3</Button>

            <Button type="button"
             onClick={() => editor.chain().focus().toggleBold().run()}
            variant={editor.isActive("bold") ? "default" : "secondary"} 
            >Bold</Button>

            <Button type="button"
             onClick={() => editor.chain().focus().toggleItalic().run()}
            variant={editor.isActive("italic") ? "default" : "secondary"} 
            >Italic</Button>

            <Button type="button"
             onClick={() => editor.chain().focus().toggleStrike().run()}
            variant={editor.isActive("strike") ? "default" : "secondary"} 
            >Strike</Button>
        </div>
    )
};

export function TipTapEditor(){
    const editor = useEditor({
        extensions:[StarterKit],
        content: "<p>Hello world</p>",
        editorProps:{
            attributes:{
                class: 'prose'
            }
        }
    });

    return(
        <div>
            <Menubar editor = {editor} />
            <EditorContent editor = {editor} className="rounded-lg border mt-2 min-h-[150px] p-2"/>
        </div>
    )
}
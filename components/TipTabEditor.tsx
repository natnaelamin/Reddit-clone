"use client"
import {Editor, EditorContent, useEditor } from "@tiptap/react"
import { Button } from "./ui/button";
import StarterKit from "@tiptap/starter-kit"

export const Menubar =({editor} : {editor : Editor | null}) =>{
    if (!editor){
        return null;
    }

    return (
        <div className="flex flex-wrap gap-5">
            <Button type="button">hello</Button>
        </div>
    )
};

export function TipTapEditor(){
    const editor = useEditor({
        extensions:[StarterKit],
        content: "<p>Hello world</p>"
    });

    return(
        <div>
            <Menubar editor = {editor} />
            <EditorContent editor = {editor} />
        </div>
    )
}
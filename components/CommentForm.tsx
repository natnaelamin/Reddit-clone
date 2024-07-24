"use client"
import { CreateComment } from "@/app/Actions";
import { SubmitButton } from "./submitButton"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { useRef } from "react";

interface iAppProps{
    postId: string;
}


function CommentForm({postId}: iAppProps) {
  const ref = useRef<HTMLFormElement>(null)

  return (
    <form action={async (formData) =>{
      await CreateComment(formData);
      ref.current?.reset();
      } } ref={ref} 
      className="mt-5">
        <input type="hidden" name="postId" value={postId} />
        <Label>Comment right here</Label>
        <Textarea
        placeholder="What are your thoughts?"
        name="Comment"
        className="mt-1 mb-2 w-full"
        />
        <SubmitButton text="Comment"/>
    </form>
  )
}

export default CommentForm

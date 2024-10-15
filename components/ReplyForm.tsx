"use client"
import React, { useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import { ReplyButton, SubmitButton } from "./submitButton"; // Assuming you have a submit button
import { CreateReply } from "@/app/Actions";
import { Button } from "./ui/button";

interface ReplyFormProps {
  commentId?: string;  
  parentId?: string;   
  mentionedUserId?: string;
  MentionedUser?: string;
  postId: string;     
  toggleReplyForm: (commentId: string) => void;
}

function ReplyForm({ commentId, parentId, mentionedUserId, postId, MentionedUser, toggleReplyForm }: ReplyFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
    const [inputValue, setInputValue] = useState("");

    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) =>{
      setInputValue(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formRef.current) {
        const formData = new FormData(formRef.current);
        await CreateReply(formData);
        formRef.current.reset();  
    }

    if (commentId !== undefined) {
        toggleReplyForm(commentId);  
    }
      
};
  return (
    <form onSubmit={handleSubmit}  ref={formRef} 
    className="mt-5">
      {commentId && <input type="hidden" name="commentId" value={commentId} />}
      {parentId && <input type="hidden" name="parentId" value={parentId} />}
      {mentionedUserId && <input type="hidden" name="mentionedUserId" value={mentionedUserId} />}
      {MentionedUser && <input type="hidden" name="MentionedUser" value={MentionedUser} />}
      <input type="hidden" name="postId" value={postId} />
      
      <Textarea placeholder="What are your thoughts?" onChange={handleInput} name="reply" className="mt-1 mb-2 w-full" />
      <div className="flex justify-end mt-2">
        <ReplyButton inputValue={inputValue}/>
      </div>
    </form>
  );
}

export default ReplyForm;
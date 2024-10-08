import React, { useRef } from "react";
import { Textarea } from "./ui/textarea";
import { ReplyButton, SubmitButton } from "./submitButton"; // Assuming you have a submit button
import { CreateReply } from "@/app/Actions";

interface ReplyFormProps {
  commentId?: string;  // If replying to a comment
  parentId?: string;   // If replying to a reply
  mentionedUserId?: string; // If mentioning a user
  MentionedUser?: string;
  postId: string;      // The post ID for context
}

function ReplyForm({ commentId, parentId, mentionedUserId, postId, MentionedUser }: ReplyFormProps) {
    const ref = useRef<HTMLFormElement>(null)
  return (
    <form action={async (formData) => {
        await CreateReply(formData);
        ref?.current?.reset();
    } } ref = {ref} 
    className="mt-5">
      {commentId && <input type="hidden" name="commentId" value={commentId} />}
      {parentId && <input type="hidden" name="parentId" value={parentId} />}
      {mentionedUserId && <input type="hidden" name="mentionedUserId" value={mentionedUserId} />}
      {MentionedUser && <input type="hidden" name="MentionedUser" value={MentionedUser} />}
      <input type="hidden" name="postId" value={postId} />
      
      <Textarea placeholder="What are your thoughts?" name="reply" className="mt-1 mb-2 w-full" />
      <ReplyButton />
    </form>
  );
}

export default ReplyForm;

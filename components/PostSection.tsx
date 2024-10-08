"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import ReplyForm from "./ReplyForm";
import { Reply } from "lucide-react";

interface iAppProps {
  postId: string;
  data: any; // Replace with actual data type if available
}

function PostSection({ data, postId }: iAppProps) {
  const [replyFormVisible, setReplyFormVisible] = useState<string | null>(null); // Keeps track of the visible form

  // Function to toggle form visibility
  const toggleReplyForm = (commentId: string) => {
    if (replyFormVisible === commentId) {
      setReplyFormVisible(null); // Hide form if already visible
    } else {
      setReplyFormVisible(commentId); // Show form
    }
  };

  return (
    <section className="flex flex-col gap-y-7">
      {data.Comment.map((item: any) => (
        <div key={item.id} className="flex flex-col p-3  border-b">
          <div className="flex items-center gap-x-3 ">
            <img
              src={
                item.User?.imageUrl
                  ? item.User.imageUrl
                  : "https://t3.ftcdn.net/jpg/05/87/76/66/360_F_587766653_PkBNyGx7mQh9l1XXPtCAq1lBgOsLl6xH.jpg"
              }
              className="w-7 h-7 rounded-full"
              alt="avatar of user"
            />
            <h3 className="text-sm font-semibold">{item.User?.userName}</h3>
          </div>

          <p className="ml-10 text-secondary-foreground text-sm tracking-wide">{item.text}</p>

          <div className="text-right">
            <Button className="h-6 bg-neutral-950" onClick={() => toggleReplyForm(item.id)}><Reply className="h-4 w-5 mr-1 "/>reply</Button>
          </div>

          {replyFormVisible === item.id && (
            <ReplyForm  commentId={item.id} postId={postId} mentionedUserId={item.User?.id} MentionedUser={item.User?.userName}/>
          )}

          {/* Render replies if there are any */}
          {item.replies?.map((reply: any) => (
            <div key={reply.id} className="ml-10 border-l-2 pl-2 mt-2">
              <div className="flex items-center gap-x-3 ">
                <img
                  src={
                    reply.User?.imageUrl
                      ? reply.User.imageUrl
                      : "https://t3.ftcdn.net/jpg/05/87/76/66/360_F_587766653_PkBNyGx7mQh9l1XXPtCAq1lBgOsLl6xH.jpg"
                  }
                  className="w-7 h-7 rounded-full"
                  alt="avatar of user"
                />
                <h3 className="text-sm font-semibold">{reply.User?.userName}</h3>
              </div>
              <p className="ml-10 text-secondary-foreground text-sm tracking-wide">{reply.text}</p>
              <div className="text-right">
                <Button className="h-6 bg-neutral-950" onClick={() => toggleReplyForm(reply.id)}><Reply className="h-4 w-5 mr-1 "/>reply</Button>
              </div>

              {replyFormVisible === reply.id && (
                <ReplyForm  parentId={reply.id} postId={postId} mentionedUserId={reply.User?.id} MentionedUser={reply.User?.userName}/>
              )}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}

export default PostSection;

"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import ReplyForm from "./ReplyForm";
import { Reply } from "lucide-react";
import { handleCommentVote, handleVote } from "@/app/Actions";
import { DownVote, UpVote } from "./submitButton";

interface iAppProps {
  postId: string;
  data: any; 
}

function PostSection({ data, postId }: iAppProps) {
  const [replyFormVisible, setReplyFormVisible] = useState<string | null>(null);

  const toggleReplyForm = (commentId: string) => {
    if (replyFormVisible === commentId) {
      setReplyFormVisible(null); // Hide form if already visible
    } else {
      setReplyFormVisible(commentId); // Show form
    }
  }; 

  const renderReplies = (replies: any[]) => {
    return replies.map((reply: any) => (
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
          <Button className="h-6 border-none" variant="outline" onClick={() => toggleReplyForm(reply.id)}><Reply className="h-4 w-5 mr-1 "/>reply</Button>
        </div>

        {replyFormVisible === reply.id && (
          <ReplyForm toggleReplyForm={toggleReplyForm} parentId={reply.id} postId={postId} mentionedUserId={reply.User?.id} MentionedUser={reply.User?.userName}/>
        )}

        {/* Recursively render nested replies */}
        {reply.Replies && renderReplies(reply.Replies)}
      </div>
    ));
  };

  return (
    <section className="flex flex-col gap-y-7">
      {data.Comment.map((item: any) => (
        <div key={item.id} className="flex flex-col p-0 sm:p-3  border-l-2">
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

          <div className="justify-end flex gap-x-3 items-center">
                <div className="flex items-center gap-x-2 p-2">
                    <form action={handleCommentVote}>
                        <input type="hidden" name="voteDirection" value="UP" />
                        <input type="hidden" name="commentId" value={item.id} />
                        <UpVote />
                    </form>
                    {item?.CommentVote.reduce((acc: number, vote: any)=>{
                    if(vote.voteType === "UP") return acc + 1;
                    if(vote.voteType === "DOWN") return acc - 1;
                    return acc;
                    }, 0)}
                    <form action={handleCommentVote}>
                        <input type="hidden" name="voteDirection" value="DOWN" />
                        <input type="hidden" name="commentId" value={item.id} />
                        <DownVote />
                    </form>
                </div>
            {replyFormVisible !== item.id ? <Button className="h-6 border-none" variant="outline" onClick={() => toggleReplyForm(item.id)}><Reply className="h-4 w-5 mr-1 "/>reply</Button>
            : <Button className="h-6 bg-red-700" onClick={() => toggleReplyForm(item.id)}>cancel</Button> } 
          </div>

          {replyFormVisible === item.id &&  (
              <ReplyForm toggleReplyForm={toggleReplyForm} commentId={item.id} postId={postId} mentionedUserId={item.User?.id} MentionedUser={item.User?.userName}/> 
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
                <Button className="h-6 border-none" variant="outline" onClick={() => toggleReplyForm(reply.id)}><Reply className="h-4 w-5 mr-1 "/>reply</Button>
              </div>

              {replyFormVisible === reply.id && (
                <ReplyForm toggleReplyForm={toggleReplyForm} parentId={reply.id} postId={postId} mentionedUserId={reply.User?.id} MentionedUser={reply.User?.userName}/>
              )}

              {/* Recursively render nested replies */}
              {reply.Replies && renderReplies(reply.Replies)}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}

export default PostSection;
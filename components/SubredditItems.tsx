"use client";

import { useState } from "react";
import PaginationSec from "./PaginationSec";
import { PostCard } from "./PostCard";


function SubredditItems({data}: {data: any}) {

const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage, setPostsPerPage] = useState(5);

const postsArray = Array.isArray(data.posts) ? data.posts : [];

const lastPostIndex = currentPage * postsPerPage;
const firstPostIndex = lastPostIndex - postsPerPage;
const currentPosts = postsArray.slice(firstPostIndex, lastPostIndex);
  return (
    <>
        {currentPosts.map((post : any) =>(
        <PostCard 
        key={post.id}
        id={post.id}
        imageString={post.imageString}
        subName={data.name}
        title={post.title}
        commentAmount={post.Comment.length}
        userName={post.User?.userName as string}
        jsonContent={post.textContent}
        voteCount= {post.Vote.reduce((acc : any, vote : any)=>{
            if(vote.voteType === "UP") return acc + 1;
            if(vote.voteType === "DOWN") return acc - 1;

            return acc;
        }, 0)}
        />
        ))}

        <PaginationSec totalPosts={postsArray.length}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}/>
    </>
  )
}

export default SubredditItems

"use client";

import { useState } from "react";
import { PostCard } from "./PostCard";
import PaginationSec from "@/components/PaginationSec"


export default function ShowItems({data}: {data: any}){
   
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage, setPostsPerPage] = useState(5);

const lastPostIndex = currentPage * postsPerPage;
const firstPostIndex = lastPostIndex - postsPerPage;
const currentPosts = data.slice(firstPostIndex, lastPostIndex);
    
    return(
      <>
          {currentPosts.map((post : any) =>(
            <PostCard key={post.id} 
            title={post.title} 
            id={post.id} 
            jsonContent={post.textContent} 
            subName={post.subName as string} 
            userName={post.User?.userName as string} 
            imageString={post.imageString}
            commentAmount={post.Comment.length}
            voteCount= {post.Vote.reduce((acc: any, vote: any)=>{
              if(vote.voteType === "UP") return acc + 1;
              if(vote.voteType === "DOWN") return acc - 1;
  
              return acc;
            }, 0)}
          />
          ))}
  
  
          <PaginationSec 
            totalPosts={data.length}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}/>
      </>
    )
  }
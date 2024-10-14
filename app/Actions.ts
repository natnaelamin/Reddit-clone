"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { Prisma, TypeOfVote } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {JSONContent} from "@tiptap/react"
import { use } from "react";
import { revalidatePath } from "next/cache";

export async function updateUsername(prevState: any, formData: FormData){
    const {getUser} = getKindeServerSession();
    const user = await getUser()

    if (!user){
        redirect("/api/auth/login")
    }

    const username = formData.get("username") as string;

    try {
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data:{
                userName: username,
            }
        });
    
        return{
            message: "successfuly updated username!",
            status: "green",
        }
    } catch (e){
        if (e instanceof Prisma.PrismaClientKnownRequestError){
            if (e.code === "P2002"){
                return{
                    message: "this username already used", 
                    status: "error" 
                };
            }
        }
        throw e;
    }
}


export async function createCommunity(prevState: any, formData: FormData){
    const {getUser} = getKindeServerSession();
    const user = await getUser()

    if (!user){
        redirect("/api/auth/login")
    }
    
    try{
        const name = formData.get("name") as string;

        const data = await prisma.subreddit.create({
            data: {
                name,
                userId: user.id
            },
        });
        return redirect(`/r/${data.name}`)
    } catch(e){
        if(e instanceof PrismaClientKnownRequestError){
            if(e.code === "P2002"){
                return{
                    message: "This name is already used.",
                    status: "error"
                };
            }
        } throw e;
    }
}


export async function UpdateSubDescription(prevState: any, formData: FormData){
    const {getUser} = getKindeServerSession();
    const user = await getUser()

    if (!user){
        redirect("/api/auth/login")
    }

    try{
        const subName = formData.get("subname") as string;
    const description = formData.get("description") as string;

    await prisma.subreddit.update({
        where:{
            name: subName,
        },
        data:{
            description: description,
        },
    });

    return{
        status: "green",
        message: "Successfully updated the description!"
    }
    } catch(e){
        return{
            status: "error",
            message: "Sorry something went wrong"
        }
    }
}

export async function createPost({jsonContent}:{jsonContent:JSONContent | null},
    formData: FormData){
    const {getUser} = getKindeServerSession();
    const user = await getUser()

    if (!user){
        redirect("/api/auth/login")
    }

    const title = formData.get("title") as string;
    const imageUrl = formData.get("imageUrl") as string | null;
    const subName = formData.get("subName") as string;

    const data = await prisma.post.create({
        data:{
            title: title,
            imageString: imageUrl ?? undefined,
            subName: subName,
            userId: user.id,
            textContent: jsonContent ?? undefined,
        },
    });

    return redirect(`/post/${data.id}`)
}


export async function handleVote(formData: FormData){
    const {getUser} = getKindeServerSession();
    const user = await getUser()

    if (!user){
        redirect("/api/auth/login")
    }

    const postId = formData.get("postId") as string;
    const voteDirection = formData.get("voteDirection") as TypeOfVote;

    const vote = await prisma.vote.findFirst({
        where:{
            postId: postId,
            userId: user.id,
        },
    });

    if(vote){
        if(vote.voteType === voteDirection){
            await prisma.vote.delete({
                where:{
                    id: vote.id,
                },
            });
            return revalidatePath("/")
        } else {
            await prisma.vote.update({
                where:{
                    id: vote.id,
                },
                data:{
                    voteType: voteDirection,
                },
            });
            return revalidatePath("/")
        }
    }

    await prisma.vote.create({
        data:{
            voteType: voteDirection,
            userId: user.id,
            postId: postId,
        },
    });
    return revalidatePath("/")
}



export async function handleCommentVote(formData: FormData){
    const {getUser} = getKindeServerSession();
    const user = await getUser()

    if (!user){
        redirect("/api/auth/login")
    }

    const commentId = formData.get("commentId") as string;
    
    const voteDirection = formData.get("voteDirection") as TypeOfVote;

    const vote = await prisma.commentVote.findFirst({
        where:{
            commentId: commentId,
            userId: user.id,
        },
    });

    if(vote){
        if(vote.voteType === voteDirection){
            await prisma.commentVote.delete({
                where:{
                    id: vote.id,
                },
            });
            return revalidatePath("/")
        } else {
            await prisma.commentVote.update({
                where:{
                    id: vote.id,
                },
                data:{
                    voteType: voteDirection,
                },
            });
            return revalidatePath("/")
        }
    }

    await prisma.commentVote.create({
        data:{
            voteType: voteDirection,
            userId: user.id,
            commentId: commentId,
        },
    });
    return revalidatePath("/")
}



export async function CreateComment(formData: FormData){
    const {getUser} = getKindeServerSession();
    const user = await getUser()

    if (!user){
        redirect("/api/auth/login")
    }

    const comment = formData.get("Comment") as string;
    const postId = formData.get("postId") as string;

    const data = await prisma.comment.create({
        data:{
            text: comment,
            userId: user.id,
            postId: postId,
        },
    });

    revalidatePath(`/post/${postId}`)
}

export async function CreateReply(formData: FormData){
    const {getUser} = getKindeServerSession();
    const user = await getUser()

    if (!user){
        redirect("/api/auth/login")
    }

    const replyText = formData.get("reply") as string; // The reply text
    const commentId = formData.get("commentId") as string | null; // If replying to a comment
    const parentId = formData.get("parentId") as string | null; // If replying to another reply
    const mentionedUserId = formData.get("mentionedUserId") as string | null;
    const MentionedUser = formData.get("MentionedUser") as string | null ;
    const postId = formData.get("postId") as string;

    const reply = await prisma.reply.create({
        data: {
            text: replyText,
            userId: user.id,
            commentId: commentId ? commentId : null, // Populated if it's a reply to a comment
            parentId: parentId ? parentId : null, // Populated if it's a reply to another reply
            mentionedUserId: mentionedUserId ? mentionedUserId : null, // Populated if a user is mentioned
            
        },
    });

    revalidatePath(`/post/${postId}`)
}
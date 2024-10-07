import { handleVote } from "@/app/Actions";
import prisma from "@/app/lib/db"
import CommentForm from "@/components/CommentForm";
import CopyLink from "@/components/CopyLink";
import RenderToJson from "@/components/RendertoJson";
import { DownVote, UpVote } from "@/components/submitButton";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Cake, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {unstable_noStore as noStore} from "next/cache";
import ReplyForm from "@/components/ReplyForm";
import PostSection from "@/components/PostSection";



async function getData(id: string){
    const data= await prisma.post.findUnique({
        where:{
            id: id,
        }, select:{
            createdAt: true,
            title: true,
            id: true,
            imageString: true,
            textContent: true,
            subName: true,
            Vote: {
                select:{
                    voteType: true,
                },
            },
            Comment:{
                select:{
                    id: true,
                    text: true,
                    User:{
                        select:{
                            imageUrl: true,
                            userName: true,
                        }
                    },
                    replies:{
                        select:{
                            id: true,
                            text: true,
                            User:{
                                select:{
                                    imageUrl: true,
                                    userName: true,
                                }
                            },
                            mentionedUserId: true,
                            MentionedUser: {
                                select:{
                                    userName: true,
                                }
                            },
                            parentId: true,
                        }
                    }
                }
            },
            Subreddit:{
                select:{
                    name: true,
                    createdAt: true,
                    description: true,
                },
            },
            User: {
                select:{
                    userName: true,
                }
            }
        }

    })

    if(!data){
        return notFound()
    };

    return data;
}

async function PostPage({params}: {params: {id: string}}) {
    const data = await getData(params.id)
  return (
    <div className="max-w-[1200px] mx-auto grid md:flex gap-x-10 mt-4 mb-10">
      <div className="md:w-[70%] w-full flex flex-col gap-y-5 md:order-1 order-2">
        <Card className="flex p-2">
            <div className="flex flex-col items-center gap-y-2 p-2">
                <form action={handleVote}>
                    <input type="hidden" name="voteDirection" value="UP" />
                    <input type="hidden" name="postId" value={data.id} />
                    <UpVote />
                </form>
                {data.Vote.reduce((acc, vote)=>{
                if(vote.voteType === "UP") return acc + 1;
                if(vote.voteType === "DOWN") return acc - 1;
    
                return acc;
                }, 0)}
                <form action={handleVote}>
                    <input type="hidden" name="voteDirection" value="DOWN" />
                    <input type="hidden" name="postId" value={data.id} />
                    <DownVote />
                </form>
            </div>

            <div className="p-2 w-full">
                <p className="text-sm text-muted-foreground">
                    Posted by u/{data.User?.userName}
                </p>

                <h1 className="font-medium mt-1 text-lg">{data.title}</h1>

                {data.imageString && (
                    <Image
                    src={data.imageString}
                    alt="user image"
                    height={400}
                    width={500}
                    className="w-full h-auto object-contain mt-2"
                    />
                )}

                {data.textContent && <RenderToJson data={data.textContent}/>}

                <div className="m-3 flex items-center gap-x-5">
                <div className="flex items-center gap-x-1">
                    <MessageCircle className="h-4 w-4 text-muted-foreground"/>
                    <p className="text-muted-foreground font-medium text-xs">{data.Comment.length} comments</p>
                </div>

                <CopyLink id={params.id}/>
            </div>

            <CommentForm postId={params.id}/>

            <Separator className="my-5"/>

            <PostSection data = {data} postId={params.id}/>
            </div> 
        </Card>
      </div>
      <div className="md:w-[30%] w-full md:order-2 order-1">
        <Card>
            <CardHeader className='bg-muted p-4 font-semibold'>
                About Community
            </CardHeader>
            <div className='p-4'>
                <div className='flex items-center gap-x-3'>
                    <Image
                    src={`https://avatar.vercel.sh/${data?.subName}`}
                    alt='image of subreddit'
                    width={60}
                    height={60}
                    className='rounded-full h-16 w-16'
                    />
                    <Link href={`/r/${data?.subName}`} className='font-medium'>{data?.subName}</Link>
                </div>
                    <p className='text-sm font-normal text-secondary-foreground mt-2'>
                    {data?.Subreddit?.description}
                </p>
                
                <div className='flex items-center gap-x-2 mt-4'>
                    <Cake className='h-5 w-5 text-muted-foreground'/>
                    <p className='font-medium text-muted-foreground'>
                        Created:{" "}
                        {new Date(data?.createdAt as Date).toLocaleDateString("en-us", {
                            weekday: "long",
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                        })}
                    </p>
                </div>
                <Separator className='my-5'/>
                <Button className='w-full rounded-full' asChild>
                    <Link href={`/r/${data?.subName}/create`}>
                    Create Post 
                    </Link>
                </Button>
            </div>
        </Card>
      </div>
    </div>
  )
}

export default PostPage

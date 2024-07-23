import { UpdateSubDescription } from '@/app/Actions'
import prisma from '@/app/lib/db'
import CreatePostCard from '@/components/CreatePostCard'
import Pagination from '@/components/Pagination'
import { PostCard } from '@/components/PostCard'
import SubDescriptionForm from '@/components/subDescriptionForm'
import { SaveButton } from '@/components/submitButton'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Cake, Key } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

async function getData(name: string, searchParam: string){

    const [count, data] = await prisma.$transaction([
        prisma.post.count({
            where:{
                subName: name
            },
        }),

        prisma.subreddit.findUnique({
            where:{
                name: name, 
            },
            select:{
                name: true,
                createdAt: true,
                description: true,
                userId: true,
                posts:{
                    take: 5,
                    skip: searchParam ?  (Number(searchParam)- 1) * 5 : 0,
                    select:{
                        title: true,
                        imageString: true,
                        id: true,
                        textContent: true,
                        Comment:{
                            select:{
                                id: true,
                            },
                        },
                        Vote: {
                            select:{
                                userId: true,
                                voteType: true,
                            }
                        },
                        User:{ select:{
                            userName: true,
                        }}
                    }
                },
                
            },
        })
    ])

    return {data, count};
}

async function SubRedditRoute({params, searchParams}:{params:{id:string}; searchParams:{page: string}}) {
    const {count, data} = await getData(params.id, searchParams.page);
    const {getUser} = getKindeServerSession()
    const user = await getUser()

  return (
    <div className='max-w-[1000px] mx-auto flex gap-x-10 mt-4'>
      <div className='w-[65%] flex flex-col gap-y-5'>
        <CreatePostCard/>

        {data?.posts.length === 0 ? (
            <p>no posts yet</p>
        ):(
            <>
                {data?.posts.map((post) =>(
                <PostCard 
                key={post.id}
                id={post.id}
                imageString={post.imageString}
                subName={data.name}
                title={post.title}
                commentAmount={post.Comment.length}
                userName={post.User?.userName as string}
                jsonContent={post.textContent}
                voteCount= {post.Vote.reduce((acc, vote)=>{
                    if(vote.voteType === "UP") return acc + 1;
                    if(vote.voteType === "DOWN") return acc - 1;
        
                    return acc;
                }, 0)}
                />
                ))} 

                <Pagination totalPages={Math.ceil(count / 5)}/>
            </>
        )}
      </div>
      <div className='w-[35%]'>
        <Card>
            <CardHeader className='bg-muted p-4 font-semibold'>
                About Community
            </CardHeader>
            <div className='p-4'>
                <div className='flex items-center gap-x-3'>
                    <Image
                    src={`https://avatar.vercel.sh/${data?.name}`}
                    alt='image of subreddit'
                    width={60}
                    height={60}
                    className='rounded-full h-16 w-16'
                    />
                    <Link href={`/r/${data?.name}`} className='font-medium'>{data?.name}</Link>
                </div>
                {user?.id === data?.userId ? (
                  <SubDescriptionForm subName={params.id} description={data?.description}/>  
                ): (
                    <p className='text-sm font-normal text-secondary-foreground mt-2'>
                    {data?.description}
                </p>
                )}
                
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
                    <Link href={user?.id ? `/r/${data?.name}/create` : "/api/auth/login"}>
                    Create Post 
                    </Link>
                </Button>
            </div>
        </Card>
      </div>
    </div>
  )
}

export default SubRedditRoute

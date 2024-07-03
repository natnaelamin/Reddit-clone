import { UpdateSubDescription } from '@/app/Actions'
import prisma from '@/app/lib/db'
import { SaveButton } from '@/components/submitButton'
import { Card, CardHeader } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

async function getData(name: string){
    const data = await prisma.subreddit.findUnique({
        where:{
            name: name, 
        },
        select:{
            name: true,
            createdAt: true,
            description: true,
            userId: true,
        },
    });

    return data;
}

async function SubRedditRoute({params}:{params:{id:string}}) {
    const data = await getData(params.id)
    const {getUser} = getKindeServerSession()
    const user = await getUser()

  return (
    <div className='max-w-[1000px] mx-auto flex gap-x-10 mt-4'>
      <div className='w-[65%] flex flex-col gap-y-5'>
        <h1>hello from the post section</h1>
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
                    <form className='mt-3' action={UpdateSubDescription}>
                        <input type='hidden' name='subName' value={params.id}/>
                        <Textarea
                        placeholder='Create your custom description for your subreddit'
                        maxLength={100}
                        name='description'
                        defaultValue={data?.description ?? undefined}
                        />
                        <SaveButton />
                    </form>
                ): (
                    <p className='text-sm font-normal text-secondary-foreground mt-2'>
                    {data?.description}
                </p>
                )}
                
            </div>
        </Card>
      </div>
    </div>
  )
}

export default SubRedditRoute

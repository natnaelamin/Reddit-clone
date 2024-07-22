import prisma from "@/app/lib/db"
import { notFound } from "next/navigation";


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
    <div>
      <h1>hell from the post</h1>
    </div>
  )
}

export default PostPage

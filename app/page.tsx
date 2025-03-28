import { Card } from "@/components/ui/card";
import Image from "next/image";
import Banner from "../public/banner.png"
import helloImage from "../public/hero-image.png"
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreatePostCard from "@/components/CreatePostCard";
import prisma from "./lib/db";
import { Suspense } from "react";
import SuspenseCard from "@/components/SuspenseCard";
import ShowItems from "@/components/ShowItems";


async function getData(){
  
    const data = await prisma.post.findMany({
      select:{
        title: true,
        createdAt: true,
        textContent: true,
        id: true,
        imageString: true,
        Comment:{
          select:{
            id: true
          },
        },
        User: {
          select:{
            userName: true,
          }
        },
        subName: true,
        Vote:{
          select:{
            userId: true,
            voteType: true,
            postId: true,
          }
        }
      },
      orderBy:{
        createdAt: "desc"
      }
    })

  return data;
}

export  default async function Home() {
  const  data = await getData();

  return (
    <div className="max-w-[1000px] mx-auto mt-4 grid md:flex gap-x-10 mb-10">
      <div className="md:w-[65%] flex flex-col gap-y-5 md:order-1 order-2 px-1 md:px-0">
        <CreatePostCard/>
        <Suspense fallback={<SuspenseCard />} >
          <ShowItems data = {data}/>
        </Suspense>
      </div>
      <div className="md:w-[35%] order-1 md:order-2">
        <Card>
          <Image src={Banner} alt="banner"/>
          <div className="p-2">
            <div className="flex items-center">
              <Image
              src={helloImage}
              alt="Hello Image"
              className="w-10 h-16 -mt-6"
              />
              <h1 className="font-medium pl-3">Home</h1>
            </div>
            <p className="text-sm text-muted-foreground p-2">
              Your Home Reddit frontpage. Come here to check in with your favorite communities!
            </p>
            <Separator className="my-5"/>
            <div className="flex flex-col gap-y-5">
              <Button asChild variant="secondary">
                <Link href="/r/wakanda/create">Create Post</Link>
              </Button>
              <Button asChild>
                <Link href="/r/create">Create Community</Link>
                </Button>
            </div>
          </div>
        </Card>
      </div>
      
    </div>
  );
}





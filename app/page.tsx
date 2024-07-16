import { Card } from "@/components/ui/card";
import Image from "next/image";
import Banner from "../public/banner.png"
import helloImage from "../public/hero-image.png"
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreatePostCard from "@/components/CreatePostCard";



export default function Home() {


  return (
    <div className="max-w-[1000px] mx-auto mt-4 flex gap-x-10">
      <div className="w-[65%] flex flex-col gap-y-5">
        <CreatePostCard/>
      </div>
      <div className="w-[35%]">
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

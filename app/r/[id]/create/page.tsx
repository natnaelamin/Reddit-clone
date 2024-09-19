"use client"

import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import Image from "next/image"
import pfp from "../../../../public/pfp.png"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Text, Video } from "lucide-react"
import { TabsContent } from "@radix-ui/react-tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TipTapEditor } from "@/components/TipTapEditor"
import { SubmitButton } from "@/components/submitButton"
import { UploadDropzone } from "@/components/uploadthing"
import { useState } from "react"
import { createPost } from "@/app/Actions"
import {JSONContent} from "@tiptap/react"

const rules = [
    {
        id : 1,
        text : "Behave like you would in real life"
    },
    {
        id : 2,
        text : "Look for the original source of content"
    },
    {
        id : 3,
        text : "Search for duplication before posting"
    },
    {
        id : 4,
        text : "Follow the community guidelines"
    }
]


function CreatePostRoute({params}:{params:{id: string}}) {

    const [imageUrl, setImageUrl] = useState<null | string>(null);
    const [json, setJson] = useState<null | JSONContent>(null);
    const [title, setTitle] = useState<null | string>(null);

    const createPostReddit = createPost.bind(null, {jsonContent: json})
  return (
    <div className="max-w-[1000px] mx-auto grid place-items-center px-1 md:px-0 pb-5 gap-y-5  md:flex md:gap-x-10 mt-4">
      <div className="md:w-[65%] w-fit flex flex-col gap-y-5 ">
        <h1>
            Subreddit:{" "}
            <Link href={`/r/${params.id}`} className="text-primary">
            r/{params.id}</Link>
        </h1>
        <Tabs defaultValue="post" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="post"><Text className="h-4 w-4 mr-2"/> Post</TabsTrigger>
            <TabsTrigger value="image"> <Video className="h-4 w-4 mr-2"/>Image & Video</TabsTrigger>
        </TabsList>
        <TabsContent value="post">
            <Card>
                <form action={createPostReddit}>
                    <Input type="hidden" name="imageUrl" value={imageUrl ?? undefined} />
                    <Input type="hidden" name="subName" value={params.id}/>
                    <CardHeader>
                        <Label>Title</Label>
                        <Input required name="title" 
                            placeholder="Title" value={title ?? ""} 
                            onChange={(e)=> setTitle(e.target.value)}/>
                        <TipTapEditor json={json} setJson={setJson} />
                    </CardHeader>
                    <CardFooter>
                        <SubmitButton text="Create Post" /> 
                    </CardFooter>
                </form>
            </Card>
        </TabsContent>
        <TabsContent value="image">
            <Card>
                <CardHeader>
                    {imageUrl === null ?
                    <UploadDropzone 
                    className="ut-button:bg-primary ut-button:ut-readying:bg-primary/50 ut-label:text-primary 
                    ut-button:ut-uploading:bg-primary/50 ut-button:ut-uploading:after:bg-primary" 
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        console.log("Files: ", res);
                        setImageUrl(res[0].url)
                      }}
                      onUploadError={(error: Error)=>{
                        alert("Error");
                      }}
                      /> :
                      <Image src={imageUrl} alt="uploaded image" height={400} width={500}
                      className="h-80 rounded-lg w-full object-contain"/>
                      }
                </CardHeader>
            </Card>
        </TabsContent>
        </Tabs>
      </div>
      <div className="md:w-[35%] w-fit flex justify-center items-center ">
        <Card className="flex flex-col p-4">
            <div className="flex items-center gap-x-2">
                <Image className="h-10 w-10" src={pfp} alt="pfp"/>
                <h1 className="font-medium">Posting to reddit</h1>
            </div>
            <Separator className="mt-2"/>

            <div className="flex flex-col gap-y-5 mt-5">
                {rules.map((rule) =>(
                    <div key={rule.id}>
                        <p className="font-medium text-sm">
                            {rule.id}. {rule.text}
                        </p>
                        <Separator className="mt-2"/>
                    </div>
                ))}
            </div>
        </Card>
      </div>
    </div>
  )
}

export default CreatePostRoute

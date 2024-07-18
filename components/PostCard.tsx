import { ArrowDown, ArrowUp, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import CopyLink from "./CopyLink";
import { handleVote } from "@/app/Actions";
import { DownVote, UpVote } from "./submitButton";

interface iAppProps {
    title: string;
    jsonContent: any;
    id: string;
    subName: string;
    userName: string;
    imageString: string | null;
    voteCount: number;
}

export function PostCard({title, id, jsonContent, subName, userName, imageString, voteCount}: iAppProps){
return(
    <Card className="flex relative overflow-hidden">
        <div className="flex flex-col items-center gap-y-5 bg-muted p-2">
            <form action={handleVote}>
                <input type="hidden" name="voteDirection" value="UP" />
                <input type="hidden" name="postId" value={id} />
                <UpVote/>
            </form>
            {voteCount}
            <form action={handleVote}>
                <input type="hidden" name="voteDirection" value="DOWN" />
                <input type="hidden" name="postId" value={id} />
                <DownVote/>
            </form>
        </div>

        <div>
            <div className="flex gap-x-2 p-2">
                <Link className="font-semibold text-xs" href={`/r/${subName}`}>
                    r/{subName}
                </Link>
                <p className="text-muted-foreground text-sm">Posted by:
                    <span className="hover:text-primary">r/wakanda</span></p>
            </div>

            <div className="px-2">
                <Link href="/">
                <h1 className="font-medium  mt-1 text-lg">{title}</h1>
                </Link>
            </div>

            <div className="max-h-[300px] overflow-hidden">
                {imageString ? (
                    <Image
                    src={imageString}
                    alt="post image"
                    width={600}
                    height={300}
                    className="w-full h-full"
                    />
                ): (<p>hello world</p>)}
            </div>

            <div className="m-3 flex items-center gap-x-5">
                <div className="flex items-center gap-x-1">
                    <MessageCircle className="h-4 w-4 text-muted-foreground"/>
                    <p className="text-muted-foreground font-medium text-xs">31 comments</p>
                </div>

                <CopyLink id={id}/>
            </div>
        </div>
    </Card>
)
}
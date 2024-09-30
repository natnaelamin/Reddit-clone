import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Link from "next/link";
import Image from "next/image";
import CopyLink from "./CopyLink";
import { handleVote } from "@/app/Actions";
import { DownVote, UpVote } from "./submitButton";
import RenderToJson from "./RendertoJson";


interface iAppProps {
    title: string;
    jsonContent: any;
    id: string;
    subName: string;
    userName: string;
    imageString: string | null;
    voteCount: number;
    commentAmount: number;
}

export function PostCard({title, id, jsonContent, subName, userName, imageString, voteCount, commentAmount}: iAppProps){
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
                    <span className="hover:text-primary">r/{userName}</span></p>
            </div>

            <div className="px-2">
                <Link href={`/post/${id}`}>
                <h1 className="font-medium  mt-1 text-lg">{title}</h1>
                </Link>
            </div>

            <div className="max-h-[300px] overflow-hidden px-2">
                {imageString ? (
                    <Image
                    src={imageString}
                    alt="post image"
                    width={600}
                    height={300}
                    className="w-full h-full"
                    />
                ): (
                    <RenderToJson data={jsonContent}/>
                )}
            </div>

            <div className="m-3 flex items-center gap-x-5">
                <div className="flex items-center gap-x-1">
                    <MessageCircle className="h-4 w-4 text-muted-foreground"/>
                    <p className="text-muted-foreground font-medium text-xs">{commentAmount} comments</p>
                </div>

                <CopyLink id={id}/>
            </div>
        </div>
    </Card>
)
}
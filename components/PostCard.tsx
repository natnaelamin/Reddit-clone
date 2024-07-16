import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Link from "next/link";
import Image from "next/image";

interface iAppProps {
    title: string;
    jsonContent: any;
    id: string;
    subName: string;
    userName: string;
    imageString: string | null;
}

export function PostCard({title, id, jsonContent, subName, userName, imageString}: iAppProps){
return(
    <Card className="flex relative overflow-hidden">
        <div className="flex flex-col items-center gap-y-5 bg-muted p-2">
            <form>
                <Button variant="outline" size="sm">
                    <ArrowUp className="h-4 w-4"/>
                </Button>
            </form>
            0
            <form>
                <Button variant="outline" size="sm">
                    <ArrowDown className="h-4 w-4"/>
                </Button>
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
                <h1 className="font-medium  mt-1 text-lg">{title} </h1>
                </Link>
            </div>

            <div className="max-h-[300px] overflow-hidden">
                {imageString && (
                    <Image
                    src={imageString}
                    alt="post image"
                    width={600}
                    height={300}
                    className="w-full h-full"
                    />
                )}
            </div>
        </div>
    </Card>
)
}
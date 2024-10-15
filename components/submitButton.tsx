"use client"

import { useFormStatus } from "react-dom"
import { Button } from "./ui/button";
import { ArrowDown, ArrowUp, Loader2, Reply } from "lucide-react";

export function SubmitButton({text}:{text: string}){
    const {pending} = useFormStatus();

    return(
        <>
            {pending ? 
            <Button disabled>
                <Loader2 className="mt-1 h-4 w-4 animate-spin"/>
                please wait
            </Button>:
            <Button type="submit">{text}</Button>
            }
        </>
    )
}


export function SaveButton(){
    const {pending} = useFormStatus();
    return(
        <>
        {pending? (
            <Button className="mt-2 w-full" disabled size="sm">
                <Loader2 className="mr-2 h-3 w-3 animate-spin"/>
                Please wait
            </Button>
        ):(
            <Button className="mt-2 w-full" size="sm" type="submit">
                Save
            </Button>
        )}
        </>
    )
}

export function UpVote(){
    const {pending} = useFormStatus();

    return(
        <>
        {pending ? (
            <Button variant="outline" size="icon" className="border-none" disabled>
                <Loader2 className=" animate-spin" />
            </Button>
        ): (
            <Button variant="outline"  className="border-none p-0 h-10 w-8" type="submit">
                <ArrowUp className="h-6 w-4"/>
            </Button>
        )}
        </>
    )
}

export function DownVote(){
    const {pending} = useFormStatus();

    return(
        <>
        {pending ? (
            <Button variant="outline" size="sm" className="border-none " disabled>
                <Loader2 className="w-4 h-4 animate-spin"/>
            </Button>
        ): (
            <Button variant="outline" className="border-none p-0 h-10 w-8" type="submit">
                <ArrowDown className="h-6 w-4"/>
            </Button>
        )}
        </>
    )
}

interface ReplyButtonProps {
    inputValue: any;
  }

export function ReplyButton({inputValue}: ReplyButtonProps){
    const {pending} = useFormStatus();

    return(
        <div>
            {pending ? 
            <Button disabled>
                <Loader2 className="mt-1 h-4 w-4 animate-spin"/>
                please wait
            </Button>:
            <Button className="h-6 bg-neutral-950" disabled={!inputValue} type="submit"><Reply className="h-4 w-5 mr-1 "/>Reply</Button>
            }
        </div>
    )
}
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
            <Button variant="outline" size="icon" disabled>
                <Loader2 className="w-4 h-4 animate-spin"/>
            </Button>
        ): (
            <Button variant="outline" size="sm" type="submit">
                <ArrowUp className="h-4 w-4"/>
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
            <Button variant="outline" size="icon" disabled>
                <Loader2 className="w-4 h-4 animate-spin"/>
            </Button>
        ): (
            <Button variant="outline" size="sm" type="submit">
                <ArrowDown className="h-4 w-4"/>
            </Button>
        )}
        </>
    )
}

interface ReplyButtonProps {
    handleShowForm: (commentId: string) => void;
  }

export function ReplyButton({handleShowForm}: ReplyButtonProps){
    const {pending} = useFormStatus();

    return(
        <div>
            {pending ? 
            <Button disabled>
                <Loader2 className="mt-1 h-4 w-4 animate-spin"/>
                please wait
            </Button>:
            <Button className="h-6 bg-neutral-950"  onClick={()=> handleShowForm("")}><Reply className="h-4 w-5 mr-1 "/>Reply</Button>
            }
        </div>
    )
}
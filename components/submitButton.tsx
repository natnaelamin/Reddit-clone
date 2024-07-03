"use client"

import { useFormStatus } from "react-dom"
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

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
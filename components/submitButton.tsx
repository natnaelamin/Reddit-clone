"use client"

import { useFormStatus } from "react-dom"
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export function SubmitButton(){
    const {pending} = useFormStatus();

    return(
        <>
            {pending ? 
            <Button disabled>
                <Loader2 className="mt-1 h-4 w-4 animate-spin"/>
                please wait
            </Button>:
            <Button type="submit">Change username</Button>
            }
        </>
    )
}
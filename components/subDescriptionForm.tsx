"use client"

import { UpdateSubDescription } from '@/app/Actions'
import { SaveButton } from '@/components/submitButton'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from 'react-dom'
import { useToast } from './ui/use-toast'
import { useEffect } from 'react'

interface iAppProps{
    subName: string,
    description: string | null | undefined,
}

const initialstate = {
    message: "",
    status: ""
}

function SubDescriptionForm({subName, description}: iAppProps) {
    const[state, formAction] = useFormState(UpdateSubDescription, initialstate)
    const {toast} = useToast()

    useEffect(()=>{
        if(state.status === 'green'){
            toast({
                title: "Success",
                description: state.message,
            })
        } else if(state.status === "error"){
            toast({
                title: "Error",
                description: state.message,
                variant: "destructive",
            })
        }
    },[state, toast])

  return (
    <form className='mt-3' action={formAction}>
        <input type='hidden' name='subname' value={subName}/>
        <Textarea
        placeholder='Create your custom description for your subreddit'
        maxLength={100}
        name='description'
        defaultValue={description ?? undefined}
        />
        <SaveButton />
    </form>
  )
}

export default SubDescriptionForm

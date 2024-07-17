"use client"
import { Share } from "lucide-react"
import { useToast } from "./ui/use-toast"


function CopyLink({id}: {id: string}) {
  const {toast} = useToast()

  async function CopytoClipboard(){
    await navigator.clipboard.writeText(`${location.origin}/post/${id}`);
    toast({
      title: "Success",
      description: "Your link has been copied to your clipboard!" 
    })
  }
  return (
    <button className="flex items-center gap-x-1" onClick={CopytoClipboard}>
        <Share className="h-4 w-4 text-muted-foreground"/>
        <p className="text-muted-foreground font-medium text-xs">Share</p>
    </button>
  )
}

export default CopyLink

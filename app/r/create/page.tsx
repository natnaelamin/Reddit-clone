import { createCommunity } from "@/app/Actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

function SubredditPage() {
  return (
    <div className="max-w-[1000px] mx-auto mt-4 flex flex-col">
        <form action={createCommunity}>
            <h1 className="text-3xl font-extrabold tracking-tight">
                Create Community
            </h1>
            <Separator className="my-4"/>
            <Label className="text-lg">Name</Label>
            <p className="text-muted-foreground">
                Community names including capitalization cannot be changed!
            </p>

            <div className="relative mt-3">
                <p className="absolute left-0 flex justify-center items-center w-8 h-full text-muted-foreground">
                    r/
                </p>
                <Input
                name="name"
                required 
                className="pl-6"
                minLength={2}
                maxLength={21}                
                />
            </div>
            <div className="w-full flex justify-end gap-x-5 mt-5">
                <Button variant="secondary" type="button"><Link href="/">Cancel</Link></Button>
                <Button type="submit">Submit</Button>
            </div>
        </form>
    </div>
  )
}

export default SubredditPage

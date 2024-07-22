import { CreateComment } from "@/app/Actions";
import { SubmitButton } from "./submitButton"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

interface iAppProps{
    postId: string;
}


function CommentForm({postId}: iAppProps) {
  return (
    <form action={CreateComment} className="mt-5">
        <input type="hidden" name="postId" value={postId} />
        <Label>Comment as nati</Label>
        <Textarea
        placeholder="What are your thoughts?"
        name="Comment"
        className="mt-1 mb-2 w-full"
        />
        <SubmitButton text="Comment"/>
    </form>
  )
}

export default CommentForm

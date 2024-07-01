"use client"
import { Label } from "./ui/label"
import { Separator} from "./ui/separator"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import Link from "next/link"
import { SubmitButton } from "./submitButton"
import { updateUsername } from "@/app/Actions"

function SettingsForm({username}:{username: string | null | undefined}) {
  return (
    <form action={updateUsername}>
      <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
      <Separator className="my-4"/>
      <Label className="text-lg ">Username</Label>
      <p className="text-muted-foreground">
        In this settings page you can change your your username!
      </p>

      <Input defaultValue={username ?? undefined} name="username" required className="mt-2" min={2} maxLength={21} />
      <div className="w-full flex justify-end gap-x-5 mt-5">
        <Button variant="secondary" type="button"><Link href="/">Cancel</Link></Button>
        <SubmitButton />
      </div>
    </form>
  )
}

export default SettingsForm

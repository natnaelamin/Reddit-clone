import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db"
import { redirect } from "next/navigation";
import SettingsForm from "@/components/SettingsForm";
import {unstable_noStore as noStore} from "next/cache";


async function getData(userId: string){
    noStore();
    const data = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select:{
            userName: true,
        },
    });

    return data
}


export default async function Settingspage(){
    const {getUser} = getKindeServerSession()
    const user = await getUser()
    console.log(user)
    
        if(!user){
           return redirect("api/auth/login")
        }
        const data = await getData(user.id)
        return (
            <div className="max-w-[1000px] mx-auto flex-col mt-4">
                <SettingsForm username={data?.userName}/>
            </div>)
        
}

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db"
import { redirect } from "next/navigation";

async function getData(userId: string){
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
            <div>
                <h1>tired of this shit man. i need to see my username asap</h1>
                {data?.userName}
            </div>)
        
}

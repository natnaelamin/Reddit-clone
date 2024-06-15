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
    const user = getUser()
    
        if(!user){
           return redirect("api/auth/login")
        }
        const data = await getData(user.id)
        return <div>{data?.userName}</div>
        
    

}

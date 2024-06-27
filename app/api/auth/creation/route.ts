
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { generateUsername } from "unique-username-generator";

export async function GET(){
    const {getUser} = getKindeServerSession();
    const user = await getUser();

  
    if (!user || user === null || !user.id)
        throw new Error ("something went wrong");
    

    let dbUser = await prisma.user.findUnique({
        where: {
            id: user.id
        },
    });

    

    if (!dbUser){
        dbUser = await prisma.user.create({
        data: {
            id: user.id,
            email: user.email ?? "",
            firstName: user.given_name ?? "",
            lastName: user.family_name ?? "",
            imageUrl: user.picture,
            userName: generateUsername("-", 3, 12)
        }
    })
    } 
    
    

    return NextResponse.redirect("http://localhost:3000/")
}
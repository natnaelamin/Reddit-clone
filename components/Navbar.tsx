import Link from "next/link";
import RedditText from "../public/logo-name.svg"
import RedditMobile from "../public/reddit-full.svg"
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserDropdown } from "./UserDropdown";

export async function Navbar(){

    const {getUser} = getKindeServerSession();
    const user = await getUser();
    return(
       <nav className="flex items-center justify-between border-b px-5 lg:px-14 h-[10vh] w-full"> 
            <Link href="/" className="flex items-center gap-x-3">
                <Image
                    src={RedditMobile}
                    alt="reddit mobile icon" 
                    className="h-10 w-fit" 
                />
                <Image
                    src={RedditText}
                    alt="reddit mobile text" 
                    className="md:h-10 h-5 w-fit " 
                />
            </Link>
            <div className="flex items-center gap-x-4">
                { user? (
                    <UserDropdown userImage={user.picture}/>
                ):
                (<div className="flex items-center gap-x-2 md:gap-x-4">
                    <Button  variant="secondary" asChild><RegisterLink postLoginRedirectURL="/">Sign up</RegisterLink></Button>
                    <Button asChild><LoginLink postLoginRedirectURL="/">Login</LoginLink></Button>
                </div>)}
                <ThemeToggle />
            </div>
        </nav>
    )
};
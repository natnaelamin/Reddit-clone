import { MenuIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";

interface dropdownProps {
    userImage: string | null;
}

export function UserDropdown({userImage}: dropdownProps){
    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="rounded-full flex items-center p-2 lg:px-4 lg:py-2 border gap-x-3">
                    <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
                    <img src={userImage ?? 'https://t3.ftcdn.net/jpg/05/87/76/66/360_F_587766653_PkBNyGx7mQh9l1XXPtCAq1lBgOsLl6xH.jpg'}
                    alt="user avatar"
                    className="h-8 w-8 rounded-full lg:block hidden"/>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem>
                    <Link href="/r/create">Create Community</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/create">Create Post</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogoutLink className="w-full">Logout</LogoutLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
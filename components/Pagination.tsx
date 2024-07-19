"use client"

import clsx from "clsx"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import {usePathname, useSearchParams } from "next/navigation"

export const genereatePagination = (currentPage: number, totalPages: number) =>{
    if(totalPages <= 7){
        return Array.from({length: totalPages}, (_, i)=> i + 1);
    }

    if(currentPage <= 3){
        return [1, 2, 3, "...", totalPages - 1, totalPages];
    }

    if(currentPage >= totalPages - 2){
        return [1, 2, "...", totalPages - 2,totalPages-1, totalPages];
    }

    return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
    ];
};

export default function Pagination({totalPages}:{totalPages: number}){
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get("page") || 1);

    const createPageUrl = (pageNumber: number | string) =>{
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const allPages = genereatePagination(currentPage, totalPages);

    return (
        <div className="w-full flex justify-center">
            <ArrowLeft direction="left" href={createPageUrl(currentPage - 1)}  />



            <div className="flex -space-x-px">
                {allPages.map((page, index)=>{
                    let position : "first" | "last" | "middle" | "single" | undefined;

                    if(index === 0) position = "first";
                    if(index === allPages.length - 1) position = "last";
                    if(allPages.length === 1) position = "single";
                    if(page === "...") position = "middle";

                    return(
                        <PaginationNumber
                        key={page}
                        href={createPageUrl(page)}
                        page={page}
                        position={position}
                        isActive={currentPage === page}
                        />
                    )
                })}
            </div>

            <ArrowRight direction="right" href={createPageUrl(currentPage + 1)}  />

        </div>
    )
} 


function PaginationNumber({page, href, isActive, position}: {
    page: number | string;
    href: string;
    position?: "first" | "last" | "middle" | "single";
    isActive: boolean;
}){
    const className = clsx(
        "flex h-10 w-10 justify-center items-center text-sm border",
        {
            "rounded-l-md": position === "first" || position === "single",
            "rounded-r-md": position === "last" || position === "single",
            "z-10 bg-primary border-primary text-white": isActive,
            "hover:bg-muted" : isActive && position !== "middle",
            "text-gray-300": position === "middle", 
        }
    );

    return isActive || position === "middle" ? (
        <div className={className}>{page}</div>
    ):(
        <Link href={href} className={className}>
            {page}
        </Link>
    )
}
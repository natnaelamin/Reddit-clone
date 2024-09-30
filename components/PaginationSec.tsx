"use client"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

  
  export default function PaginationSec({
    totalPosts,
    postsPerPage,
    currentPage,
    setCurrentPage,
  }: {
    totalPosts: any;
    postsPerPage: any;
    currentPage: any;
    setCurrentPage: any;
  }){

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
    }

    const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
        setCurrentPage(currentPage + 1);
    }
    };
    
    const handlePrevPage = () => {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
    };

    return(
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                <PaginationPrevious onClick={handlePrevPage} />
                </PaginationItem>

                {pageNumbers.map((page) => (
                  <PaginationItem 
                    key={page}
                    className={currentPage === page ? "bg-secondary" : ""}
                  >
                    <PaginationLink onClick={() => setCurrentPage(page)}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                <PaginationNext onClick={handleNextPage} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
  }

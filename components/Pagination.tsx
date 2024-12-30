"use client";

import React, { useEffect, useMemo } from "react";
import { PaginationSearchParams } from "@/types";
import { PAGINATION_PER_PAGE as PER_PAGE } from "@/lib/const";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { objectToQs } from "@/lib/utils";

type PaginationProps = {
  className?: string;
  count: number;
  searchParams: PaginationSearchParams & any; // eslint-disable-line
};

const Pagination = ({
  className = "",
  count,
  searchParams,
}: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const maxPages = useMemo(() => Math.ceil(count / PER_PAGE), [count]);
  const currentPage = useMemo(
    () => Number(searchParams.page || 1),
    [searchParams.page]
  );

  // Redirect to the last valid page if the current page is invalid
  useEffect(() => {
    if (currentPage > maxPages) {
      searchParams.page = maxPages;
      router.replace(`${pathname}?${objectToQs(searchParams)}`);
    }
  }, [currentPage, maxPages]); // eslint-disable-line

  const hasNextPage = currentPage < maxPages;
  const hasPreviousPage = currentPage > 1;

  // Navigate to the next page
  const handleNext = () => {
    if (!hasNextPage) return;
    searchParams.page = currentPage + 1;
    router.push(`${pathname}?${objectToQs(searchParams)}`);
  };

  // Navigate to the previous page
  const handleBack = () => {
    if (!hasPreviousPage) return;
    searchParams.page = currentPage - 1;
    router.push(`${pathname}?${objectToQs(searchParams)}`);
  };

  if (count === 0) return null;

  return (
    <div className={`flex items-center space-x-5 ${className}`}>
      <Button
        disabled={!hasPreviousPage}
        onClick={handleBack}
        dataTitle="Back"
        variant="secondary"
      >
        Back
      </Button>
      <Button
        disabled={!hasNextPage}
        onClick={handleNext}
        dataTitle="Next"
        variant="secondary"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;

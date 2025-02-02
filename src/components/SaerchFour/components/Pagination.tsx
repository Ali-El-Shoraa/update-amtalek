"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import { useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import useWindowSize from "@/Hooks/useWindowSize";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  data: any;
  isPreviousData?: boolean;
  fullWidth?: string;
  t: (key: string) => string;
  brokerDetails?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  data,
  isPreviousData = false,
  fullWidth = "w-full",
  t,
  brokerDetails,
}) => {
  const { width } = useWindowSize();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const updatePage = useCallback(
    (newPage: number) => {
      setPage(newPage);
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", newPage.toString());
      router.push(`${pathname}?${params.toString()}`);
    },
    [setPage, searchParams, router, pathname]
  );

  const handlePageChange = useCallback(
    (e: { selected: number }) => {
      const newPage = e.selected + 1;
      updatePage(newPage);
    },
    [updatePage]
  );

  return (
    <nav
      className={`all__properties--pagination trns ${fullWidth} flex justify-between items-center my-16`}
    >
      <button
        disabled={page === 1 || isPreviousData}
        className={`flex border-2 border-secondary pr-[9px] rtl:pr-[0px] rtl:pl-[9px] w-[105px] rtl:w-[85px] h-9 md:w-9 md:pr-[0px] md:rtl:pl-[0px] md:justify-center justify-end items-center active:scale-90 gap-2 hover:gap-3 transition-all duration-300 ease-in-out ${
          page === 1 || isPreviousData ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => updatePage(page - 1)}
      >
        <FontAwesomeIcon className="rotate-180 rtl:rotate-0" icon={faArrowRight} />
        <span className={`md:hidden`}>{t("Pagination.Previous")}</span>
      </button>

      <ReactPaginate
        previousLinkClassName="pagination__previous"
        nextLinkClassName="pagination__next"
        breakLabel="..."
        pageCount={Number(brokerDetails ? data?.last_page : data?.meta?.last_page)}
        onPageChange={handlePageChange}
        marginPagesDisplayed={width && width > 1000 ? 3 : 1}
        pageRangeDisplayed={width && width > 1000 ? 5 : 1}
        containerClassName="pagination__wrapper"
        activeClassName="active__page--pagination"
        forcePage={page - 1}
      />

      <button
        disabled={page === (data?.meta?.last_page || data?.last_page) || isPreviousData}
        className={`pl-[9px] rtl:pl-[0px] rtl:pr-[9px] w-[75px] h-9 md:w-9 md:pl-[0px] md:rtl:pr-[0px] md:justify-center flex justify-start items-center gap-2 active:scale-90 hover:gap-3 transition-all duration-300 ease-in-out border-2 border-secondary bg-secondary text-bg ${
          page === (data?.meta?.last_page || data?.last_page) || isPreviousData
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
        onClick={() => updatePage(page + 1)}
      >
        <span className={`md:hidden`}>{t("Pagination.Next")}</span>
        <FontAwesomeIcon className="rtl:rotate-180" icon={faArrowRight} />
      </button>
    </nav>
  );
};

export default Pagination;

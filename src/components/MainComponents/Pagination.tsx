/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import { useReducer, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

  function reducer(state: any, action: any) {
    switch (action.type) {
      case "setPage":
        return {
          ...state,
          page: action.payload,
        };
      default:
        throw new Error("Unknown action: " + action.type);
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    page: page || 1,
  });

  const updatePageInURL = (newPage: number) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("page", newPage.toString());
    router.push(`?${currentParams.toString()}`);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const previousPage = useCallback(() => {
    const newPage = Number(state.page) - 1;
    setPage(newPage);
    updatePageInURL(newPage);
    dispatch({ type: "setPage", payload: newPage });
    scrollToTop();
  }, [setPage, state.page]);

  const nextPage = useCallback(() => {
    const newPage = Number(state.page) + 1;
    setPage(newPage);
    updatePageInURL(newPage);
    dispatch({ type: "setPage", payload: newPage });
    scrollToTop();
  }, [setPage, state.page]);

  const handlePageChange = useCallback(
    (e: { selected: number }) => {
      const newPage = Number(e.selected + 1);
      setPage(newPage);
      updatePageInURL(newPage);
      dispatch({ type: "setPage", payload: newPage });
      scrollToTop();
    },
    [setPage]
  );

  return (
    <nav
      className={`all__properties--pagination trns ${fullWidth} flex justify-between items-center my-16`}
    >
      <div
        className={`w-fit ${
          (page === 1 || isPreviousData) && "cursor-not-allowed"
        } ${
          data?.meta?.last_page > 1 || data?.last_page > 1 ? "block" : "hidden"
        }`}
      >
        <button
          disabled={page === 1 || isPreviousData}
          //  w-[105px] rtl:w-[85px]
          className="flex border-2 border-secondary pr-[9px] rtl:pr-[0px] rtl:pl-[9px] h-9 md:w-9 md:pr-[0px] md:rtl:pl-[0px] md:justify-center justify-end items-center active:scale-90 gap-2 hover:gap-3 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:pointer-events-none"
          onClick={previousPage}
        >
          <FontAwesomeIcon
            className="rotate-180 rtl:rotate-0"
            icon={faArrowRight}
          />
          <span className={`md:hidden`}>{t("Pagination.Previous")}</span>
        </button>
      </div>

      <ReactPaginate
        previousLinkClassName="pagination__previous"
        nextLinkClassName="pagination__next"
        breakLabel="..."
        pageCount={Number(
          brokerDetails ? data?.last_page : data?.meta?.last_page
        )}
        onPageChange={handlePageChange}
        marginPagesDisplayed={width && width > 1000 ? 3 : 1}
        pageRangeDisplayed={width && width > 1000 ? 5 : 1}
        renderOnZeroPageCount={null}
        containerClassName="pagination__wrapper"
        activeClassName="active__page--pagination"
        forcePage={page - 1}
      />

      <div
        className={`w-fit ${
          (page === (data?.meta?.last_page || data?.last_page) ||
            isPreviousData) &&
          "cursor-not-allowed"
        } ${
          data?.meta?.last_page > 1 || data?.last_page > 1 ? "block" : "hidden"
        }`}
      >
        <button
          disabled={
            page === (data?.meta?.last_page || data?.last_page) ||
            isPreviousData
          }
          className="pl-[9px] rtl:pl-[0px] rtl:pr-[9px] w-[75px] h-9 md:w-9 md:pl-[0px] md:rtl:pr-[0px] md:justify-center flex justify-start items-center gap-2 active:scale-90 hover:gap-3 transition-all duration-300 ease-in-out border-2 border-secondary bg-secondary text-bg disabled:opacity-50 disabled:pointer-events-none"
          onClick={nextPage}
        >
          <span className={`md:hidden`}>{t("Pagination.Next")}</span>
          <FontAwesomeIcon className="rtl:rotate-180" icon={faArrowRight} />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;

// "use client";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import useWindowSize from "../Hooks/useWindowSize";
// import ReactPaginate from "react-paginate";
// import { useReducer, useCallback } from "react";
// import { useSearchParams } from "next/navigation";

// interface PaginationProps {
//   page: number;
//   setPage: (page: number) => void;
//   data: any;
//   isPreviousData?: boolean;
//   fullWidth?: string;
//   t: (key: string) => string;
//   brokerDetails?: boolean;
// }

// const Pagination: React.FC<PaginationProps> = ({
//   page,
//   setPage,
//   data,
//   isPreviousData = false,
//   fullWidth = "w-full",
//   t,
//   brokerDetails,
// }) => {
//   const { width } = useWindowSize();
//   const [searchParams, setSearchParams]: any = useSearchParams();

//   function reducer(state: any, action: any) {
//     switch (action.type) {
//       case "setPage":
//         return {
//           ...state,
//           page: action.payload,
//         };
//       default:
//         throw new Error("Unknown action: " + action.type);
//     }
//   }

//   const [state, dispatch] = useReducer(reducer, {
//     page: page || 1,
//   });

//   const previousPage = useCallback(() => {
//     const newPage = Number(state.page) - 1;
//     setPage(newPage);
//     setSearchParams({ page: newPage.toString() });
//     dispatch({ type: "setPage", payload: newPage });
//   }, [setPage, setSearchParams, state.page]);

//   const nextPage = useCallback(() => {
//     const newPage = Number(state.page) + 1;
//     setPage(newPage);
//     setSearchParams({ page: newPage.toString() });
//     dispatch({ type: "setPage", payload: newPage });
//   }, [setPage, setSearchParams, state.page]);

//   const handlePageChange = useCallback(
//     (e: { selected: number }) => {
//       const newPage = Number(e.selected + 1);
//       setPage(newPage);
//       setSearchParams({ page: newPage.toString() });
//       dispatch({ type: "setPage", payload: newPage });
//     },
//     [setPage, setSearchParams]
//   );

//   return (
//     <nav
//       className={`all__properties--pagination trns ${fullWidth} flex justify-between items-center my-16`}
//     >
//       <div
//         className={`w-fit ${(page === 1 || isPreviousData) && "cursor-not-allowed"} ${
//           data?.meta?.last_page > 1 || data?.last_page > 1 ? "block" : "hidden"
//         }`}
//       >
//         <button
//           disabled={page === 1 || isPreviousData}
//           className="flex border-2 border-secondary pr-[9px] rtl:pr-[0px] rtl:pl-[9px] w-[105px] rtl:w-[85px] h-9 md:w-9 md:pr-[0px] md:rtl:pl-[0px] md:justify-center justify-end items-center active:scale-90 gap-2 hover:gap-3 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:pointer-events-none"
//           onClick={previousPage}
//         >
//           <FontAwesomeIcon className="rotate-180 rtl:rotate-0" icon={faArrowRight} />
//           <span className={`md:hidden`}>{t("Pagination.Previous")}</span>
//         </button>
//       </div>

//       <ReactPaginate
//         previousLinkClassName="pagination__previous"
//         nextLinkClassName="pagination__next"
//         breakLabel="..."
//         pageCount={Number(brokerDetails ? data?.last_page : data?.meta?.last_page)}
//         onPageChange={handlePageChange}
//         marginPagesDisplayed={width && width > 1000 ? 3 : 1}
//         pageRangeDisplayed={width && width > 1000 ? 5 : 1}
//         renderOnZeroPageCount={null}
//         containerClassName="pagination__wrapper"
//         activeClassName="active__page--pagination"
//         forcePage={page - 1}
//       />

//       <div
//         className={`w-fit ${
//           (page === (data?.meta?.last_page || data?.last_page) || isPreviousData) &&
//           "cursor-not-allowed"
//         } ${data?.meta?.last_page > 1 || data?.last_page > 1 ? "block" : "hidden"}`}
//       >
//         <button
//           disabled={page === (data?.meta?.last_page || data?.last_page) || isPreviousData}
//           className="pl-[9px] rtl:pl-[0px] rtl:pr-[9px] w-[75px] h-9 md:w-9 md:pl-[0px] md:rtl:pr-[0px] md:justify-center flex justify-start items-center gap-2 active:scale-90 hover:gap-3 transition-all duration-300 ease-in-out border-2 border-secondary bg-secondary text-bg disabled:opacity-50 disabled:pointer-events-none"
//           onClick={nextPage}
//         >
//           <span className={`md:hidden`}>{t("Pagination.Next")}</span>
//           <FontAwesomeIcon className="rtl:rotate-180" icon={faArrowRight} />
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Pagination;

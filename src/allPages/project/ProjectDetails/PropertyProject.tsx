"use client";
import Heading from "@/components/Heading";
import PropertyCard from "@/components/PropertyCard";
import ComboBoxSelect from "@/components/SaerchFour/ComboBoxSelect";
import {
  setShowFormProjectOrientation,
  setShowSearchPropertyProject,
} from "@/Store/Features/AuthenticationSlice";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";

export default function PropertyProject({ data }: any) {
  const { t, i18n } = useTranslation();
  const cards = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `Villa - Palm Hills New Cairo ${i + 1}`,
    location: "New Cairo, Egypt",
    sale_price: `${89_923_000 + i * 10_000} EGP`,
    monthly: `${749_358 + i * 100} Monthly / 8.5 Years`,
    broker_details: [
      { logo: "/images/favicon.png", name: "", broker_type: "" },
    ],
    rent_duration: "days",
    primary_image: "/images/hi.webp",
    // sale_price:,
  }));
  const dispatch = useDispatch();

  // const handleClick = useCallback((e: any) => {
  //   if (!LoginPopUpContent?.current?.contains(e.target)) {
  //     dispatch(setShowFormProjectOrientation(false));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // Items per page
  const itemsPerPage = 6;
  const [currentItems, setCurrentItems] = useState(
    cards.slice(0, itemsPerPage)
  );
  const [pageCount, setPageCount] = useState(
    Math.ceil(cards.length / itemsPerPage)
  );

  // Handle page change
  const handlePageClick = ({ selected }: any) => {
    const start = selected * itemsPerPage;
    const end = start + itemsPerPage;
    setCurrentItems(cards.slice(start, end));
  };

  return (
    <div
      className="space-y-8 py-10"
      //  onClick={()=> handleClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <Heading>
            {i18n.language === "en"
              ? data?.name + " " + t("headings.PROPERTY")
              : t("headings.PROPERTY") + " " + data?.name}
          </Heading>
          <p className="Property__name text-base mt-1 asm:text-center mb-7">
            {cards.length} Results Available
          </p>
        </div>

        <div className="">
          <div className="flex items-center space-x-4">
            {/* <!-- Filter Button --> */}
            <button
              onClick={() => dispatch(setShowSearchPropertyProject(true))}
              className="flex items-center px-4 py-2 text-white bg-secondary rounded hover:bg-muted"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="mr-2"
              >
                <path
                  d="M20 7H11M14 17H5M14 17C14 18.6569 15.3431 20 17 20C18.6569 20 20 18.6569 20 17C20 15.3431 18.6569 14 17 14C15.3431 14 14 15.3431 14 17ZM10 7C10 8.65685 8.65685 10 7 10C5.34315 10 4 8.65685 4 7C4 5.34315 5.34315 4 7 4C8.65685 4 10 5.34315 10 7Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Filter
            </button>

            {/* <!-- Sort By Button --> */}
            <div className="">
              {/* <ComboBox */}
              <ComboBoxSelect
                selectBox
                placeholder={t("sorting_select.placeholder", {
                  defaultValue: "Sort By:",
                })}
                // setSearchParams={searchParams}
                // searchParams={searchParams}
                data={[
                  { title: t("Featured"), id: 1 },
                  { title: t("Normal"), id: 2 },
                  { title: t("price High"), id: 3 },
                  { title: t("price Low"), id: 4 },
                  // { title: t("sorting_select.Featured"), id: 1 },
                  // { title: t("sorting_select.Normal"), id: 2 },
                  // { title: t("sorting_select.price_High"), id: 3 },
                  // { title: t("sorting_select.price_Low"), id: 4 },
                ]}
                dark
                shadow
                // getDefaultValueFromURL="srt"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-3 clg:grid-cols-2 ss:grid-cols-1 gap-10">
        {currentItems.map((card, ind) => (
          <PropertyCard
            key={card.id}
            property={card}
            makeBgLight
            lng={i18n.language}
            t={t}
            i18n={i18n}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"flex justify-center items-center space-x-2"}
        pageClassName={"px-4 py-2 border rounded bg-white"}
        activeClassName={"!bg-secondary text-white"}
        previousClassName={"px-4 py-2 border rounded bg-white"}
        nextClassName={"px-4 py-2 border rounded bg-secondary text-white"}
        disabledClassName={"opacity-50"}
      />
    </div>
  );
}

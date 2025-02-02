"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useFetchPaginatedData } from "@/Hooks/useAxios";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { lang } from "@/Store/Features/MiscellaneousSlice";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import "swiper/swiper-bundle.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./slider.css";
import getData from "@/lib/api/getData";
export default function LatestProperties() {
  const { t, i18n } = useTranslation("Pages_PropertyDetails");

  // const lng = useSelector(lang);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await getData(
          `web/${process.env.NEXT_PUBLIC_ALL_PROPERTIES}all?limit=15`,
          i18n.language
        );
        const result = await response.data.original.data;
        setData(result);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    fetchAds();
  }, [i18n.language]);

  if (!data) {
    return null;
  }

  return (
    <div className="w-full LatestProperties__slider--container mb-6 relative">
      <div className="LatestProperties__title--arrows mb-5 flex  justify-between items-center">
        <h3 className="font-medium text-xl ">{t("LatestProperties.title")}</h3>
        {data?.length > 1 && (
          <div className="FeaturedProperties__slider--arrows flex justify-end gap-5 items-center ">
            <button
              // onClick={() => slider.current.slickPrev()}
              className="custom-next bg-transparent text-custome-blue  border-2 border-custome-blue hover:scale-105 flex justify-center items-center round transition-all duration-300 ease-in-out active:scale-90 h-8 w-8"
            >
              <FontAwesomeIcon
                className="rotate-180 rtl:rotate-0 text-base font-bold transition-all duration-300 ease-in-out active:scale-90 "
                icon={faChevronRight}
              />
            </button>
            <button
              // onClick={() => slider.current.slickNext()}
              className=" custom-prev bg-custome-blue text-custome-white border-2 border-custome-blue hover:scale-105 flex justify-center items-center round transition-all duration-300 ease-in-out active:scale-90 h-8 w-8"
            >
              <FontAwesomeIcon
                className=" text-base font-bold rtl:rotate-180"
                icon={faChevronRight}
              />
            </button>
          </div>
        )}
      </div>
      {/*  */}
      {data?.length > 0 && (
        <Swiper
          modules={[Navigation, Grid]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          spaceBetween={10}
          // slidesPerView={1}
          grid={{
            rows: 3,
          }}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="swiper-wrapper-property"
        >
          {data?.map((slide: any) => (
            <SwiperSlide
              key={slide?.id}
              className="!flex !justify-start items-start gap-4 flex-row mt-4 mb-4"
            >
              <div
                key={slide?.id}
                className="w-full rtl:rtl !flex !justify-start items-start gap-4 bg- overflow-hidde"
              >
                <Link
                  href={`/properties/${slide?.listing_number}/${slide.title
                    ?.replace(/\s/g, "-")
                    ?.replace(/%/g, "-")}`}
                  className="w-20 aspect-square min-w-[80px] overflow-hidden rounded"
                >
                  <Image
                    width={1000}
                    height={1000}
                    className="w-20 aspect-square min-w-[80px] object-cover cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
                    src={slide?.primary_image}
                    alt={slide?.title}
                    loading="lazy"
                  />
                </Link>

                <div className="flex justify-between flex-col w-full h-full bg-custome-white">
                  <div className="w-full">
                    <Link
                      title={slide?.title}
                      href={`/properties/${slide?.listing_number}/${slide.title
                        ?.replace(/\s/g, "-")
                        ?.replace(/%/g, "-")}`}
                      className="font-medium text-lg md:text-md leading-none mb-0.5 block bg-custome-white truncate w-[70%] rtl:leading-6"
                    >
                      {slide?.title}
                    </Link>
                    <p
                      title={slide?.address}
                      className="opacity-70 bg-red- text-sm truncate w-[70%]"
                    >
                      {slide?.address}
                    </p>
                  </div>
                  <p
                    title={t("LatestProperties.price_formatted", {
                      context: slide?.for_what,
                      sale_price: slide?.sale_price,
                      rent_price: slide?.rent_price,
                      curr: slide?.currency,
                      duration: t(`PropertyCard.${slide?.rent_duration}`),
                    })}
                    className="bg-custome-blue text-custome-white flex justify-center items-center w-fit py-1.5 rounded px-2 text-sm truncate"
                  >
                    {t("LatestProperties.price_formatted", {
                      context: slide?.for_what,
                      sale_price: slide?.sale_price,
                      rent_price: slide?.rent_price,
                      curr: slide?.currency,
                      duration: t(`PropertyCard.${slide?.rent_duration}`),
                    })}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

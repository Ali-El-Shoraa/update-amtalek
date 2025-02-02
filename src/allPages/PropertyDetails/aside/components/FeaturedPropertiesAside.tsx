"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import "swiper/swiper-bundle.css";
import getData from "@/lib/api/getData";

export default function FeaturedPropertiesAside() {
  const { t, i18n } = useTranslation("Pages_PropertyDetails");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await getData(
          `web/${process.env.NEXT_PUBLIC_ALL_PROPERTIES}featured?limit=10`,
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

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="w-full FeaturedProperties__slider--container relative">
      <div className="FeaturedProperties__title--arrows mb-5 flex justify-between items-center">
        <h3 className="font-medium text-xl ">
          {t("FeaturedPropertiesAside.title")}
        </h3>
        {data?.length > 1 && (
          <div className="FeaturedProperties__slider--arrows flex justify-end gap-5 items-center ">
            <button
              // onClick={() => slider.current.slickPrev()}
              className="next-slider-btn bg-transparent text-custome-blue  border-2 border-custome-blue hover:scale-105 flex justify-center items-center round transition-all duration-300 ease-in-out active:scale-90 h-8 w-8"
            >
              <FontAwesomeIcon
                className="rotate-180 rtl:rotate-0 text-base font-bold transition-all duration-300 ease-in-out active:scale-90 "
                icon={faChevronRight}
              />
            </button>
            <button
              // onClick={() => slider.current.slickNext()}
              className="prev-slider-btn  bg-custome-blue text-custome-white border-2 border-custome-blue hover:scale-105 flex justify-center items-center round transition-all duration-300 ease-in-out active:scale-90 h-8 w-8"
            >
              <FontAwesomeIcon
                className=" text-base font-bold rtl:rotate-180"
                icon={faChevronRight}
              />
            </button>
          </div>
        )}
      </div>

      {data?.length > 0 && (
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".next-slider-btn",
            prevEl: ".prev-slider-btn",
          }}
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          // direction={i18n.language === "ar" ? "rtl" : "ltr"}
        >
          {data?.map((slide: any, i) => (
            <SwiperSlide
              key={slide?.id}
              className="!flex !justify-start items-start gap-2"
            >
              <div
                key={i}
                className=" w-full relative !flex !justify-start items-start gap-12 "
              >
                <Link
                  href={`/properties/${slide?.listing_number}/${slide.title
                    ?.replace(/\s/g, "-")
                    ?.replace(/%/g, "-")}`}
                  className="w-full h-fit relative p-[1px] overflow-hidden border- border-grey rounded-[.2px] group"
                >
                  <div className="w-full aspect-[3/2] overflow-hidden">
                    <Image
                      width={1000}
                      height={1000}
                      className="w-full h-full object-cove cursor-pointer ease-in duration-300 group-hover:scale-110 trns"
                      src={slide?.primary_image}
                      alt={slide?.title}
                    />
                  </div>
                  <p
                    title={t("FeaturedPropertiesAside.price_formatted", {
                      context: slide?.for_what,
                      sale_price: slide?.sale_price,
                      rent_price: slide?.rent_price,
                      curr: slide?.currency,
                      duration: t(`PropertyCard.${slide?.rent_duration}`),
                    })}
                    className="absolute w-full h-14 text-md bottom-0 right-0 bg-custome-yellow flex justify-center items-center font-medium  flex-col"
                  >
                    <span className=" px-2">
                      {slide?.title.slice(0, 30)}
                      {slide?.title.length > 30 ? "..." : ""}
                    </span>
                    {t("FeaturedPropertiesAside.price_formatted", {
                      context: slide?.for_what,
                      sale_price: slide?.sale_price,
                      rent_price: slide?.rent_price,
                      curr: slide?.currency,
                      duration: t(`PropertyCard.${slide?.rent_duration}`),
                    })}
                  </p>
                  <p className="absolute  text-sm round top-3 left-3 rtl:right-auto rtl:left-3 px-2 py-1 bg-custome-yellow text-secondary z-40">
                    {t("featuredAside.for_what", {
                      context: slide?.for_what,
                    })}
                  </p>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

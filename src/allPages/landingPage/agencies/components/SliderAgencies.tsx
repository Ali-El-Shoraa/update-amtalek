"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

export default function SliderAgencies({ data }: any) {
  return (
    <>
      <Swiper
        navigation={{
          nextEl: ".swiper-custome-next",
          prevEl: ".swiper-custome-prev",
        }}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
        speed={1800}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 4200,
          disableOnInteraction: false,
        }}
        breakpoints={{
          1622: { slidesPerView: 5 },
          1200: { slidesPerView: 4 },
          1016: { slidesPerView: 3 },
          670: { slidesPerView: 2 },
        }}
      >
        {/* **************************************************************************************************** */}
        {data?.cards?.map((slide: any) => (
          //border border-black
          <SwiperSlide key={slide?.id} className="rounded w-60 h-60 sm:w-48">
            <Link
              href={`/agencies/${slide?.name?.replace(/\s/g, "-")}/${
                slide?.id
              }/${slide?.broker_type}`}
              className="block rounded h-60"
            >
              <Image
                src={slide?.img}
                alt={slide?.name}
                className="w-full h-full rounded hover:shadow-2xl hover:scale-x-105 active:scale-90 transition-all duration-300 ease-in-out border object-fit cursor-pointer"
                width={1000}
                height={1000}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* **************************************************************************************************** */}

      <div className="w-full flex justify-center items-center gap-5 mt-4 rtl:flex-row-reverse">
        <button className="!swiper-button-prev swiper-custome-prev bg-gray-200 rounded-full p-1">
          <BsArrowLeftCircle color="#01425A" size={28} />
        </button>

        <button className="!swiper-button-next swiper-custome-next bg-gray-200 rounded-full p-1">
          <BsArrowRightCircle color="#01425A" size={28} />
        </button>
      </div>
    </>
  );
}

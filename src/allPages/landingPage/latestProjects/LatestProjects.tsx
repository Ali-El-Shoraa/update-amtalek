"use client";
import Heading from "@/components/Heading";
import ProjectDeveloperCard from "@/components/ProjectDeveloperCard";
import Link from "next/link";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default memo(function LatestProjects({ allPRoject }: any) {
  const { t } = useTranslation("Pages_Projects");

  return (
    <section className="py-10">
      <div className="site_container relative">
        <div className="flex items-center justify-between clg:flex-col clg:items-start">
          {/* clg:mx-auto */}
          <Heading style={""}>{t("developers.lates_proj")}</Heading>
          <Link
            href={`/projects`}
            className="py-2 px-5 bg-secondary text-white rounded-[6px] border border-secondary hover:bg-transparent hover:text-secondary transition-colors duration-300"
          >
            {t("developers.lates_proj_more")}
          </Link>
        </div>

        <div className="relative">
          {/* w-[106%] left-[-3%] */}
          {/* <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full z-10 flex items-center justify-between ltr:flex-row rtl:flex-row-reverse"> */}

          <button className="!swiper-button-prev swiper-custom-prev-project absolute top-1/2 left-0 z-10 -translate-y-1/2 !bg-[#0006] !text-custome-white !border-2 !border-custome-blue hover:!scale-105 !flex !justify-center !items-center !rounded-full !transition-all duration-300 ease-in-out active:scale-90 !h-10 !w-10">
            <FaChevronLeft className="text-lg font-bold" />
          </button>

          <button className="!swiper-button-next swiper-custom-next-project absolute top-1/2 right-0 z-10 -translate-y-1/2 !bg-[#0006] !text-custome-white border-2 !border-custome-blue hover:!scale-105 flex !justify-center !items-center !rounded-full !transition-all !duration-300 !ease-in-out active:!scale-90 !h-10 !w-10">
            <FaChevronRight className="text-lg font-bold" />
          </button>

          {/* </div> */}

          <Swiper
            modules={[Navigation, Autoplay]}
            className="relative pb-20 asm:h-[570px]"
            loop={true}
            speed={1700}
            spaceBetween={30}
            navigation={{
              nextEl: ".swiper-custom-next-project",
              prevEl: ".swiper-custom-prev-project",
            }}
            autoplay={{
              delay: 4100,
              disableOnInteraction: false,
            }}
            breakpoints={{
              750: {
                slidesPerView: 1.5, // يظهر عنصر ونصف للشاشات الصغيرة
              },
              1024: {
                slidesPerView: 2.5, // يظهر عنصرين ونصف للشاشات الأكبر
              },
            }}
          >
            {allPRoject?.data?.original?.data?.map((slide: any) => (
              <SwiperSlide
                key={slide?.id}
                className="relative text-custome-blue h-[450px] max-xl:h-[450px] max-lg:h-[440px] max-md:h-[450px] py-12"
              >
                <ProjectDeveloperCard broker={slide} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
});

{
  /* <ProjectDeveloperCard broker={developer} t={t} /> */
}

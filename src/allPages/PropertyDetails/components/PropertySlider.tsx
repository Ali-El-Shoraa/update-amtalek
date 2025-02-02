"use client";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useId } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useTranslation } from "react-i18next";

function PropertySlider({ data, style, fullWidth }: any) {
  const uniqueID = useId();
  // const lng = useSelector(lang);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [mainSwiper, setMainSwiper] = useState<any>(null);
  const { i18n, t } = useTranslation();

  const sliders =
    data?.sliders?.length > 0 && data?.primary_image
      ? [...data?.sliders, { id: uniqueID, src: data?.primary_image }]
      : data?.sliders?.length > 0
      ? [...data?.sliders]
      : [{ id: uniqueID, src: data?.primary_image }];

  return (
    <div className={`slider w-full h-auto bg-custome-white ${style}`}>
      <div className="relative">
        {sliders?.length > 3 && (
          <button
            onClick={() => mainSwiper.slidePrev()}
            className="prev-slider-btn absolute !bg-custome-white left-2 top-1/2 -translate-y-1/2 bg-transparent text-custome-blue border-2 hover:scale-105 border-custome-blue flex justify-center items-center rounded transition-all duration-300 ease-in-out active:scale-90 h-9 w-9 min-h-9 min-w-9 cursor-pointer z-10 asm:hidden"
          >
            <FontAwesomeIcon
              className="rotate-180 text-lg font-bold"
              icon={faChevronRight}
            />
          </button>
        )}
        <Swiper
          className={`ItemSlider__top--slider w-full bg-custome-white min-h-fit md:w-full mb-9 asm:h-[300px]`}
          navigation
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false, // استمر في التشغيل حتى بعد التفاعل
          }}
          modules={[Navigation, Thumbs, Autoplay]}
          thumbs={{ swiper: thumbsSwiper }}
          onSwiper={setMainSwiper}
        >
          {sliders?.map((slide) => (
            <SwiperSlide key={slide?.id}>
              <div
                className={`img-slider-wrapper w-full ${
                  fullWidth
                    ? " max-h-[600px] h-[600px] lg:max-h-[450px] lg:h-[450px]"
                    : " max-h-[450px] h-[450px]"
                } overflow-hidden round cursor-pointer`}
              >
                <Image
                  width={1000}
                  height={1000}
                  className="w-full h-full rounded asm:object-fill asm:h-[300px]"
                  src={slide?.src}
                  alt={slide?.id}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {sliders?.length > 3 && (
          <button
            onClick={() => mainSwiper.slideNext()}
            className="next-slider-btn absolute right-2 top-1/2 -translate-y-1/2 bg-custome-blue text-custome-venice border-2 border-custome-blue hover:scale-105 flex justify-center items-center rounded transition-all duration-300 ease-in-out active:scale-90 h-9 w-9 min-h-9 min-w-9 cursor-pointer z-10 asm:hidden"
          >
            <FontAwesomeIcon
              className="text-lg font-bold"
              icon={faChevronRight}
            />
          </button>
        )}
      </div>
      <div className="bottom-slider bg-custome-white relative">
        {sliders?.length > 0 && (
          <Swiper
            className="ItemSlider__bottom-slider"
            modules={[Thumbs]}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false, // استمر في التشغيل حتى بعد التفاعل
            }}
            slidesPerView={4}
            spaceBetween={10}
            centeredSlides={true}
            onSwiper={setThumbsSwiper}
            watchSlidesProgress={true}
          >
            {sliders?.map((slide, index) => (
              <SwiperSlide key={slide?.id}>
                <div
                  className={`slide__img--wrapper !w-full aspect-square border-custome-blue rounded !h-full max-h-64 max-w-56 asm:h-auto cursor-pointer transition-transform duration-300`}
                >
                  <Image
                    width={1000}
                    height={1000}
                    className="w-full !h-full object-cover rounded"
                    src={slide?.src}
                    alt={slide?.id}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}

export default PropertySlider;

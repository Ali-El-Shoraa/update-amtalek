"use client"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Slider from "react-slick";
import { useId } from "react";
import { useSelector } from "react-redux";
import { lang } from "@/Store/Features/MiscellaneousSlice";
import Image from "next/image";
function ItemSlider({ data, style, fullWidth }: any) {
  const uniqueID = useId();

  const lng = useSelector(lang);
  const [nav1, setNav1] = useState<any>();
  const [nav2, setNav2] = useState<any>();
  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }

  const sliders =
    data?.sliders?.length > 0 && data?.primary_image
      ? [...data?.sliders, { id: uniqueID, src: data?.primary_image }]
      : data?.sliders?.length > 0
      ? [...data?.sliders]
      : [{ id: uniqueID, src: data?.primary_image }];
  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }
  let commonSettings = {
    // lazyLoad: lng === "ar" ? false : "ondemand",
    //rtl: lng === "ar" ? true : false,
    //if enabled the style for the active slide doesn't be applied
    draggable: true,
    swipeToSlide: true,
    touchMove: true,
    swipe: true,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    pauseOnHover: true,
    focusOnSelect: true,
    slidesToScroll: 1,
    initialSlide: 0,
  };
  let responsiveSettings = {
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: sliders.length > 2 ? 3 : sliders.length,
        },
      },
    ],
  };

  return (
    <div className={`slider w-full h-auto ${style} bg-`}>
      <div className="relative">
        {sliders?.length > 5 && (
          <button
            onClick={() => nav1.slickPrev()}
            className="prev-slider-btn absolute !bg-bg left-2 top-1/2 -translate-y-1/2 bg-transparent text-secondary  border-2 hover:scale-105 border-secondary flex justify-center items-center round transition-all duration-300 ease-in-out active:scale-90 h-9 w-9 min-h-[36px] min-w-[36px]  cursor-pointer z-10 asm:hidden"
          >
            <FontAwesomeIcon className="rotate-180 text-lg font-bold" icon={faChevronRight} />
          </button>
        )}
        <Slider
          className={`ItemSlider__top--slider w-full bg-  min-h-fit md:w-full mb-9`}
          asNavFor={nav2}
          ref={(slider1) => setNav1(slider1)}
          fade={lng === "ar" ? false : true}
          autoplay
          nextArrow={<SampleNextArrow />}
          prevArrow={<SamplePrevArrow />}
          {...commonSettings}
          slidesToShow={1}
        >
          {sliders?.map((slide) => (
            <div
              key={slide?.id}
              className={`img-slider-wrapper w-full ${
                fullWidth
                  ? " max-h-[600px]  h-[600px] lg:max-h-[450px]  lg:h-[450px]"
                  : " max-h-[450px]  h-[450px]"
              }   overflow-hidden  round cursor-pointer `}
            >
              <Image
                width={1000}
                height={1000}
                className="w-full h-full rounded"
                src={slide?.src}
                alt={slide?.id}
              />
            </div>
          ))}
        </Slider>
        {sliders?.length > 5 && (
          <button
            onClick={() => nav2.slickNext()}
            className="next-slider-btn absolute right-2 top-1/2 -translate-y-1/2 bg-secondary text-grey  border-2 border-secondary hover:scale-105 flex justify-center items-center round transition-all duration-300 ease-in-out active:scale-90 h-9 w-9 min-h-[36px] min-w-[36px]  cursor-pointer z-10 asm:hidden"
          >
            <FontAwesomeIcon className=" text-lg font-bold" icon={faChevronRight} />
          </button>
        )}
      </div>
      <div className="bottom-slider bg- relative">
        {sliders?.length > 0 && (
          <Slider
            asNavFor={nav1}
            ref={(slider2) => setNav2(slider2)}
            {...commonSettings}
            {...responsiveSettings}
            slidesToShow={sliders.length > 4 ? 5 : sliders.length}
            className="ItemSlider__bottom-slider  "
            centerMode={true}
            centerPadding="0px"
            touchThreshold={500}
          >
            {sliders?.map((slide) => (
              <div
                key={slide?.id}
                className="  slide__img--wrapper  !w-ful aspect-square   border-secondary   round  !h-full max-h-[250px] max-w-[220px]  asm:h-auto cursor-pointer"
              >
                <Image
                  width={1000}
                  height={1000}
                  className="w-full !h-full object-cover round"
                  src={slide?.src}
                  alt={slide?.id}
                />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}

export default ItemSlider;

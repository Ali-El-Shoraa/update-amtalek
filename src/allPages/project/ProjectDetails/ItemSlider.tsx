// "use client";

// import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useState } from "react";
// import Slider from "react-slick";
// import { useId } from "react";
// import Image from "next/image";
// import { useTranslation } from "react-i18next";

// function ItemSlider({ data, style, fullWidth }: any) {
//   const uniqueID = useId();
//   const { i18n } = useTranslation();
//   const [nav1, setNav1] = useState<any>();
//   const [nav2, setNav2] = useState<any>();

//   function SampleNextArrow(props: any) {
//     const { className, style, onClick } = props;
//     return (
//       <div
//         className={className}
//         style={{ ...style, display: "block", background: "red" }}
//         onClick={onClick}
//       />
//     );
//   }

//   function SamplePrevArrow(props: any) {
//     const { className, style, onClick } = props;
//     return (
//       <div
//         className={className}
//         style={{ ...style, display: "block", background: "green" }}
//         onClick={onClick}
//       />
//     );
//   }

//   const sliders =
//     data?.sliders?.length > 0 && data?.primary_image
//       ? [...data?.sliders, { id: uniqueID, src: data?.primary_image }]
//       : data?.sliders?.length > 0
//       ? [...data?.sliders]
//       : [{ id: uniqueID, src: data?.primary_image }];

//   let commonSettings = {
//     draggable: true,
//     swipeToSlide: true,
//     touchMove: true,
//     swipe: true,
//     dots: false,
//     arrows: false,
//     infinite: true,
//     speed: 500,
//     pauseOnHover: true,
//     focusOnSelect: true,
//     slidesToScroll: 1,
//     initialSlide: 0,
//   };

//   let responsiveSettings = {
//     responsive: [
//       {
//         breakpoint: 900,
//         settings: {
//           // slidesToShow: Math.min(sliders.length, 3),
//           // settings: {
//           slidesToShow: 1, // عرض صورة واحدة عند الشاشات الصغيرة لتجنب المساحة الكبيرة
//           // },
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div className={`slider max-w-[1200px] w-full h-auto overflow-hidden mx-auto ${style}`}>
//       <div className="relative">
//         {sliders?.length > 5 && (
//           <button
//             onClick={() => nav1.slickPrev()}
//             className="prev-slider-btn absolute !bg-bg left-2 top-1/2 -translate-y-1/2 bg-transparent text-secondary border-2 hover:scale-105 border-secondary flex justify-center items-center round transition-all duration-300 ease-in-out active:scale-90 h-9 w-9 min-h-[36px] min-w-[36px] cursor-pointer z-10"
//           >
//             <FontAwesomeIcon className="rotate-180 text-lg font-bold" icon={faChevronRight} />
//           </button>
//         )}
//         <Slider
//           // className="w-full"
//           className={`ItemSlider__top--slider !w-full min-h-fit md:w-full mb-9`}
//           asNavFor={nav2}
//           ref={(slider1) => setNav1(slider1)}
//           fade={i18n.language === "ar" ? false : true}
//           autoplay
//           nextArrow={<SampleNextArrow />}
//           prevArrow={<SamplePrevArrow />}
//           {...commonSettings}
//           slidesToShow={1} // عرض صورة واحدة فقط
//           slidesToScroll={1} // التمرير صورة واحدة في كل مرة
//         >
//           <div className="">
//             {sliders?.map((slide) => (
//               <div
//                 key={slide?.id}
//                 className={`img-slider-wrapper w-full ${
//                   fullWidth
//                     ? "max-h-[600px] h-[600px] lg:max-h-[450px] lg:h-[450px]"
//                     : "max-h-[450px] h-[450px]"
//                 } overflow-hidden rounded`}
//               >
//                 <Image
//                   width={1000}
//                   height={1000}
//                   className="w-full h-full object-cover rounded"
//                   src={slide?.src}
//                   alt={slide?.id}
//                 />
//               </div>
//             ))}
//           </div>
//         </Slider>

//         {/* <Slider
//           className={`ItemSlider__top--slider w-full bg- min-h-fit md:w-full mb-9`}
//           asNavFor={nav2}
//           ref={(slider1) => setNav1(slider1)}
//           fade={i18n.language === "ar" ? false : true}
//           autoplay
//           nextArrow={<SampleNextArrow />}
//           prevArrow={<SamplePrevArrow />}
//           {...commonSettings}
//           slidesToShow={1}
//         >
//           {sliders?.map((slide) => (
//             <div
//               key={slide?.id}
//               className={`img-slider-wrapper w-full ${
//                 fullWidth
//                   ? "max-h-[600px] h-[600px] lg:max-h-[450px] lg:h-[450px]"
//                   : "max-h-[450px] h-[450px]"
//               } overflow-hidden rounded cursor-pointer`}
//             >
//               <Image
//                 width={1000}
//                 height={1000}
//                 className="w-full h-full rounded object-cover"
//                 src={slide?.src}
//                 alt={slide?.id}
//               />
//             </div>
//           ))}
//         </Slider> */}
//         {sliders?.length > 5 && (
//           <button
//             onClick={() => nav2.slickNext()}
//             className="next-slider-btn absolute right-2 top-1/2 -translate-y-1/2 bg-secondary text-grey border-2 border-secondary hover:scale-105 flex justify-center items-center round transition-all duration-300 ease-in-out active:scale-90 h-9 w-9 min-h-[36px] min-w-[36px] cursor-pointer z-10"
//           >
//             <FontAwesomeIcon className="text-lg font-bold" icon={faChevronRight} />
//           </button>
//         )}
//       </div>
//       <div className="bottom-slider bg- relative">
//         {sliders?.length > 0 && (
//           <Slider
//             asNavFor={nav1}
//             ref={(slider2: any) => setNav2(slider2)}
//             {...commonSettings}
//             {...responsiveSettings}
//             slidesToShow={Math.min(sliders.length, 5)}
//             className="ItemSlider__bottom-slider"
//             centerMode={true}
//             centerPadding="0px"
//             touchThreshold={500}
//           >
//             {sliders?.map((slide) => (
//               <div
//                 key={slide?.id}
//                 className="slide__img--wrapper w-full aspect-square border-secondary rounded !h-full max-h-[250px] max-w-[220px] cursor-pointer"
//               >
//                 <Image
//                   width={1000}
//                   height={1000}
//                   className="w-full h-full object-cover rounded"
//                   src={slide?.src}
//                   alt={slide?.id}
//                 />
//               </div>
//             ))}
//           </Slider>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ItemSlider;

// ***************************************************************************************************

// "use client";

// // import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useState } from "react";
// import Slider from "react-slick";
// import { useId } from "react";
// import Image from "next/image";
// import { useTranslation } from "react-i18next";

// function ItemSlider({ data, style, fullWidth }: any) {
//   const uniqueID = useId();
//   const { i18n } = useTranslation();
//   const [nav1, setNav1] = useState<any>();
//   const [nav2, setNav2] = useState<any>();

//   const sliders =
//     data?.sliders?.length > 0 && data?.primary_image
//       ? [...data?.sliders, { id: uniqueID, src: data?.primary_image }]
//       : data?.sliders?.length > 0
//       ? [...data?.sliders]
//       : [{ id: uniqueID, src: data?.primary_image }];

//   let commonSettings = {
//     draggable: false, // منع السحب
//     swipeToSlide: false,
//     touchMove: false,
//     swipe: false,
//     dots: false,
//     arrows: false,
//     infinite: true,
//     speed: 500,
//     pauseOnHover: true,
//     focusOnSelect: true,
//     slidesToScroll: 1,
//     initialSlide: 0,
//   };

//   let responsiveSettings = {
//     responsive: [
//       {
//         breakpoint: 900,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div className={`w-full h-auto ${style} bg-`}>
//       <div className="relative">
//         <Slider
//           // className="w-full"
//           className={`ItemSlider__top--slider w-full min-h-fit md:w-full mb-9`}
//           asNavFor={nav2}
//           ref={(slider1) => setNav1(slider1)}
//           fade={i18n.language === "ar" ? false : true}
//           autoplay
//           // nextArrow={<SampleNextArrow />}
//           // prevArrow={<SamplePrevArrow />}
//           {...commonSettings}
//           slidesToShow={1} // عرض صورة واحدة فقط
//           slidesToScroll={1} // التمرير صورة واحدة في كل مرة
//         >
//           {/* <div className=""> */}
//           {sliders?.map((slide) => (
//             <div
//               key={slide?.id}
//               className={`img-slider-wrapper w-full ${
//                 fullWidth
//                   ? "max-h-[600px] h-[600px] lg:max-h-[450px] lg:h-[450px]"
//                   : "max-h-[450px] h-[450px]"
//               } overflow-hidden rounded`}
//             >
//               <Image
//                 width={1000}
//                 height={1000}
//                 className="w-full h-full object-cover rounded"
//                 src={slide?.src}
//                 alt={slide?.id}
//               />
//             </div>
//           ))}
//           {/* </div> */}
//         </Slider>
//       </div>
//       <div className="bottom-slider bg- relative">
//         {sliders?.length > 0 && (
//           <Slider
//             asNavFor={nav1}
//             ref={(slider2: any) => setNav2(slider2)}
//             {...commonSettings}
//             {...responsiveSettings}
//             slidesToShow={Math.min(sliders.length, 5)}
//             className="ItemSlider__bottom-slider"
//             centerMode={true}
//             centerPadding="0px"
//             touchThreshold={500}
//             focusOnSelect={true} // التفاعل مع الصور الصغيرة فقط
//           >
//             {sliders?.map((slide) => (
//               <div
//                 key={slide?.id}
//                 className="slide__img--wrapper w-full aspect-square border-secondary rounded !h-full max-h-[250px] max-w-[220px] cursor-pointer"
//               >
//                 <Image
//                   width={1000}
//                   height={1000}
//                   className="w-full h-full object-cover rounded"
//                   src={slide?.src}
//                   alt={slide?.id}
//                 />
//               </div>
//             ))}
//           </Slider>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ItemSlider;

// ***************************************************************************************************
// "use client";
// import React, { useState } from "react";
// import Slider, { Settings } from "react-slick";
// import Image from "next/image";

// interface Slide {
//   src: string;
// }

// interface ItemSliderProps {
//   mainSlides: Slide[];
//   navSlides: Slide[];
// }

// const ItemSlider = ({ mainSlides, navSlides }: ItemSliderProps) => {
//   const [mainSlider, setMainSlider] = useState<any>(undefined);
//   const [navSlider, setNavSlider] = useState<any>(undefined);

//   const mainSliderSettings: Settings = {
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//     fade: true,
//     asNavFor: navSlider, // Link main slider to nav slider
//   };

//   const navSliderSettings: Settings = {
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     asNavFor: mainSlider, // Link nav slider to main slider
//     dots: true,
//     centerMode: true,
//     focusOnSelect: true, // Allow selecting thumbnail for display
//   };

//   return (
//     <div>
//       {/* Main Slider */}
//       <div className="slider-for mb-4">
//         <Slider {...mainSliderSettings} ref={setMainSlider}>
//           {mainSlides.map((slide, index) => (
//             <div key={index} className="main-slide w-full h-[400px]">
//               <Image
//                 src={slide.src}
//                 alt={`Slide ${index}`}
//                 layout="fill"
//                 objectFit="cover"
//                 className="rounded"
//               />
//             </div>
//           ))}
//         </Slider>
//       </div>

//       {/* Navigation Slider */}
//       <div className="slider-nav">
//         <Slider {...navSliderSettings} ref={setNavSlider}>
//           {navSlides.map((slide, index) => (
//             <div
//               key={index}
//               className="nav-slide w-[100px] h-[100px] border rounded overflow-hidden"
//             >
//               <Image
//                 src={slide.src}
//                 alt={`Thumbnail ${index}`}
//                 width={100}
//                 height={100}
//                 objectFit="cover"
//                 className="rounded"
//               />
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// };

// export default ItemSlider;

// ***************************************************************************************************
// "use client";

// import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useState } from "react";
// import { useId } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { lang } from "@/Store/Features/MiscellaneousSlice";
// import Image from "next/image";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Thumbs, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";
// // import Share from "@/SubComponents/Share";
// // import { setShowLoginPopUp } from "@/Store/Features/AuthenticationSlice";
// // import { CiLocationOn } from "react-icons/ci";
// import { useTranslation } from "react-i18next";
// function ItemSlider({ data, style, fullWidth }: any) {
//   const uniqueID = useId();
//   // const lng = useSelector(lang);
//   const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
//   const [mainSwiper, setMainSwiper] = useState<any>(null);
//   const { i18n, t } = useTranslation();

//   const sliders =
//     data?.sliders?.length > 0 && data?.primary_image
//       ? [...data?.sliders, { id: uniqueID, src: data?.primary_image }]
//       : data?.sliders?.length > 0
//       ? [...data?.sliders]
//       : [{ id: uniqueID, src: data?.primary_image }];

//   return (
//     <div className={`slider w-full h-auto bg-custome-white ${style}`}>
//       <div className="relative">
//         {sliders?.length > 3 && (
//           <button
//             onClick={() => mainSwiper.slidePrev()}
//             className="prev-slider-btn absolute !bg-custome-white left-2 top-1/2 -translate-y-1/2 bg-transparent text-custome-blue border-2 hover:scale-105 border-custome-blue flex justify-center items-center rounded transition-all duration-300 ease-in-out active:scale-90 h-9 w-9 min-h-9 min-w-9 cursor-pointer z-10 asm:hidden"
//           >
//             <FontAwesomeIcon className="rotate-180 text-lg font-bold" icon={faChevronRight} />
//           </button>
//         )}
//         <Swiper
//           className={`ItemSlider__top--slider w-full bg-custome-white min-h-fit md:w-full mb-9 asm:h-[300px]`}
//           navigation
//           loop={true}
//           autoplay={{
//             delay: 3000,
//             disableOnInteraction: false, // استمر في التشغيل حتى بعد التفاعل
//           }}
//           modules={[Navigation, Thumbs, Autoplay]}
//           thumbs={{ swiper: thumbsSwiper }}
//           onSwiper={setMainSwiper}
//         >
//           {sliders?.map((slide) => (
//             <SwiperSlide key={slide?.id}>
//               <div
//                 className={`img-slider-wrapper w-full ${
//                   fullWidth
//                     ? " max-h-[600px] h-[600px] lg:max-h-[450px] lg:h-[450px]"
//                     : " max-h-[450px] h-[450px]"
//                 } overflow-hidden round cursor-pointer`}
//               >
//                 <Image
//                   width={1000}
//                   height={1000}
//                   className="w-full h-full rounded asm:object-fill asm:h-[300px]"
//                   src={slide?.src}
//                   alt={slide?.id}
//                 />
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//         {sliders?.length > 3 && (
//           <button
//             onClick={() => mainSwiper.slideNext()}
//             className="next-slider-btn absolute right-2 top-1/2 -translate-y-1/2 bg-custome-blue text-custome-venice border-2 border-custome-blue hover:scale-105 flex justify-center items-center rounded transition-all duration-300 ease-in-out active:scale-90 h-9 w-9 min-h-9 min-w-9 cursor-pointer z-10 asm:hidden"
//           >
//             <FontAwesomeIcon className="text-lg font-bold" icon={faChevronRight} />
//           </button>
//         )}
//       </div>
//       <div className="bottom-slider bg-custome-white relative">
//         {sliders?.length > 0 && (
//           <Swiper
//             className="ItemSlider__bottom-slider"
//             modules={[Thumbs]}
//             loop={true}
//             autoplay={{
//               delay: 3000,
//               disableOnInteraction: false, // استمر في التشغيل حتى بعد التفاعل
//             }}
//             slidesPerView={4}
//             spaceBetween={10}
//             centeredSlides={true}
//             onSwiper={setThumbsSwiper}
//             watchSlidesProgress={true}
//           >
//             {sliders?.map((slide, index) => (
//               <SwiperSlide key={slide?.id}>
//                 <div
//                   className={`slide__img--wrapper !w-full aspect-square border-custome-blue rounded !h-full max-h-64 max-w-56 asm:h-auto cursor-pointer transition-transform duration-300`}
//                 >
//                   <Image
//                     width={1000}
//                     height={1000}
//                     className="w-full !h-full object-cover rounded"
//                     src={slide?.src}
//                     alt={slide?.id}
//                   />
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         )}
//       </div>
//     </div>
//   );
// }
// export default ItemSlider;

// ***************************************************************************************************

"use client";

// import { useId } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "./ItemSlider.css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function ItemSlider({ data }: any) {
  // const uniqueID = useId();

  // const sliders =
  //   // && data?.primary_image
  //   data?.sliders?.length > 0
  //     ? [...data?.sliders, { id: uniqueID, src: data?.image }]
  //     : data?.sliders?.length > 0
  //     ? [...data?.sliders]
  //     : [{ id: uniqueID, src: data?.image }];

  const pagination = {
    clickable: true,
    renderBullet: (index: number, className: string) =>
      // !w-6 !h-6 !rounded-full flex items-center justify-center
      `<span class="${className}  text-xs text-white">${index + 1}</span>`,
  };

  return (
    <div className="flex flex-col items-center justify-center slider w-full">
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        pagination={pagination}
        autoplay={{
          delay: 3000, // التحكم في وقت الانتقال التلقائي (3000ms = 3 ثواني)
          disableOnInteraction: false, // الاستمرار في التشغيل التلقائي حتى بعد التفاعل
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="w-full h-[500px] relative !m-0"
      >
        {data?.sliders?.map((slide: any, index: number) => (
          <SwiperSlide
            key={index}
            className="relative rounded-xl text-center text-lg bg-white flex items-center justify-center"
          >
            <Image
              width={1000}
              height={1000}
              src={slide?.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

// export default ItemSlider;
// ***************************************************************************************************

// "use client";
// import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useId, useState } from "react";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";
// import { Navigation, Thumbs, Autoplay } from "swiper/modules";

// function ItemSlider({ data, style, fullWidth }: any) {
//   const uniqueID = useId();
//   const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
//   const [mainSwiper, setMainSwiper] = useState<any>(null);

//   const sliders =
//     data?.sliders?.length > 0 && data?.primary_image
//       ? [...data?.sliders, { id: uniqueID, src: data?.primary_image }]
//       : data?.sliders?.length > 0
//       ? [...data?.sliders]
//       : [{ id: uniqueID, src: data?.primary_image }];

//   return (
//     <div className={`slider w-full h-auto overflow-hidden ${style}`}>
//       <div className="relative w-full">
//         {sliders?.length > 1 && (
//           <button
//             onClick={() => mainSwiper?.slidePrev()}
//             className="prev-slider-btn absolute !bg-custome-white left-2 top-1/2 -translate-y-1/2 bg-transparent text-custome-blue border-2 hover:scale-105 border-custome-blue flex justify-center items-center rounded transition-all duration-300 ease-in-out active:scale-90 h-9 w-9 cursor-pointer z-10"
//           >
//             <FontAwesomeIcon className="rotate-180 text-lg font-bold" icon={faChevronRight} />
//           </button>
//         )}

//         <Swiper
//           className={`ItemSlider__top--slider w-full`}
//           navigation={{
//             nextEl: ".next-slider-btn",
//             prevEl: ".prev-slider-btn",
//           }}
//           loop={true}
//           autoplay={{
//             delay: 3000,
//             disableOnInteraction: false,
//           }}
//           modules={[Navigation, Thumbs, Autoplay]}
//           thumbs={{ swiper: thumbsSwiper }}
//           onSwiper={setMainSwiper}
//         >
//           {sliders?.map((slide) => (
//             <SwiperSlide key={slide?.id}>
//               <div
//                 className={`img-slider-wrapper w-full ${
//                   fullWidth
//                     ? "max-h-[600px] h-[600px] lg:max-h-[450px] lg:h-[450px]"
//                     : "max-h-[450px] h-[450px]"
//                 } overflow-hidden rounded`}
//               >
//                 <Image
//                   width={1000}
//                   height={1000}
//                   className="w-full h-full object-cover rounded"
//                   src={slide?.src}
//                   alt={slide?.id}

//                 />
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {sliders?.length > 1 && (
//           <button
//             onClick={() => mainSwiper?.slideNext()}
//             className="next-slider-btn absolute right-2 top-1/2 -translate-y-1/2 bg-custome-blue text-custome-white border-2 hover:scale-105 border-custome-blue flex justify-center items-center rounded transition-all duration-300 ease-in-out active:scale-90 h-9 w-9 cursor-pointer z-10"
//           >
//             <FontAwesomeIcon className="text-lg font-bold" icon={faChevronRight} />
//           </button>
//         )}
//       </div>

//       {sliders?.length > 1 && (
//         <div className="bottom-slider bg-custome-white mt-4">
//           <Swiper
//             className="!ItemSlider__bottom-slider"
//             modules={[Thumbs]}
//             loop={true}
//             slidesPerView={4}
//             spaceBetween={10}
//             centeredSlides={true}
//             onSwiper={setThumbsSwiper}
//             watchSlidesProgress={true}
//           >
//             {sliders?.map((slide) => (
//               <SwiperSlide key={slide?.id}>
//                 <div className="w-full aspect-square border-custome-blue rounded cursor-pointer transition-transform duration-300 hover:scale-105">
//                   <Image
//                     width={1000}
//                     height={1000}
//                     className="w-full h-full object-cover rounded"
//                     src={slide?.src}
//                     alt={slide?.id}
//                   />
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ItemSlider;

// **************************************************************************************************

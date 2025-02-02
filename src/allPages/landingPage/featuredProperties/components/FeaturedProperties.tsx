// /* eslint-disable react-hooks/exhaustive-deps */
// "use client";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
// import { memo, useCallback, useRef } from "react";
// import Slider from "react-slick";
// // import { FeaturedPropertyCard } from "../../../Components/CardsComponents/index.ts";
// // import { userData, setShowLoginPopUp } from "../../../Store/Features/AuthenticationSlice.tsx";
// import { useDispatch, useSelector } from "react-redux";
// // import { AdContainer, Heading, SubHeading } from "@/MainComponents/index";
// // import { OwnCountry, lang } from "../../../Store/Features/MiscellaneousSlice.tsx";
// import { useTranslation } from "react-i18next";
// import { setShowLoginPopUp, userData } from "@/Store/Features/AuthenticationSlice";
// import Heading from "@/components/Heading";
// import SubHeading from "@/MainComponents/SubHeading";
// import FeaturedPropertyCard from "./FeaturedPropertyCard";
// import AdContainer from "./AdContainer";

// const MemoizedFeaturedProperties = memo(function FeaturedProperties({ data, ads, countrie }: any) {
//   const { t, i18n } = useTranslation("Pages_LandingPage");

//   const user = useSelector(userData);
//   const dispatchRedux = useDispatch();
//   // const lng = useSelector(lang);
//   const slider = useRef<any>(null);
//   let settings = {
//     lazyLoad: "ondemand",
//     rtl: i18n.language === "ar" ? true : false,
//     draggable: true,

//     swipeToSlide: true,
//     touchMove: true,
//     swipe: true,
//     dots: false,
//     arrows: false,
//     infinite: true,
//     speed: 2000,
//     autoplaySpeed: 5000,
//     autoplay: true,
//     // cssEase: "linear",
//     pauseOnHover: true,
//     focusOnSelect: false,
//     slidesToShow: data?.cards?.[0]?.length > 2 ? 2 : data?.cards?.[0]?.length,
//     slidesToScroll: 1,
//     initialSlide: 0,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//     responsive: [
//       {
//         breakpoint: 750,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//         },
//       },
//     ],
//   };
//   function SampleNextArrow(props: any) {
//     const { className, style, onClick } = props;
//     const handleClick = useCallback(() => {
//       onClick();
//     }, [slider]);
//     return (
//       <div
//         className={className}
//         style={{ ...style, display: "block", background: "red" }}
//         onClick={handleClick}
//       />
//     );
//   }

//   function SamplePrevArrow(props: any) {
//     const { className, style, onClick } = props;
//     const handleClick = useCallback(() => {
//       onClick();
//     }, [slider]);
//     return (
//       <div
//         className={className}
//         style={{ ...style, display: "block", background: "green" }}
//         onClick={handleClick}
//       />
//     );
//   }

//   if (data?.cards?.[0]?.length < 1) {
//     return;
//   }

//   // const { i18n } = useTranslation();
//   // const theCountry = useSelector(OwnCountry);
//   const theCountry = countrie;

//   return (
//     <section
//       className={`h-auto bg-  site_container mt-14 ${
//         ads?.[0] ? "min-h-[1000px] clg:min-h-[700px]" : "min-h-[650px] clg:min-h-[500px]"
//       }  bg-red-`}
//     >
//       <div className="featured__title--slider--arrows w-full flex justify-between items-center gap-4 mb-5 ">
//         <div className="featured__title w-full">
//           <Heading className={"md:text-xl w-full"} style={"asm:text-center"}>
//             {data?.title} {i18n.language === "ar" ? "في" : "in"} {theCountry?.title}
//           </Heading>
//           <SubHeading style={"asm:text-center"}>{data?.sub_title} </SubHeading>
//         </div>
//         {data?.cards?.[0]?.length > 2 && (
//           <div
//             className={`featured__slider--arrows flex justify-end gap-5 items-center asm:hidden ${
//               data?.cards?.[0]?.length <= 2 && "hidden"
//             }`}
//           >
//             <button
//               onClick={() => slider.current.slickPrev()}
//               className="prev-slider-btn bg-transparent text-secondary  border-2 border-secondary hover:scale-105 flex justify-center items-center round transition-all duration-300 ease-in-out active:scale-90 h-10 w-10"
//             >
//               <FontAwesomeIcon
//                 className="rotate-180 rtl:rotate-0 text-lg font-bold transition-all duration-300 ease-in-out active:scale-90 "
//                 icon={faChevronRight}
//               />
//             </button>
//             <button
//               onClick={() => slider.current.slickNext()}
//               className="prev-slider-btn bg-secondary text-bg  border-2 border-secondary hover:scale-105 flex justify-center items-center round transition-all duration-300 ease-in-out active:scale-90 h-10 w-10"
//             >
//               <FontAwesomeIcon
//                 className=" text-lg font-bold rtl:rotate-180"
//                 icon={faChevronRight}
//               />
//             </button>
//           </div>
//         )}
//       </div>
//       <div className="featured-slider h-auto w-full overflow-x-hidden">
//         <Slider className="featured__properties--slider px-3" ref={slider} {...settings}>
//           {data?.cards?.[0]?.map((slide: any) => (
//             <FeaturedPropertyCard
//               key={slide?.id}
//               slide={slide}
//               user={user}
//               ShowLoginPopUp={() => dispatchRedux(setShowLoginPopUp(true))}
//               t={t}
//             />
//           ))}
//         </Slider>
//       </div>

//       {ads?.[0] && (
//         <AdContainer
//           src={ads?.[0]?.image}
//           alt={ads?.[0]?.image}
//           title={ads?.[0]?.title}
//           sub_title={ads?.[0]?.sub_title}
//           link={ads?.[0]?.link}
//           alignment="H"
//           className="mt-10"
//         />
//       )}
//     </section>
//   );
// });

// export default MemoizedFeaturedProperties;

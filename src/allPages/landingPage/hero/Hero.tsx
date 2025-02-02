"use client";
import { memo, Suspense, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import Image from "next/image.js";

import LangLink from "@/components/LangLink";

const MemoizedHero = memo(function Hero({ data, locale }: any) {
  const { t } = useTranslation("Pages_LandingPage");
  const [dataClient, setDataClient] = useState<any>();
  const [click, setClick] = useState<any>();

  const header = useRef<any>(null);
  const makeNavFixed = useRef<any>(null);
  const makeNavNotFixed = useRef<any>(null);

  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.update(); // تحديث Swiper عند تغيير البيانات
    }
  }, [data, swiperInstance]);
  useEffect(() => {
    const handleScroll = () => {
      let headerHeight = header?.current?.getBoundingClientRect().top;
      if (parseInt(headerHeight) < 5) {
        header?.current?.classList.add("navbar__sticky");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const options2 = {
    root: null,
    rootMargin: "-88px 0px 0px 0px",
    threshold: 0,
  };

  function handleIntersect2(entries: any, observer: any) {
    entries.map((entry: any) => {
      if (entry.isIntersecting) {
        header?.current?.classList.remove("navbar__sticky");
      }
    });
  }

  // const swiperRef = useRef<any>(null);

  useEffect(() => {
    const observer: any = new IntersectionObserver(handleIntersect2, options2);
    observer.observe(makeNavNotFixed.current);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="w-full relative alg:h-auto">
      <section className="h-[calc(560px)] alg:h-fit w-full relative flex alg:flex-col alg:justify-start alg:items-center justify-end items-start">
        {/* ss:h-[558px] */}
        <div className="hero__images--slider w-full h-full alg:h-scree absolute alg:static inset-0 bg-grey asm:h-[450px]">
          {data ? (
            <Swiper
              onSwiper={(swiper) => setSwiperInstance(swiper)} // الحصول على مثيل Swiper
              modules={[Autoplay, EffectFade]}
              autoplay={{ delay: 3000 }}
              effect={"slider"}
              speed={500}
              loop={true}
              slidesPerView={1}
            >
              {data?.map((slide: any) => (
                <SwiperSlide key={slide?.id}>
                  <div
                    className={`w-full !h-[558px] relative !flex items-start justify-start rtl:justify-start`}
                  >
                    <picture>
                      <Image
                        width={1000}
                        height={1000}
                        className="w-full h-full bg-no-repeat bg-cover absolute inset-0 -z-10 asm:h-[450px]"
                        style={{ backgroundBlendMode: "overlay" }}
                        src={`${slide?.image}?w=1600`}
                        alt="Slide Image"
                        priority
                      />
                    </picture>

                    <div className="hero__left--text-CTA text-bg w-fit h-full pl-[3.3vw] alg:pl-[0vw] rtl:pl-[0vw] rtl:pr-[3.3vw] alg:pr-[0vw] !flex !flex-col justify-end items-start rtl:items-end alg:rtl:items-center max-w-[55%] alg:max-w-[90%] alg:items-center alg:justify-center alg:gap-2 alg:h-screen alg:mx-auto bg- relative z-40 ss:justify-start ss:pt-20">
                      <h1 className="text-5xl asm:text-3xl text-start rtl:ml-auto ltr:mr-auto alg:mx-auto font-medium leading-[52.8px] alg:text-center rtl:rtl">
                        {slide?.title} <br className="alg:hidden" />{" "}
                        {slide?.subtitle}
                      </h1>
                      <h2 className="mb-9 mt-8 text-[17px] font-medium leading-tight alg:text-center alg:max-w-[70%] md:max-w-full alg:mx-auto rtl:ml-auto">
                        {slide?.description.substring(0, 200)}
                        {slide?.description.length > 200 && "..."}
                      </h2>

                      <LangLink
                        onClick={() =>
                          window.sessionStorage.setItem("step", "1")
                        }
                        className="mb-[65px] w-[190px] h-[50px] min-h-[50px] text-sm font-medium flex justify-center alg:mx-auto bg-custome-yellow text-secondary hover:bg-transparent border-custome-yellow transition-all duration-300 items-center border-[1px] rounded-[4px] hover:text-custome-yellow hover:border-custome-yellow rtl:ml-auto asm:mb-0"
                        to={`/search/`}
                      >
                        {t("Hero.CTA_Text")}
                      </LangLink>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <Image
              priority
              width={200}
              height={300}
              style={{
                backgroundImage: `url("/assets/images/hero-slider-1.jpg"),linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3))`,
                backgroundBlendMode: "overlay",
              }}
              alt="hero_img"
              className="w-full h-full bg-no-repeat bg-cover"
              src={""}
            />
          )}
        </div>

        <div className="hero__right--header-form h-full w-[40vw] min-w-[610px] xxxl:min-w-[410px] md:min-w-[300px] alg:w-full alg:h-fit relative z-30 ">
          <Suspense fallback={"<Loader />"}>
            {/* <SearchFormForm
              click={click}
              setDataClient={setDataClient}
              home
              type={"bigForm"}
              locale={locale}
            /> */}
          </Suspense>
        </div>
      </section>
      <div
        ref={makeNavFixed}
        className="make__nav--fixed absolute bottom-20 bg-transparent w-full h-2 pointer-events-none"
      ></div>
      <div
        ref={makeNavNotFixed}
        className="make__nav--not--fixed absolute bottom-0 bg-transparent w-full h-2 pointer-events-none"
      ></div>
    </section>
  );
});

export default MemoizedHero;

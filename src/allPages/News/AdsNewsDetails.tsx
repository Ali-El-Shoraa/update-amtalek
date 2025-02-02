// "use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

SwiperCore.use([Autoplay, Pagination, Navigation]);

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import Loader from "@/components/Loader";

const AdsNewsDetails = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  // api ADS
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL_GET_DATA}ads-getter/news-page`
        );
        const data = await response.json();
        setAds(() => data?.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ads:", error);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  // this function to know how much pepole click the ADS
  const trackAdClick = async (adId: never) => {
    try {
      // await getData(`click-on-ad/${adId}`);
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_GET_DATA}click-on-ad/${adId}`
      );
    } catch (error) {
      console.error("Error tracking ad click:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    ads?.length > 0 && (
      <section className="w-full h-full mx-auto clg:w-[330px]">
        <div className="">
          {/* start slider */}
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            loop={true}
            speed={3200}
            className="mySwiper transition-all ease-in-out delay-300"
          >
            {ads.map((ad) => {
              // const isImageURLValid = isValidURL(ad["image"]) && !containsScript(ad["image"]);

              return (
                // start slice of slider
                <SwiperSlide key={ad["id"]}>
                  <a
                    href={ad["url"] || "#"}
                    className="block"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackAdClick(ad["id"])}
                  >
                    {ad["image"] ? (
                      <Image
                        src={ad["image"]}
                        alt={`Ad ${ad["id"]}`}
                        className="object-cover"
                        width={1000}
                        height={10.0}
                      />
                    ) : (
                      <div className="max-w-full max-h-[220px] bg-gray-200 flex items-center justify-center">
                        <span>Image not available</span>
                      </div>
                    )}
                  </a>
                </SwiperSlide>
                // end slice of slider
              );
            })}
          </Swiper>
          {/* end slider */}
        </div>
      </section>
    )
  );
};

export default AdsNewsDetails;

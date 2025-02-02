"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

SwiperCore.use([Autoplay, Pagination, Navigation]);

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import "../../../SASS/styles.scss";

const AdsCategoryDetails = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  // api ADS
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL_GET_DATA}ads-getter/category-news`
        );
        const data = await response.json();
        setAds(data?.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ads:", error);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  const router = useRouter();

  // this function to know how much pepole click the ADS
  const trackAdClick = async (adId: any) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_GET_DATA}click-on-ad/${adId}`
      );
    } catch (error) {
      console.error("Error tracking ad click:", error);
    }
  };

  if (loading) {
    return "";
  }

  return (
    ads?.length > 0 && (
      // <section className="bg-gray-100">
      <div className="w-[360px] h-[490px] mx-auto">
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
          {ads?.map((ad) => {
            return (
              <SwiperSlide key={ad?.["id"]}>
                <Link
                  href={ad?.["url"] || "#"}
                  className="block"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAdClick(ad?.["id"])}
                >
                  {ad?.["id"] ? (
                    <Image
                      width={1000}
                      height={1000}
                      src={ad?.["image"]}
                      alt={`Ad ${ad?.["id"]}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span>Image not available</span>
                    </div>
                  )}
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      // </section>
    )
  );
};

export default AdsCategoryDetails;

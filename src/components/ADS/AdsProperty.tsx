"use client";

import { useEffect, useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import Image from "next/image";
import Link from "next/link";
import getData from "@/lib/api/getData";

interface Ad {
  id: number;
  image: string;
  url: string;
}

const AdsProperty = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Ads
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await getData("ads-getter/property-page", "");
        const data: Ad[] = response?.data || [];
        setAds(data);
      } catch (error) {
        console.error("Error fetching ads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  // Track Ad Click
  const trackAdClick = async (adId: number) => {
    try {
      await getData(`click-on-ad/${adId}`, "");
    } catch (error) {
      console.error("Error tracking ad click:", error);
    }
  };

  // Validate URL
  const isValidURL = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  // Memoize Ads for Rendering
  const filteredAds = useMemo(
    () =>
      ads.filter(
        (ad) => isValidURL(ad.image) && ad.image.indexOf("<script") === -1
      ),
    [ads]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!filteredAds.length) {
    return <div>No ads available</div>;
  }

  return (
    <div className="w-full h-full mx-auto clg:w-[330px]">
      <Swiper
        spaceBetween={30}
        centeredSlides
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop
        speed={1000}
        className="mySwiper transition-all ease-in-out delay-300"
      >
        {filteredAds.map((ad) => (
          <SwiperSlide key={ad.id}>
            <Link
              href={ad.url || "#"}
              className="block"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackAdClick(ad.id)}
            >
              <Image
                width={1000}
                height={1000}
                src={ad.image}
                alt={`Ad ${ad.id}`}
                className="w-full h-full object-cover"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AdsProperty;

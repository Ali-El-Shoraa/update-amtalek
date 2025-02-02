"use client";
import { useEffect, useRef, useState } from "react";
import { FaCircleXmark } from "react-icons/fa6";

export default function VideoPopUp({ data, onClose }: any) {
  const [play, setPlay] = useState(true); // افتراضياً الفيديو يعمل
  const VideoPopUpContent = useRef(null);

  // إغلاق الفيديو عند الضغط على الخلفية أو الزر
  const handleClose = () => {
    setPlay(false); // إيقاف الفيديو
    if (onClose) onClose(); // استدعاء الدالة التي تم تمريرها لإغلاق الفيديو في المكون الرئيسي
  };

  return (
    <section
      onClick={(e) => {
        // إذا تم النقر خارج محتوى الفيديو، أغلق الفيديو
        if (e.target === VideoPopUpContent.current) {
          handleClose();
        }
      }}
      className={`w-full h-screen ${
        play ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      } trns fixed inset-0 z-[1000]`}
    >
      <div className="relative w-full h-full flex justify-center items-center">
        <div className="VideoPopUp__absolute absolute h-full w-full bg-custome-blue opacity-40"></div>

        {/* زر الإغلاق */}
        <FaCircleXmark
          onClick={handleClose} // عند الضغط على زر الإغلاق
          className="absolute top-10 right-10 text-5xl cursor-pointer text-custome-white"
        />

        <div
          ref={VideoPopUpContent}
          className={`aspect-video site_container overflow-hidden rounded-xl ${
            play ? "scale-100" : "scale-0"
          }`}
        >
          <iframe
            loading="lazy"
            src={`https://www.youtube.com/embed/${data?.video_link?.substring(32)}`}
            width="100%"
            height="100%"
            title="Video player"
            allow="accelerometer; fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}

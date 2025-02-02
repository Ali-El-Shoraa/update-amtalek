"use client";
import { useState } from "react";
import VideoPopUp from "./VideoPopUp";

export default function VideoBtn({ data }: any) {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <>
      <div
        style={{
          backgroundImage: `url('${data?.image}')`,
          backgroundSize: "100% 100%",
          backgroundAttachment: "scroll",
        }}
        className={`w-1/2 flex-1 h-[500px] amd:static right-0 rtl:right-auto rtl:left-0 top-28 bg-fixed bg-no-repeat bg-center bg-cover bg-blend-overlay flex justify-center items-center round shadow-2xl shadow-secondary/40 amd:w-full`}
      >
        <button
          className="play-btn"
          onClick={() => setShowVideo(true)} // عرض الفيديو عند الضغط على الزر
        >
          {/* <FaPlay /> */}
        </button>
      </div>
      {showVideo && <VideoPopUp data={data} onClose={() => setShowVideo(false)} />}
    </>
  );
}

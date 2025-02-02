import { useState } from "react";
import Image from "next/image";

function LightBox({ data }: any) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!data || data.length === 0) {
    return null; // إخفاء المكون إذا لم يكن هناك بيانات.
  }

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const closeLightbox = () => setOpen(false);

  const nextSlide = () =>
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data?.length);

  const prevSlide = () =>
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );

  return (
    <section className="flex flex-wrap justify-center gap-4">
      {data.map((slide: any, index: number) => (
        <div
          key={index}
          className="w-[150px] h-[150px] overflow-hidden rounded-md relative group"
        >
          <Image
            width={500}
            height={500}
            src={slide?.image}
            alt={slide?.title || "Slide"}
            className="w-full h-full object-cover cursor-pointer group-hover:scale-110 transition-all duration-300 ease-in-out"
            onClick={() => openLightbox(index)}
          />
        </div>
      ))}

      {/* Lightbox */}
      {open && (
        // inset-0 bg-black/80
        <div className="fixed flex justify-center inset-0 items-center z-50">
          <div
            className="absolute w-full h-full bg-black/80"
            onClick={closeLightbox}
          ></div>
          <div className="relative w-[90%] md:w-[70%] lg:w-[50%] max-h-[700px]">
            <button
              className="absolute -top-9 right-4 text-white text-2xl"
              onClick={closeLightbox}
            >
              ✕
            </button>
            <Image
              width={1000}
              height={1000}
              src={data?.[currentIndex]?.image}
              alt={data?.[currentIndex]?.title || "Slide"}
              className="w-full max-h-[700px] object-contain"
            />
            <div className="text-white text-center mt-4">
              {/* <h3 className="text-xl font-bold">
                {data?.[currentIndex]?.title || "No Title"}
              </h3> */}
              <p className="text-sm">
                {data?.[currentIndex]?.description || ""}
              </p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={prevSlide}
                className="text-white text-2xl p-2 hover:scale-110 transition bg-secondary rounded"
              >
                ⬅
              </button>
              <button
                onClick={nextSlide}
                className="text-white text-2xl p-2 hover:scale-110 transition bg-secondary rounded"
              >
                ➡
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default LightBox;

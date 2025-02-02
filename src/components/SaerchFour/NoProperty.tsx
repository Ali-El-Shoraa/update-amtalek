"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function NoProperty({ h, message, result, setStep }: any) {
  const router = useRouter();
  const { i18n } = useTranslation();

  return (
    <section
      className={`w-full flex flex-col ${result && "gap-5"} ${
        h === "screen" ? "h-[calc(100vh-136px)]" : "h-full"
      } flex justify-center items-center`}
    >
      {result && (
        <>
          <Image src="/images/404.png" alt="no-property" width={500} height={500} />
          <p className="w-full text-center font-bold text-5xl">{message}</p>
          <button
            className="bg-custome-blue block w-52 mx-auto px-4 py-3 text-custome-white border-2 border-custome-blue rounded transition-colors duration-300 ease-in-out hover:text-custome-blue hover:bg-transparent "
            onClick={() => {
              setStep((prev: any) => prev - 1);
              router.back(); // استخدم router.back() للعودة إلى الصفحة السابقة
            }}
          >
            {i18n.language === "ar" ? "العودة" : "Back"}
          </button>
        </>
      )}
    </section>
  );
}

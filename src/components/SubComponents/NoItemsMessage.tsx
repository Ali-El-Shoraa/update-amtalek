"use client";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

function NoItemsMessage({ h, message, result, setStep }: any) {
  const router = useRouter();
  const { i18n } = useTranslation();

  return (
    <section
      className={`w-full flex flex-col ${result && "gap-5"} ${
        h === "screen" ? "h-[calc(100vh-136px)]" : "h-full"
      } flex justify-center items-center`}
    >
      <p className="w-full">{message}</p>
      {result && (
        <button
          className="bg-primary/80 text-white rounded-xl hover:text-primary hover:bg-white border transition duration-300 text-lg px-5"
          onClick={() => {
            setStep((prev: any) => prev - 1);
            router.back(); // استخدم router.back() للعودة إلى الصفحة السابقة
          }}
        >
          {i18n.language === "ar" ? "العودة" : "Back"}
        </button>
      )}
    </section>
  );
}

export default NoItemsMessage;

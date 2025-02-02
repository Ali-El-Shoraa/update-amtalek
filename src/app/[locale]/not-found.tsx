"use client";
import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Error from "next/error";

export default memo(function NotFound() {
  const { t, i18n } = useTranslation("Pages_NotFound");

  const lang = i18n.language;
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/`);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [lang, router]);

  if (Error)
    //return <Error statusCode={404} />;
    return (
      <section className="flex  items-center justify-center min-h-[calc(100vh-136px)] bg- w-full mb-20 md:py-20">
        {/* <HelmetTags title={t("tab.title")} description={t("tab.description")} /> */}

        <div className="flex justify-center items-center gap-10 site_container md:flex-col md:items-center">
          <div className="w-1/2  md:w-full flex justify-center">
            <Image
              className="w-[440px] h-[440px]"
              width={440}
              height={440}
              src="/images/404.png"
              alt="404"
            />
          </div>

          <div className="w-1/2  md:w-full flex flex-col md:items-center">
            <h1 className="font-bold text-7xl">{t("heading")}</h1>
            <h2 className="font-medium text-2xl my-3">{t("sub_heading")}</h2>
            <h3 className="opacity-70 sm:text-center">{t("txt")}</h3>
            <button
              onClick={() => router.push(`/`)}
              className=" border-2 round w-[200px] h-[50px] flex justify-center items-center font-medium border-secondary text-md  bg-secondary text-bg duration-300 ease-in-out transition-all hover:bg-transparent hover:text-secondary active:scale-90 mt-10"
            >
              {t("CTA_txt")}
            </button>
          </div>
        </div>
      </section>
    );
});

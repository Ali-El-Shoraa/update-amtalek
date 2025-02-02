import initTranslations from "@/app/i18n";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

export default memo(async function ImagesSection({ data, locale }: any) {
  const { i18n } = await initTranslations(locale, [""]);

  function checkLink(link: string) {
    if (!link) return link;

    // إزالة الاستعلامات بعد "search"
    if (link.includes("search")) {
      link = link.split("?")[0]; // الاحتفاظ بالرابط الأساسي بدون الاستعلامات
    }

    if (link?.includes("https://amtalek.com/ar")) {
      return `${i18n.language === "ar" ? "" : "/en"}${
        link?.split("https://amtalek.com/ar")[1]
      }`;
    } else if (link?.includes("https://amtalek.com/en")) {
      return `${i18n.language === "ar" ? "" : "/en"}${
        link?.split("https://amtalek.com/en")[1]
      }`;
    } else if (link?.includes("https://amtalek.com")) {
      return `${i18n.language === "ar" ? "" : ""}${
        link?.split("https://amtalek.com")[1]
      }`;
    } else return link;
  }

  // if (!data || data.length === 0) {
  //   return <Loader />; // يمكن استبدالها بما يناسبك
  // }

  return (
    data.length > 0 && (
      <section className="w-full bg-gray-100 py-10">
        <div className="site_container grid grid-cols-3 gap-3 md:grid-cols-1">
          {data?.map((card: any) => (
            <Link
              key={card?.id}
              className="relative h-[260px] alg:h-[200px] clg:h-[200px] md:h-[260px] bg-white"
              href={`${checkLink(card?.link)}`}
            >
              <Image
                loading="lazy"
                src={card?.image}
                alt="img"
                layout="fill"
                objectFit="contain"
                className="w-full h-full absolute"
              />
              <div className="z-20 w-1/2 ss:w-1/2 flex flex-col rtl:ms-auto p-2 relative justify-center gap-4 h-full">
                <span className="text-2xl text-black font-bold clg:text-[12px] md:text-md xl:text-[14px] ">
                  {card?.title}
                </span>
                <span className="text-base text-black font-bold clg:text-[12px] md:text-[14px] amd:text-[10px]">
                  {card?.sub_title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    )
  );
});

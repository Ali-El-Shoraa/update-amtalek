import initTranslations from "@/app/i18n";
import Heading from "@/components/Heading";
import LangLink from "@/components/LangLink";
import NewsCard from "@/components/NewsCard";
import SubHeading from "@/components/SubHeading";
import { memo } from "react";

const LatestNews = memo(async function LatestNews({
  data,
  locale,
  className,
}: any) {
  // const { t } = useTranslation("Pages_LandingPage");
  const { t } = await initTranslations(locale, ["Pages_LandingPage"]);

  if (data?.cards?.length < 1) {
    return;
  }

  return (
    <section className={`h-auto   bg-dark-gray  -mb-20  pb-12 `}>
      <section className="  site_container min-h-[700pw] md:!h-[1200px] py-20 flex flex-col items-center">
        <Heading style={"asm:text-center"}>{data?.title}</Heading>
        <SubHeading style={"asm:text-center"}>{data?.sub_title} </SubHeading>

        <div className="latest__properties--cards w-full grid grid-cols-3 md:grid-cols-1 gap-4 my-10 h-[300px] ">
          {data?.cards?.map((news: any) => (
            // t={t}
            <NewsCard homePage key={news?.id} news={news} />
          ))}
        </div>

        <LangLink
          to="/news"
          className="login__bt font-bold border-2 round w-[200px] h-[50px] flex justify-center items-center border-secondary text-sm  bg-secondary text-bg duration-300 ease-in-out transition-all hover:bg-transparent hover:text-secondary active:scale-90"
        >
          {t("LatestNews.main_CTA")}
        </LangLink>
      </section>
    </section>
  );
});

export default LatestNews;

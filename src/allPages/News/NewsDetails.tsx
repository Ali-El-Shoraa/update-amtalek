"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useMemo } from "react";
import AdsNewsDetails from "./AdsNewsDetails";
import Image from "next/image";
import Share from "@/components/Share";
import Heading from "@/components/Heading";

import FeaturedPropertiesAside from "../PropertyDetails/aside/components/FeaturedPropertiesAside";
import { useParams } from "next/navigation";
import Link from "next/link";
import Loader from "@/components/Loader";
import getData from "@/lib/api/getData";
import { ErrorMessage } from "@/components/SubComponents";
import NewsCard from "@/components/NewsCard";

export default function NewsDetails({ tit }: any) {
  const { t, i18n } = useTranslation("Pages_NewsDetails");
  // const { id }: any = useParams();
  const { title, id }: any = useParams();

  const [data, setdata] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isResize1016, setIsResize1016] = useState(false);

  const formattedTitle = tit?.replace(/-/g, " ").replace(/,/g, ", ");

  const fetchNewsDetails = async () => {
    setIsLoading(true);
    try {
      const response = await getData(
        `web/${process.env.NEXT_PUBLIC_SINGLE_NEW_DETAILS}${id}`,
        i18n.language
      );
      // if (!response.ok) {
      //   throw new Error("Network response was not ok");
      // }
      // const data = await response.json();
      const data = response?.data?.[0];

      setdata(data);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  useEffect(() => {
    const handleResize = () => {
      setIsResize1016(window.innerWidth > 1016);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // استخدام useMemo لتخزين بيانات الأخبار
  const memoizedData = useMemo(() => data, [data]);

  if (isError) {
    return (
      <div className="h-[calc(100vh-136px)] flex-center w-full">
        <ErrorMessage message={t("ErrorMessage")} />
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    memoizedData && (
      <section className="site_container flex justify-between items-start pt-20 gap-0 clg:gap-20 pb-32 clg:pb-44 clg:flex-col clg:items-center clg:justify-start ss:pt-2">
        <section className="news__Details--content w-[66%] flex flex-col gap-6 clg:w-full">
          <div className="min-h-[360px] ss:min-h-fit w-full h-fit">
            <h1 className="mt-2 font-extrabold text-3xl clg:text-xl md:text-lg ss:text-md">
              {memoizedData?.title}
            </h1>

            <div className="news__author--date flex justify-start gap-2 flex-col my-[20px]">
              <Link
                href={`${
                  i18n.language.startsWith("ar") ? "" : "/en"
                }/news/categories/${memoizedData?.category_details?.name.replace(
                  / /g,
                  "-"
                )}`}
                className=" bg-secondary20 text-secondary font-medium px-3 py-1 round w-fit cursor-pointer"
              >
                {memoizedData?.category_details?.name}
              </Link>
              <h2 className="flex items-center gap-2">
                <FontAwesomeIcon className="" icon={faCalendarDays} />
                {memoizedData?.created_at}
              </h2>
            </div>

            <div className="h-[400px] ss:h-[220px]">
              <Image
                width={400}
                height={400}
                // h-full w-full
                className="h-full w-full"
                src={memoizedData?.image}
                alt={memoizedData?.title}
              />
            </div>
          </div>
          <Share
            data={memoizedData}
            t={t}
            type="article"
            file={"Pages_PropertyDetails"}
          />

          <div
            className="mb-5"
            dangerouslySetInnerHTML={{
              __html: memoizedData?.description,
            }}
          ></div>

          {!isResize1016 && <AdsNewsDetails />}

          <Heading style="my-5">{t("LATEST_NEWS")}</Heading>

          <div className="all__properties--wrapper w-full grid grid-cols-2 mb-10 gap-5 ss:grid-cols-1">
            {memoizedData?.latest_news?.map((news: any) => (
              <NewsCard key={news?.id} news={news} t={t} />
            ))}
          </div>
        </section>

        <section className="news__Details--aside w-[31%] clg:w-3/4 md:w-full h-fit flex flex-col clg:items-center gap-8">
          {isResize1016 && <AdsNewsDetails />}

          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6367957675332720"
            crossOrigin="anonymous"
          ></script>

          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-6367957675332720"
            data-ad-slot="5248586810"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>

          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>

          <FeaturedPropertiesAside />
        </section>
      </section>
    )
  );
}

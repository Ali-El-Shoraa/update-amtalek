"use client";
import { useTranslation } from "react-i18next";
import { memo, useState } from "react";
import { motion } from "framer-motion";
import AdsCategoryDetails from "./AdsCategoryDetails";
import Heading from "@/components/Heading";

import LatestProperties from "../PropertyDetails/aside/components/LatestProperties";
import FeaturedPropertiesAside from "../PropertyDetails/aside/components/FeaturedPropertiesAside";
import NewsCard from "@/components/NewsCard";
import { NoItemsMessage } from "@/components/SubComponents";

export const CategoryDetails = memo(function CategoryDetails({
  dataNews,
}: any) {
  const { t } = useTranslation("Pages_CategoryDetails");
  const [filteredNews, setFilteredNews] = useState<any>(
    dataNews?.news?.data || []
  );

  // فلترة الأخبار بناءً على إدخال المستخدم
  const handleFilter = (searchTerm: string) => {
    if (searchTerm.trim() === "") {
      setFilteredNews(dataNews?.news?.data);
    } else {
      const filtered = dataNews?.news?.data?.filter((news: any) =>
        news?.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNews(filtered);
    }
  };

  return (
    <section className="site_container flex justify-between items-start pt-20 gap-0 clg:gap-4 pb-32 clg:pb-44 clg:flex-col clg:items-center clg:justify-start">
      <section className="news__Details--content w-[66%] flex flex-col gap-6 clg:w-full">
        {/* حقل البحث */}
        <input
          onChange={(e) => handleFilter(e.target.value)}
          placeholder={t("placeholder")}
          type="text"
          className="w-full border outline-none rounded-xl bg-slate-100 p-2 mb-9"
        />
        <Heading style="text-center">{dataNews?.title}</Heading>
        <div
          className="flex items-center justify-center"
          dangerouslySetInnerHTML={{ __html: dataNews?.description }}
        ></div>
        <h3 className="text-2xl text-center font-medium ">{t("ALL_NEWS")}</h3>
        <motion.div
          layout
          className="all__properties--wrapper w-full grid-auto-fit mb-10"
        >
          {filteredNews?.map((news: any) => (
            <NewsCard key={news?.id} news={news} t={t} />
          ))}
          {filteredNews?.length === 0 && (
            <NoItemsMessage message={t("NoItemsMessage")} />
          )}
        </motion.div>
      </section>
      <section className="news__Details--aside w-[31%] clg:w-3/4 md:w-full h-fit flex flex-col clg:items-center gap-16">
        {/* <Link aria-label="ads" href="/ad"> */}
        <AdsCategoryDetails />
        {/* </Link> */}
        <LatestProperties />
        <FeaturedPropertiesAside />
      </section>
    </section>
  );
});

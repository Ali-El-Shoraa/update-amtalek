"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import Heading from "@/components/Heading";
import ReactPaginate from "react-paginate";
import getData from "@/lib/api/getData";
import Loader from "@/components/Loader";
import { ErrorMessage, NoItemsMessage } from "@/components/SubComponents";
import NewsCard from "@/components/NewsCard";

export default function News() {
  const { t, i18n } = useTranslation("Pages_News");
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchNews = async (keyword = "") => {
    try {
      setIsLoading(true);
      const response = await getData(
        `web/${process.env.NEXT_PUBLIC_NEWS}?keyword=${keyword}&page=${page}`,
        i18n.language
      );

      const data = response?.data?.original;
      setNews(data?.data || []);
      setTotalPages(data?.meta?.last_page || 0);
    } catch (error) {
      setIsError(true);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setPage(1);
      fetchNews(filteredNews); // تنفيذ البحث بعد 500 مللي ثانية من توقف الكتابة
    }, 500); // يمكنك تغيير هذه القيمة (500 مللي ثانية)

    return () => clearTimeout(delayDebounceFn); // إلغاء التنفيذ إذا تغيرت القيمة قبل انتهاء المهلة
  }, [filteredNews]);

  useEffect(() => {
    fetchNews(filteredNews);
  }, [page]);

  const filteredItems =
    filteredNews?.length > 0
      ? news.filter((newsItem: any) =>
          newsItem?.title.toLowerCase().includes(filteredNews.toLowerCase())
        )
      : news;

  return (
    <section className="site_container pt-10 pb-32">
      <input
        value={filteredNews}
        onChange={(e) => setFilteredNews(e.target.value)}
        placeholder={t("placeholder")}
        type="text"
        className="w-full border outline-none rounded-xl bg-slate-100 p-2 mb-9"
      />
      <Heading style={"text-center"}>{t("heading")}</Heading>
      {isLoading ? (
        <Loader />
      ) : (
        <motion.div
          className="all__news--wrapper w-full grid grid-cols-3 gap-5 clg:grid-cols-2 ss:grid-cols-1 my-10"
          layout
        >
          <AnimatePresence>
            {isError ? (
              <ErrorMessage message={t("ErrorMessage")} />
            ) : filteredItems.length === 0 ? (
              <NoItemsMessage message={t("NoItemsMessage")} />
            ) : (
              // filteredItems
              news?.map((newsItem: any) => (
                <motion.div
                  key={newsItem?.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <NewsCard news={newsItem} t={t} />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {totalPages > 1 && (
        <ReactPaginate
          previousLabel={t("Pagination.Next")}
          nextLabel={t("Pagination.Previous")}
          breakLabel={"..."}
          pageCount={totalPages}
          onPageChange={({ selected }) => setPage(selected + 1)}
          marginPagesDisplayed={3}
          pageRangeDisplayed={5}
          containerClassName="pagination__wrapper"
          activeClassName="active__page--pagination"
          previousClassName="custom-previous-class"
          nextClassName="custom-next-class"
          // containerClassName={"flex justify-center mt-4 gap-2"}
          // pageClassName={"px-4 py-2 border rounded"}
          // activeClassName={"bg-secondary text-white"}
          // previousClassName={"px-4 py-2 border rounded"}
          // nextClassName={"px-4 py-2 border rounded bg-secondary text-white"}
          // disabledClassName={"opacity-50"}
        />
      )}
    </section>
  );
}

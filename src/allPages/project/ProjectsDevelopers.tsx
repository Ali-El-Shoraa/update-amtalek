"use client";

import { useState, useEffect, useMemo, memo } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Heading from "@/components/Heading";
import Image from "next/image";
import ProjectDeveloperCard from "./components/ProjectDeveloperCard";
import getData from "@/lib/api/getData";
import Loader from "@/components/Loader";

const ProjectsDevelopers = memo(function ProjectsDevelopers({
  locale,
  data,
}: any) {
  const { t, i18n } = useTranslation("Pages_Projects");

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 9;

  const [activeCity, setActiveCity] = useState<number | null>(null);
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const [activeDeveloper, setActiveDeveloper] = useState<number | null>(null);

  const [state, setState] = useState({
    allDevelopers: [],
    totalPages: 1,
    countries: null,
  });

  // Debounce effect for search term
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPageData(
        activeCity,
        activeYear,
        activeDeveloper,
        searchTerm || null
      );
    }, 500); // تأخير 500 مللي ثانية

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, activeCity, activeYear, activeDeveloper]);

  // Fetch data with filters and pagination
  const fetchPageData = async (
    cityId: number | null = null,
    year: number | null = null,
    developerId: number | null = null,
    keyword: string | null = null
  ) => {
    setIsLoading(true);

    const query = new URLSearchParams();
    if (cityId) query.append("region", cityId.toString());
    if (year) query.append("year", year.toString());
    if (developerId) query.append("company_id", developerId.toString());
    if (keyword) query.append("keyword", keyword);

    try {
      const developers = await getData(
        `web/projects?page=${currentPage}&limit=${itemsPerPage}&${query.toString()}`,
        locale
      );
      const AllCountries = await getData("web/countries", locale);

      setState({
        allDevelopers: developers?.data?.original?.data || [],
        totalPages: developers?.data?.original?.meta?.last_page || 1,
        countries: AllCountries?.data?.[0] || null,
      });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data when page or filters change
  useEffect(() => {
    fetchPageData(activeCity, activeYear, activeDeveloper, searchTerm || null);
  }, [currentPage, locale]);

  // Handle filter clicks
  const handleCityClick = (cityId: number) => {
    setActiveCity(activeCity === cityId ? null : cityId);
  };

  const handleYearClick = (year: number) => {
    setActiveYear(activeYear === year ? null : year);
  };

  const handleDeveloperClick = (developerId: number) => {
    setActiveDeveloper(activeDeveloper === developerId ? null : developerId);
  };

  // Handle page change
  const handlePageChange = (selectedItem: any) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  // Memoized filtered developers
  const filteredDevelopers = useMemo(
    () => state.allDevelopers,
    [state.allDevelopers]
  );

  return (
    <div className="pt-10 pb-0">
      <div className="">
        <input
          type="text"
          placeholder={t("placeholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-slate-100 outline-none border p-3 rounded-xl mx-auto flex mb-5 w-full ss:w-full"
        />
      </div>

      <div className="space-y-3 mb-3 p-5">
        <h3 className="text-2xl font-bold asmm:text-center">
          {t("developers.filter.developer")}
        </h3>
        <hr />

        {/* Filter by City */}
        <div className="flex items-center justify-start gap-10 asmm:flex-col">
          <h3 className="text-xl font-bold">{t("developers.filter.city")}: </h3>
          <div className="flex items-center justify-start gap-10 py-3 overflow-x-auto asmm:w-full">
            {data?.cities?.map((city: any) => (
              <button
                key={city?.id}
                onClick={() => handleCityClick(city?.id)}
                className={`text-sm py-1 px-2 rounded whitespace-nowrap ${
                  activeCity === city?.id
                    ? "bg-secondary text-white"
                    : "bg-grey text-secondary hover:bg-secondary hover:text-white"
                }`}
              >
                {city?.name}
              </button>
            ))}
          </div>
        </div>
        <hr />

        {/* Filter by Delivery Date */}
        <div className="flex items-center justify-start gap-10 asmm:flex-col">
          <h3 className="text-xl font-bold whitespace-nowrap">
            {t("developers.filter.delivery_date")}:
          </h3>
          <div className="flex items-center justify-start gap-10 overflow-x-auto asmm:w-full py-3">
            {data?.years
              ?.sort(function (a: any, b: any) {
                return a - b;
              })
              ?.map(
                (year: any, index: number) =>
                  year !== null &&
                  year !== undefined &&
                  year !== "" && (
                    <button
                      key={index}
                      onClick={() => handleYearClick(year)}
                      className={`text-sm py-1 px-2 rounded whitespace-nowrap ${
                        activeYear === year
                          ? "bg-secondary text-white"
                          : "bg-grey text-secondary hover:bg-secondary hover:text-white"
                      }`}
                    >
                      {year}
                    </button>
                  )
              )}
          </div>
        </div>
        <hr />

        {/* Filter by Developer */}
        <div className="flex items-center justify-start gap-10 asmm:flex-col">
          <h3 className="text-xl font-bold whitespace-nowrap">
            {t("developers.filter.filter_title")}:
          </h3>
          <div className="flex items-center justify-start gap-10 overflow-x-auto asmm:w-full">
            {data?.developers?.map((developer: any) => (
              <div
                key={developer?.id}
                onClick={() => handleDeveloperClick(developer?.id)}
                className={`bg-grey text-secondary py-3 px-7 font-bold rounded-[8px] flex gap-3 items-center justify-center cursor-pointer ${
                  activeDeveloper === developer?.id
                    ? "border-2 border-secondary"
                    : ""
                }`}
              >
                <Image
                  width={64}
                  height={64}
                  src={developer?.logo}
                  className="w-8 h-8"
                  alt=""
                />
                <h3 className="whitespace-nowrap">
                  {developer?.company_name?.[i18n.language]}
                </h3>
              </div>
            ))}
          </div>
        </div>
        <hr />
      </div>

      <div className="">
        <Heading style={"clg:mx-auto"}>{t("developers.lates_proj")}</Heading>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {filteredDevelopers.length > 0 ? (
            <div className="all__news--wrapper w-full grid grid-cols-3 gap-x-5 gap-y-20 my-10 md:grid-cols-1 xl:grid-cols-2 border-b-2 pb-24 border-secondary">
              {filteredDevelopers.map((developer: any, ind: number) => (
                <motion.div
                  key={ind}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: ind * 0.1 }}
                >
                  <div className="space-y-20">
                    <ProjectDeveloperCard broker={developer} t={t} />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p>{t("noResults")}</p>
          )}
        </>
      )}
    </div>
  );
});

export default ProjectsDevelopers;

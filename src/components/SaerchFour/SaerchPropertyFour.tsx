"use client";
import {
  memo,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import useSessionStorageState from "use-session-storage-state";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  setShowLoginPopUp,
  userData,
} from "@/Store/Features/AuthenticationSlice";
import { usePostData } from "@/Hooks/usePostData";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import SearchFormForm from "./SaerchFormFour";
import ComboBoxSelect from "./ComboBoxSelect";
import NoProperty from "./NoProperty";
import Loader from "../Loader";
import { ErrorMessage } from "../SubComponents";
import Pagination from "./components/Pagination";
import AdsSearchAside from "./components/AdsSearchAside";
import FeaturedPropertiesAside from "@/allPages/PropertyDetails/aside/components/FeaturedPropertiesAside";
import SearchPropertyCard from "./components/SearchPropertyCard";
import LatestProperties from "@/allPages/PropertyDetails/aside/components/LatestProperties";
import AdsSearch from "./components/AdsSearch";
const PropertiesMemoized = memo(function PropertiesMemoized({
  data,
  isLoading,
}: any) {
  const user = useSelector(userData);
  const dispatchRedux = useDispatch();
  const { t, i18n } = useTranslation("Pages_SearchProperty");

  const dataBeforADS = data?.slice(0, 4);
  const dataAfterADS = data?.slice(dataBeforADS.length, data.length);

  return (
    <>
      <div>
        {isLoading || !data ? (
          <Loader />
        ) : (
          <Suspense fallback={<Loader />}>
            <div className="all__properties--wrapper w-full grid-auto-fit my-10">
              {dataBeforADS?.map((property: any, i: number) => (
                <SearchPropertyCard
                  key={i}
                  property={property}
                  makeBgLight
                  user={user}
                  t={t}
                  ShowLoginPopUp={() => dispatchRedux(setShowLoginPopUp(true))}
                  i18n={i18n}
                />
              ))}
            </div>
            {/*  */}

            {/* start ADS */}
            <AdsSearch />
            {/* end ADS */}

            {/*  */}
            <div className="all__properties--wrapper w-full grid-auto-fit my-10">
              {dataAfterADS?.map((property: any, i: number) => (
                <SearchPropertyCard
                  key={i}
                  property={property}
                  makeBgLight
                  user={user}
                  t={t}
                  ShowLoginPopUp={() => dispatchRedux(setShowLoginPopUp(true))}
                  i18n={i18n}
                />
              ))}
            </div>
          </Suspense>
        )}
      </div>
    </>
  );
});

// ****************************************************************************************

export function SearchPropertyFour({
  location,
  purpose,
  propertyTypes,
  propertyFinishing,
  currencies,
  country,
  cities,
  amenities,
}: any) {
  const { t, i18n } = useTranslation("Pages_SearchProperty");

  let searchParams: any = useSearchParams();
  const URLParams: any = Object.fromEntries(searchParams.entries());

  const { mutate, isLoading, isError, isPaused, data }: any = usePostData(
    false,
    () => {},
    true,
    () => {}
  );

  // const [step, setStep] = useState(1);
  const [step, setStep] = useSessionStorageState("step", {
    defaultValue: 1,
  });
  useEffect(() => {
    const updateStep = () => {
      if (!searchParams.get("purpose")) {
        setStep(1);
      } else if (!searchParams.get("property_type")) {
        setStep(2);
      } else if (
        !searchParams.get("city") &&
        !searchParams.get("sub_region") &&
        !searchParams.get("region")
      ) {
        setStep(3);
      } else if (!searchParams.get("region")) {
        setStep(4);
      } else if (!searchParams.get("sub_region")) {
        setStep(5);
      } else {
        setStep(6); // إنهاء العملية إذا كانت كل القيم موجودة.
      }
    };

    updateStep();
  }, [searchParams, setStep]);
  const [title, setTitle] = useState("");
  const pathname = usePathname();
  // const lng = useSelector(lang);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [isCitySearch, setIsCitySearch] = useState(
    searchParams.get("fc") == 1 ? true : false
  );

  const RegionID =
    location?.find((item: any) => item.title === URLParams.region)?.id || "";

  const propertyTypeID =
    propertyTypes?.find((item: any) => item?.title === URLParams?.property_type)
      ?.id || "";
  const purposeID =
    purpose?.find((item: any) => item?.title === URLParams?.purpose)?.id || "";
  const currenciesID =
    currencies?.find((item: any) => item?.title === URLParams?.currency)?.id ||
    "";
  const propertyFinishingID =
    propertyFinishing?.find((item: any) => item?.title === URLParams?.finishing)
      ?.id || "";

  const citiesID =
    cities?.find((item: any) => item?.title === URLParams?.city)?.id || "";

  const amenitiesID = URLParams.amenities
    ? amenities
        .map((amenity: { title: string; id: string }) => {
          const found = URLParams.amenities
            .split("-")
            ?.find((item: string) => item === amenity.title);
          return found ? amenity.id : null;
        })
        .filter((id: number) => id !== null) // تصفية القيم null
    : [];

  const sub_regionID =
    data?.data?.original?.[2]?.all_sub_regions?.find(
      (item: any) => item?.title === URLParams?.sub_region
    )?.id || "";
  const sub_regionData = data?.data?.original?.[2]?.all_sub_regions;

  //**********************************************************************************************
  const RegionTitle =
    location?.find((item: any) => item?.title === URLParams?.region)?.title ||
    "";

  const propertyTypeTitle =
    propertyTypes?.find((item: any) => item?.title === URLParams?.property_type)
      ?.title || "";
  const purposeTitle =
    purpose?.find((item: any) => item?.title === URLParams?.purpose)?.title ||
    "";
  const currenciesTitle =
    currencies?.find((item: any) => item?.title === URLParams?.currency)
      ?.title || "";
  const propertyFinishingTitle =
    propertyFinishing?.find((item: any) => item?.title === URLParams?.finishing)
      ?.title || "";

  const citiesTitle =
    cities?.find((item: any) => item?.title === URLParams?.city)?.title || "";

  const countryTitle = country && country[0].title;

  const sub_regionTitle = URLParams?.sub_region;

  const params = isCitySearch
    ? {
        city: URLParams.city === "" ? "" : citiesID || "",
        page: page,
      }
    : {
        keyword: URLParams.keyword?.replace(/-/g, " ") || "",
        region: RegionID, // URLParams.region === "-1" ? "" : URLParams.region || "", //RegionTitle,
        sub_region: sub_regionID,
        city: citiesID, //URLParams.c === "-1" ? "" : URLParams.c || "",
        country: 1, //countryTitle, //URLParams.cr === "-1" ? "" : URLParams.cr || "",
        property_type: propertyTypeID, //URLParams.t || "",
        min_beds: URLParams.min_beds || "",
        min_bathes: URLParams.min_bathes || "",
        purpose: purposeID, //URLParams.pr || "",
        min_area: URLParams.min_area || "",
        max_area: URLParams.max_area || "",
        min_price: URLParams.min_price || "",
        max_price: URLParams.max_price || "",
        finishing: propertyFinishingID, //URLParams.f || "",
        currency: currenciesID, //URLParams.cur || "",
        page: URLParams.page,
        amenities: JSON.stringify(amenitiesID),
      };
  // ******************************************************************************************

  // ****************************************************************************************
  const sortingOptions = [
    { title: t("sorting_select.Featured"), id: 1 },
    { title: t("sorting_select.Normal"), id: 2 },
    { title: t("sorting_select.price_High"), id: 3 },
    { title: t("sorting_select.price_Low"), id: 4 },
  ];
  let tit = "";
  useEffect(() => {
    if (
      propertyTypeTitle &&
      purposeTitle &&
      (sub_regionTitle || RegionTitle || citiesTitle || countryTitle)
    ) {
      tit = `${propertyTypeTitle} ${purposeTitle} ${t("in")} ${
        sub_regionTitle || RegionTitle || citiesTitle || countryTitle
      }`;
      // ********************************
    } else if (
      (propertyTypeTitle || purposeTitle) &&
      (sub_regionTitle || RegionTitle || citiesTitle || countryTitle)
    ) {
      tit = `${propertyTypeTitle || purposeTitle} ${t("in")} ${
        sub_regionTitle || RegionTitle || citiesTitle || countryTitle
      }`;
      // ********************************
    } else if (purposeTitle) {
      tit = `${purposeTitle} ${t("properties_word")} ${
        RegionTitle || citiesTitle || countryTitle
      }`;
      // ********************************
    } else {
      tit = `${t("properties_word")} ${t("in")} ${
        sub_regionTitle || RegionTitle || citiesTitle || countryTitle
      }`;
      // ********************************
    }

    setTitle(() => tit);

    window.scrollTo({ top: 0 });

    //!this logic to handle the search, the search depends only on the changes happened in the url, so the search form, sort by selections, regions section, and pagination don't trigger the search request directly, instead they make a change in the url and this useEffect listens for the changes in the url params then trigger the search request

    //!the search depends on the yrl only to handle the case of copy and paste the url or bookmark it then open it in a different tab and displaying the same search results

    //!the backend needs to set a key for the normal /featured and another key for price high / low, but in the front the 4 selections are grouped together in th selectbox and in the data (id, title)

    const priority_keys =
      URLParams.srt == sortingOptions[0].title
        ? "featured"
        : URLParams.srt == sortingOptions[1].title
        ? "normal"
        : null;
    const price_arrange_keys =
      URLParams.srt == sortingOptions[3].title ? "asc" : "desc";
    const finalData =
      isCitySearch && priority_keys
        ? {
            ...params,
            price_arrange_keys: price_arrange_keys,
            priority_keys: priority_keys,
          }
        : isCitySearch
        ? {
            ...params,
            price_arrange_keys: price_arrange_keys,
          }
        : priority_keys && pathname?.length > 0
        ? {
            ...params,
            priority_keys: priority_keys,
            // amenities: JSON.stringify(location),
            price_arrange_keys: price_arrange_keys,
          }
        : pathname?.length > 0
        ? {
            ...params,
            // amenities: JSON.stringify(location),
            price_arrange_keys: price_arrange_keys,
          }
        : priority_keys
        ? {
            ...params,
            priority_keys: priority_keys,
            price_arrange_keys: price_arrange_keys,
          }
        : {
            ...params,
            price_arrange_keys: price_arrange_keys,
          };

    mutate({
      api: `${process.env.NEXT_PUBLIC_BASE_URL_GET_DATA}web/search-property`,
      data: finalData,
    });
  }, [
    URLParams.keyword,
    URLParams.region,
    URLParams?.sub_region,
    URLParams.city,
    URLParams.cr,
    URLParams.property_type,
    URLParams.cr,
    URLParams.currency,
    URLParams.finishing,
    URLParams.purpose,
    URLParams.min_bathes,
    URLParams.min_beds,
    URLParams.min_area,
    URLParams.max_area,
    URLParams.min_price,
    URLParams.max_price,
    URLParams.srt,
    URLParams.page,
    URLParams.amenities,
    pathname,
    i18n.language,
  ]);

  if (isLoading) {
    return <Loader />;
  }

  function Filters({
    data,
  }: {
    data: {
      properties_count: number;
      id: number;
      title: string;
    }[];
  }) {
    const [slice, setSlice] = useState<number>(9);
    const { t } = useTranslation("Pages_SearchProperty");
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const URLParams = Object.fromEntries(searchParams.entries());

    const handleSliceClick = useCallback(() => {
      setSlice((prev) => (prev === 9 ? data?.length : 9));
    }, [data?.length]);

    const handleFilterClick = useCallback(
      (prop: any) => {
        const newParams = { ...URLParams };

        // إذا لم يتم اختيار الهدف
        if (!searchParams.get("purpose")) {
          newParams.purpose = prop?.title;
          newParams.page = "1";
        }
        // إذا لم يتم اختيار نوع العقار
        else if (!searchParams.get("property_type")) {
          newParams.property_type = prop?.title;
          newParams.page = "1";
        }
        // إذا لم يتم اختيار المدينة، وتأكد من عدم وجود region أو sub_region
        else if (
          !searchParams.get("city") &&
          !searchParams.get("region") &&
          !searchParams.get("sub_region")
        ) {
          newParams.city = prop?.title;
          newParams.page = "1";
        }
        // إذا لم يتم اختيار المنطقة
        else if (!searchParams.get("region")) {
          newParams.region = prop?.title;
          newParams.page = "1";
        }
        // إذا لم يتم اختيار المنطقة الفرعية
        else if (!searchParams.get("sub_region")) {
          newParams.sub_region = prop?.title;
          newParams.page = "1";
        }

        const queryString = new URLSearchParams(newParams).toString();
        router.push(`${pathname}?${queryString}`);
      },
      [URLParams, searchParams, router, pathname]
    );

    const NotEqualZero = useMemo(() => {
      return data?.filter((prop) => prop?.properties_count !== 0);
    }, [data]);

    if (!NotEqualZero?.length) return null;

    return (
      <div className="w-full grid grid-cols-4 min-h-[100px] ss:grid-cols-2 mt-10 bg-[#edf3f8] gap-5 p-2 rounded relative">
        {NotEqualZero?.slice(0, slice)?.map((prop) => (
          <button
            key={prop?.id}
            onClick={() => handleFilterClick(prop)}
            className="hover:underline col-span-1 text-[14px] text-start"
          >
            {prop?.title} ({prop?.properties_count})
          </button>
        ))}
        {NotEqualZero?.length > 9 && (
          <button
            onClick={handleSliceClick}
            className="absolute ltr:right-2 hover:underline bottom-1 rtl:left-2"
          >
            {slice === 9 ? t("show_more_word") : t("show_less_word")}
          </button>
        )}
      </div>
    );
  }

  const getFilteredData = () => {
    switch (step) {
      case 1:
        return data?.data?.original?.[2]?.property_purpose;
      case 2:
        return data?.data?.original?.[2]?.property_types;
      case 3:
        return data?.data?.original?.[2]?.all_cities;
      case 4:
        return data?.data?.original?.[2]?.all_regions;
      case 5:
        return data?.data?.original?.[2]?.all_sub_regions;
      default:
        return [];
    }
  };

  return (
    <>
      <section className="w-full">
        {/* <HelmetTags title={t("tab.title")} description={t("tab.description")} /> */}
        <section className=" site_container  bg- flex justify-between items-start pt-20 amd:pt-10 gap-0 clg:gap-20 pb-32 clg:pb-44 clg:flex-col clg:items-center clg:justify-start">
          <section className="SearchProperty__main--section min-h-screen w-[66%] bg- clg:w-full">
            {isError || isPaused ? (
              <ErrorMessage message={t("ErrorMessage")} />
            ) : isLoading ? (
              <Loader />
            ) : data?.data?.original?.[0]?.data?.length === 0 ? (
              <NoProperty
                setStep={setStep}
                result
                message={t("NoItemsMessage")}
              />
            ) : (
              // <NoItemsMessage setStep={setStep} result message={t("NoItemsMessage")} />
              <Suspense fallback={<Loader />}>
                <section className="w-full ">
                  {data && (
                    <>
                      <div className="selection_options--props--count flex ss:flex-col justify-between items-center flex-wrap gap-4 asm:justify-center asm:mb-9">
                        <h1 className=" text-3xl ss:text-lg md:text-md clg:text-lg font-semibold asm:text-center uppercase">
                          {title}
                        </h1>
                        <div className="min-w-[160px]">
                          {/* <ComboBox */}
                          <ComboBoxSelect
                            selectBox
                            placeholder={t("sorting_select.placeholder")}
                            setSearchParams={searchParams}
                            searchParams={searchParams}
                            data={sortingOptions}
                            light
                            shadow
                            getDefaultValueFromURL="srt"
                          />
                        </div>
                      </div>
                      <h2 className="Properties_counts text-base opacity-120 mt-3 asm:text-center flex gap-2 items-center">
                        ( {data?.data?.original?.[1]?.total_props} ){" "}
                        {t("properties_word")}
                        {data?.data?.original?.[1]?.featured_count > 0 && (
                          <span className="bg-red500 text-bg px-3 py-1.5  inline-flex items-center w-fit rounded-full text-sm mx-3 gap-2">
                            {data?.data?.original?.[1]?.featured_count} {""}
                            {t("featured_word")}
                          </span>
                        )}
                        {data?.data?.original?.[1]?.normal_count > 0 && (
                          <span className="bg-secondary text-bg px-3 py-1.5  inline-flex items-center w-fit rounded-full text-sm ">
                            {data?.data?.original?.[1]?.normal_count}{" "}
                            {t("normal_word")}
                          </span>
                        )}
                      </h2>
                      {/* start */}
                    </>
                  )}
                  {step <= 5 && <Filters data={getFilteredData()} />}

                  <PropertiesMemoized
                    isLoading={isLoading}
                    data={data?.data?.original?.[0]?.data}
                  />
                  {data?.data?.original?.[0]?.meta?.last_page > 1 && (
                    <Pagination
                      page={page}
                      t={t}
                      setPage={setPage}
                      data={data?.data?.original?.[0]}
                      //isPreviousData={isPreviousData}
                    />
                  )}
                </section>
              </Suspense>
            )}
          </section>

          <section className=" SearchProperty__aside w-[31%] clg:w-3/4 md:w-full h-fit flex flex-col clg:items-center gap-8 amd:gap-5">
            <div className="w-full clg:hidden">
              <SearchFormForm type={"asideForm"} showOptions />
            </div>
            <div className="w-full hidden clg:block">
              <SearchFormForm type={"bigForm"} showOptions />
            </div>

            {/* start ads */}
            <AdsSearchAside />
            {/* end ads */}

            <LatestProperties />
            <FeaturedPropertiesAside />
          </section>
        </section>
      </section>
    </>
  );
}

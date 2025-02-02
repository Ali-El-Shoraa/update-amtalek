"use client";

import { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useRouter, useSearchParams } from "next/navigation";

import ComboBoz from "@/FormComponents/ComboBoz";
import getData from "@/lib/api/getData";
import { CheckBox } from "@/FormComponents";
import AmenitiesSelect from "@/FormComponents/AmenitiesSelect";

function SearchForm({ type, showOptions = false, home, locale }: any) {
  const { t, i18n } = useTranslation("MainComponents_SearchForm");

  const [LocationsData, setLocationData] = useState([]);
  const [PurposeData, setPurposeData] = useState([]);
  const [PropertyTypesData, setPropertyTypesData] = useState([]);
  const [PropertyFinishingData, setPropertyFinishingData] = useState([]);
  const [amenitiesData, setamenitiesData] = useState([]);
  const [currenciesData, setCurrenciesData] = useState([]);

  async function fetchData() {
    const location = await getData(
      `web/${process.env.NEXT_PUBLIC_ALL_LOCATIONS}`,
      i18n.language
    );
    setLocationData(location?.data);

    const Purpose = await getData(
      `web/${process.env.NEXT_PUBLIC_PROPERTY_PURPOSE}`,
      i18n.language
    );
    setPurposeData(Purpose?.data);

    const PropertyTypes = await getData(
      `web/${process.env.NEXT_PUBLIC_PROPERTY_TYPES}`,
      i18n.language
    );
    setPropertyTypesData(PropertyTypes?.data);

    const PropertyFinishing = await getData(
      `web/${process.env.NEXT_PUBLIC_PROPERTY_FINISHING}`,
      i18n.language
    );
    setPropertyFinishingData(PropertyFinishing?.data);

    const currencies = await getData(`web/currencies`, i18n.language);
    setCurrenciesData(currencies?.data);

    const amenities = await getData(
      `web/${process.env.NEXT_PUBLIC_PROPERTY_AMENITIES}`,
      i18n.language
    );
    setamenitiesData(amenities?.data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  function reducer(state: any, action: any) {
    switch (action.type) {
      case "setToggleAmentiasOptions": {
        return {
          ...state,
          toggleAmentiasOptions: action.payload,
        };
      }

      default:
        throw Error("Unknown action: " + action.type);
    }
  }

  const lang = i18n.language?.startsWith("ar") ? "" : "/en";

  const router = useRouter();
  let searchParams = useSearchParams();

  const URLParams = Object.fromEntries(searchParams.entries());

  // const storedQueryParams = JSON.parse(localStorage.getItem("queryParams") || "");
  // const URLParams: any = new URLSearchParams(storedQueryParams);

  const [state, dispatch] = useReducer(reducer, {
    toggleAmentiasOptions: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    getValues,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      amenities: [],
      keyword: URLParams.k?.replace(/-/g, " ") || "",
      region: URLParams.r || "-1",
      property_type: URLParams.t || "",
      min_beds: URLParams.b || "",
      min_bathes: URLParams.p || "",
      purpose: URLParams.pr || "",
      min_area: URLParams.af || "",
      max_area: URLParams.at || "",
      min_price: URLParams.pf || "",
      max_price: URLParams.pt || "",
      finishing: URLParams.f || "",
      currency: URLParams.cur || "",
    },
  });

  const onSubmit = useCallback(
    (data: any) => {
      if (isValid) {
        const amenities = data?.amenities
          .filter((item: any) => typeof item !== "boolean")
          .map((item: any) => parseInt(item));
        // srt is set to 0 initially because it is handled from the search page (sort by) not from the from, also the backend need to don't send the srt with the value unless the sort by selections is clicked
        // cr=?country
        // ${localStorage.getItem(
        //     "country"
        //   )}
        router.push(
          `/search?k=${data?.keyword?.replace(/\s/g, "-")}&cr=1&r=${
            data?.region
          }&c=-1&sr=-1&t=${data?.property_type}&f=${data?.finishing}&pr=${
            data?.purpose
          }&p=${data?.min_bathes}&b=${data?.min_beds}&af=${data?.min_area}&at=${
            data?.max_area
          }&pf=${data?.min_price}&pt=${data?.max_price}&srt=${
            searchParams.get("srt") || 0
          }&cur=${data?.currency}&page=1`
          // { state: amenities }
        );
      } else toast.error(t("toast_error"));
    },
    // navigate,
    [isValid, lang, searchParams, t]
  );

  return (
    <form
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      className={`hero__right--form h-full ${
        type === "bigForm" || home
          ? "h-fit"
          : type === "asideForm"
          ? "h-fit"
          : ""
      } w-full px-8  flex flex-col items-center justify-center gap-6 bg-custome-blue py-10 xl:h-[99.5%]`}
    >
      <h3 className="font-Condensed text-bg text-[32px] xl:text-xl truncate h-12">
        {type === "bigForm" || home
          ? t("title.bigForm", "ابحث عن العقارات")
          : type === "asideForm"
          ? t("title.asideForm", "البحث المتقدم")
          : ""}
      </h3>
      {/** Keyword & Location */}
      <div
        className={`flex w-full items-start justify-between gap-6 md:gap-6  ${
          type === "bigForm" || home
            ? "ss:flex-col"
            : type === "asideForm"
            ? "flex-col"
            : ""
        } `}
      >
        {/** Keyword filed */}

        <input
          className={`light-bg-inputs w-1/2 ${
            type === "bigForm" || home
              ? "ss:w-full"
              : type === "asideForm"
              ? "w-full"
              : ""
          } `}
          type="text"
          id="keyword"
          placeholder={t(
            "keyword.placeholder",
            "الكلمة الرئيسية (مثال شقة للإيجار في القاهرة)"
          )}
          autoComplete="on"
          {...register("keyword")}
          name="keyword"
        />
        {/**  Location or Region */}
        <div
          className={` ${
            type === "bigForm" || home
              ? "w-1/2 ss:w-full"
              : type === "asideForm"
              ? "w-full"
              : ""
          } `}
        >
          <ComboBoz
            searchParams={searchParams}
            NotFoundMessage="No locations found"
            data={LocationsData}
            setValue={setValue}
            placeholder={t("region.placeholder", "الموقع")}
            stateName={"region"}
            getDefaultValueFromURL="r"
          />
        </div>
      </div>
      {/** Type & Status */}
      <div
        className={`flex w-full items-start justify-between gap-6 md:gap-6 ${
          type === "bigForm" || home
            ? "ss:flex-col"
            : type === "asideForm"
            ? "flex-col"
            : ""
        }  `}
      >
        {/** Type filed */}
        <div
          className={` ${
            type === "bigForm" || home
              ? "w-1/2 ss:w-full"
              : type === "asideForm"
              ? "w-full"
              : ""
          } `}
        >
          <ComboBoz
            searchParams={searchParams}
            data={PropertyTypesData}
            setValue={setValue}
            placeholder={t("property_type.placeholder", "نوع العقار")}
            stateName={"property_type"}
            getDefaultValueFromURL="t"
          />
        </div>
        {/** Currency */}

        <div
          className={` ${
            type === "bigForm" || home
              ? "w-1/2 ss:w-full"
              : type === "asideForm"
              ? "w-full"
              : ""
          } `}
        >
          <ComboBoz
            searchParams={searchParams}
            data={currenciesData}
            setValue={setValue}
            placeholder={t("currency.placeholder", "العملة")}
            stateName={"currency"}
            getDefaultValueFromURL="cur"
          />
        </div>

        {/** Status */}
        <div
          className={` ${
            type === "bigForm" || home
              ? "w-1/2 ss:w-full"
              : type === "asideForm"
              ? "w-full"
              : ""
          } `}
        >
          <ComboBoz
            searchParams={searchParams}
            data={PropertyFinishingData}
            setValue={setValue}
            placeholder={t("finishing.placeholder", "تشطيب العقار")}
            stateName={"finishing"}
            getDefaultValueFromURL="f"
          />
        </div>
      </div>
      {/** beds / paths & purpose */}
      <div
        className={`flex w-full items-start justify-between gap-6 md:gap-6  ${
          type === "bigForm" || home
            ? "ss:flex-col-reverse"
            : type === "asideForm"
            ? "flex-col-reverse"
            : ""
        }`}
      >
        {/** beds / paths filed */}

        <div
          className={` ${
            type === "bigForm" || home
              ? "w-1/2 ss:w-full"
              : type === "asideForm"
              ? "w-full"
              : ""
          }  flex justify-between items-start gap-2`}
        >
          <div
            className={`flex w-1/2 flex-col items-start justify-center gap-2    `}
          >
            <input
              className="light-bg-inputs  w-full "
              type="text"
              id="min_bathes"
              placeholder={t("min_bathes.placeholder", "عدد الحمامات")}
              autoComplete="on"
              inputMode="numeric"
              max="1"
              {...register("min_bathes", {
                pattern: /^[0-9]+$/,
                min: 0,
              })}
              name="min_bathes"
            />
            {errors.min_bathes && (
              <p className="pt-2 text-xs text-red-100">
                {errors.min_bathes.type === "pattern" &&
                  t("errors.number.pattern")}
                {errors.min_bathes.type === "min" && t("errors.number.min")}
              </p>
            )}
          </div>
          <div
            className={`flex w-1/2 flex-col items-start justify-center gap-2    `}
          >
            <input
              className="light-bg-inputs  w-full "
              type="text"
              id="min_beds"
              placeholder={t("min_beds.placeholder", "عدد السراير")}
              autoComplete="on"
              inputMode="numeric"
              max="1"
              {...register("min_beds", {
                pattern: /^[0-9]+$/,
                min: 0,
              })}
              name="min_beds"
            />
            {errors.min_beds && (
              <p className="pt-2 text-xs text-red-100">
                {errors.min_beds.type === "pattern" &&
                  t("errors.number.pattern")}
                {errors.min_beds.type === "min" && t("errors.number.min")}
              </p>
            )}
          </div>
        </div>
        {/** purpose */}
        <div
          className={` ${
            type === "bigForm" || home
              ? "w-1/2 ss:w-full"
              : type === "asideForm"
              ? "w-full"
              : ""
          } `}
        >
          <ComboBoz
            searchParams={searchParams}
            data={PurposeData}
            setValue={setValue}
            placeholder={t("purpose.placeholder", "الغرض")}
            stateName={"purpose"}
            getDefaultValueFromURL="pr"
          />
        </div>
      </div>
      {/** min area / max area &  min price / max price */}
      <div
        className={`flex w-full items-start justify-between gap-6 md:gap-6  ${
          type === "bigForm" || home
            ? "ss:flex-col"
            : type === "asideForm"
            ? "flex-col"
            : ""
        }`}
      >
        {/** min area / max area  filed */}

        <div
          className={` ${
            type === "bigForm" || home
              ? "w-1/2 ss:w-full"
              : type === "asideForm"
              ? "w-full"
              : ""
          }  flex justify-between items-start gap-2`}
        >
          <div
            className={`flex w-1/2 flex-col items-start justify-center gap-2`}
          >
            <input
              className="light-bg-inputs  w-full "
              type="text"
              id="min_area"
              placeholder={t("min_area.placeholder", "اقل مساحة")}
              autoComplete="on"
              inputMode="numeric"
              max="1"
              {...register("min_area", {
                pattern: /^[0-9]+$/,
                min: 0,
                /* validate: (value) => value < getValues("max_area"), */
              })}
              name="min_area"
            />
            {errors.min_area && (
              <p className="pt-2 text-xs text-red-100">
                {errors.min_area.type === "pattern" &&
                  t("errors.number.pattern")}
                {errors.min_area.type === "min" && t("errors.number.min")}
                {errors.min_area.type === "validate" &&
                  t("errors.number.validate")}
              </p>
            )}
          </div>
          <div
            className={`flex w-1/2 flex-col items-start justify-center gap-2    `}
          >
            <input
              className="light-bg-inputs  w-full "
              type="text"
              id="max_area"
              placeholder={t("max_area.placeholder", "اكبر مساحة")}
              autoComplete="on"
              inputMode="numeric"
              max="1"
              {...register("max_area", {
                pattern: /^[0-9]+$/,
                min: 0,
              })}
              name="max_area"
            />
            {errors.max_area && (
              <p className="pt-2 text-xs text-red-100">
                {errors.max_area.type === "pattern" &&
                  t("errors.number.pattern")}
                {errors.max_area.type === "min" && t("errors.number.min")}
              </p>
            )}
          </div>
        </div>
        {/** min area / max area  filed */}

        <div
          className={` ${
            type === "bigForm" || home
              ? "w-1/2 ss:w-full"
              : type === "asideForm"
              ? "w-full"
              : ""
          }  flex justify-between items-start gap-2`}
        >
          <div
            className={`flex w-1/2 flex-col items-start justify-center gap-2    `}
          >
            <input
              className="light-bg-inputs  w-full "
              type="text"
              id="min_price"
              placeholder={t("min_price.placeholder", "اقل سعر")}
              autoComplete="on"
              inputMode="numeric"
              max="1"
              {...register("min_price", {
                pattern: /^[0-9]+$/,
                min: 0,
              })}
              name="min_price"
            />
            {errors.min_price && (
              <p className="pt-2 text-xs text-red-100">
                {errors.min_price.type === "pattern" &&
                  t("errors.number.pattern")}
                {errors.min_price.type === "min" && t("errors.number.min")}
              </p>
            )}
          </div>
          <div
            className={`flex w-1/2 flex-col items-start justify-center gap-2    `}
          >
            <input
              className="light-bg-inputs  w-full "
              type="text"
              id="max_price"
              placeholder={t("max_price.placeholder", "اكبر سعر")}
              autoComplete="on"
              inputMode="numeric"
              max="1"
              {...register("max_price", {
                pattern: /^[0-9]+$/,
                min: 0,
              })}
              name="max_price"
            />
            {errors.max_price && (
              <p className="pt-2 text-xs text-red-100">
                {errors.max_price.type === "pattern" &&
                  t("errors.number.pattern")}
                {errors.max_price.type === "min" && t("errors.number.min")}
              </p>
            )}
          </div>
        </div>
      </div>
      {/** Amentias__options */}
      {showOptions && (
        <div className="Amentias__options--wrapper w-full">
          <button
            type="button"
            aria-label="Amentias__options"
            className="text-custome-white flex gap-3 items-center w-full truncate"
            onClick={() =>
              dispatch({
                type: "setToggleAmentiasOptions",
                payload: !state.toggleAmentiasOptions,
              })
            }
          >
            <span className="text-2xl bg-custome-white text-custome-blue rounded-full w-8 h-7 flex justify-center items-center rtl:items-end">
              {state.toggleAmentiasOptions ? "-" : "+"}
            </span>
            {state.toggleAmentiasOptions
              ? t("Amentias.title_collapsed.false")
              : t("Amentias.title_collapsed.true")}
          </button>

          {/* Toggle Amentias Options */}
          <div
            className={`amenities_options pr-2 rtl:pr-0 pl-2 w-full grid grid-cols-2 xl:grid-cols-1 clg:grid-cols-2 axs:grid-cols-1 overflow-hidden text-custome-white gap-x-6 gap-y-5 transition-all duration-300 ease-in-out
      ${
        state.toggleAmentiasOptions
          ? "max-h-72 overflow-y-auto opacity-100 mt-5"
          : "max-h-0 opacity-0 mt-0"
      }
    `}
            style={{ maxHeight: state.toggleAmentiasOptions ? "300px" : "0px" }}
          >
            {amenitiesData?.map((amenity: any, index: any) => (
              <CheckBox
                key={amenity.id}
                register={register}
                name={`amenities.${index}`}
                label={amenity.title}
                value={amenity.id}
                Bgcolor="dark"
                searchOption
                errors={undefined}
                ServerErrors={undefined}
              />
            ))}
          </div>
        </div>
      )}
      {home && (
        <AmenitiesSelect
          getValues={getValues}
          amenitiesData={amenitiesData}
          t={t}
          setValue={setValue}
        />
      )}
      {/** Submit Button */}
      <button
        disabled={!isValid}
        className="bg-custome-yellow border border-custome-yellow text-custome-blue text-base font-semibold transition duration-300 py-2 rounded text-center mt-6 w-full hover:text-custome-yellow hover:bg-transparent active:!scale-100"
        type="submit"
      >
        {t("Submit_Button", "بحث")}
      </button>
    </form>
  );
}
export default SearchForm;

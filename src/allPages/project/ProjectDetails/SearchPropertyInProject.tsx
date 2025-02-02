/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { CheckBox } from "@/FormComponents";
import getData from "@/lib/api/getData";
import {
  setShowSearchPropertyProject,
  showSearchPropertyProject,
} from "@/Store/Features/AuthenticationSlice";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  memo,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const SearchPropertyInProject = memo(function SearchPropertyInProject({
  setSearchPropertyOfObject,
}: any) {
  const { i18n } = useTranslation();
  const dispatchRedux = useDispatch();

  const LoginPopUpContent = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const toggleLoginPopUp = useSelector(showSearchPropertyProject);

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

  const [state, dispatch] = useReducer(reducer, {
    toggleAmentiasOptions: false,
  });

  const handleClick = useCallback((e: any) => {
    if (!LoginPopUpContent?.current?.contains(e.target)) {
      dispatchRedux(setShowSearchPropertyProject(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      min_price: "",
      max_price: "",
      min_area: "",
      max_area: "",
      min_beds: "",
      min_bathes: "",
      finishing: "",
      amenities: [],
    },
  });

  const [amenitiesData, setamenitiesData] = useState<any>([]);
  const [finishing, setFinishing] = useState("");

  async function fetchData() {
    const apiRequests = [
      {
        name: "Amenities",
        endpoint: `web/${process.env.NEXT_PUBLIC_PROPERTY_AMENITIES}`,
        promise: getData(
          `web/${process.env.NEXT_PUBLIC_PROPERTY_AMENITIES}`,
          i18n.language
        ),
        setData: setamenitiesData,
      },
    ];

    const results = await Promise.allSettled(
      apiRequests.map((req) => req.promise)
    );

    results?.forEach((result, index) => {
      const { name, endpoint, setData } = apiRequests[index];
      const language = i18n.language; // اللغة المرسلة مع كل استدعاء

      if (result?.status === "fulfilled") {
        setData(result?.value?.data);
      } else {
      }
    });
  }
  const onSubmit = useCallback(
    (data: any) => {
      // الحصول على قيم amenities باستخدام watch
      const selectedAmenities = watch("amenities");

      // تصفية العناصر التي تكون false
      const filteredAmenities = selectedAmenities
        .filter((item: any) => item !== false)
        ?.map((item) => Number(item));

      // إذا كانت هناك عناصر محددة، قم بتحويلها إلى سلسلة نصية
      if (filteredAmenities.length > 0) {
        data.amenities = JSON.stringify(filteredAmenities);
      } else {
        // إذا كانت فارغة، قم بإزالتها من البيانات المرسلة
        delete data.amenities;
      }

      // إرسال البيانات
      setSearchPropertyOfObject(data);
    },
    [watch]
  );

  useEffect(() => {
    fetchData();
  }, [i18n.language]);

  return (
    <div
      className={`w-full  ${
        toggleLoginPopUp
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } trns fixed inset-0 z-[1000]`}
    >
      <div
        className="fixed h-full w-full top-0 left-0 bg-secondary opacity-40 z-[999]"
        onClick={handleClick}
      ></div>

      <form
        ref={formRef}
        className="fixed top-0 right-0 bg-white w-[500px] h-full z-[1000] p-4 overflow-y-scroll asmm:w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* <form
        // onSubmit={handleSubmit(onSubmit)}
        > */}
        <div className="py-5 space-y-4">
          <div className="flex items-center justify-between px-4 py-2 text-secondary bg-white rounded font-bold text-lg">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="mr-2"
              >
                <path
                  d="M20 7H11M14 17H5M14 17C14 18.6569 15.3431 20 17 20C18.6569 20 20 18.6569 20 17C20 15.3431 18.6569 14 17 14C15.3431 14 14 15.3431 14 17ZM10 7C10 8.65685 8.65685 10 7 10C5.34315 10 4 8.65685 4 7C4 5.34315 5.34315 4 7 4C8.65685 4 10 5.34315 10 7Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {i18n.language === "ar" ? "ابحث" : "Filter By"}
            </div>
            <FontAwesomeIcon
              onClick={() => dispatchRedux(setShowSearchPropertyProject(false))}
              className="cursor-pointer trns active:scale-90 text-3xl "
              icon={faCircleXmark}
            />
          </div>

          <div className="">
            <div className="bg-grey p-4 rounded-[8px] shadow-md">
              <div className="filter-wrapper">
                <h2 className="text-lg font-bold mb-2">
                  {i18n.language === "ar" ? "نطاق السعر" : "Price Range"}{" "}
                  <span className="text-gray-500">
                    ({i18n.language === "ar" ? "ج.م" : "EGP"})
                  </span>
                </h2>
                <div className="flex gap-4">
                  {/* <!-- Minimum Price Input --> */}
                  <div className="w-32">
                    <input
                      name="min_price"
                      id="min_price"
                      placeholder={i18n.language === "ar" ? "أقل مساحة" : "Min"}
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  {/* <!-- Maximum Price Input --> */}
                  <div className="w-32">
                    <input
                      name="max_price"
                      id="max_price"
                      placeholder={
                        i18n.language === "ar" ? "أكبر مساحة" : "max"
                      }
                      type="text"
                      // autocomplete="off"
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="bg-grey p-4 rounded-[8px] shadow-md">
              <div className="filter-wrapper">
                <h2 className="text-lg font-bold mb-2">
                  {i18n.language === "ar" ? "غرف النوم" : "Bedrooms"}{" "}
                  <span className="text-gray-500"></span>
                </h2>
                <div className="flex gap-4 mt-2">
                  {[1, 2, 3, 4, 5].map((value: any) => (
                    <div
                      key={value}
                      onClick={() => {
                        // إذا كانت القيمة المحددة هي نفس القيمة الحالية، قم بإلغاء التحديد
                        if (watch("min_beds") === value) {
                          setValue("min_beds", ""); // أو null
                        } else {
                          // إذا كانت مختلفة، قم بتعيين القيمة الجديدة
                          setValue("min_beds", value);
                        }
                      }}
                      className={`w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer hover:bg-secondary hover:text-white transition ${
                        watch("min_beds") === value
                          ? "bg-secondary text-white"
                          : ""
                      }`}
                    >
                      {value}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="bg-grey p-4 rounded-[8px] shadow-md">
              <div className="filter-wrapper">
                <h2 className="text-lg font-bold mb-2">
                  {i18n.language === "ar" ? "عدد مراحيض" : "Bathroom"}{" "}
                  <span className="text-gray-500"></span>
                </h2>
                <div className="flex gap-4 mt-2">
                  {[1, 2, 3, 4, 5].map((value: any) => (
                    <div
                      key={value}
                      onClick={() => {
                        // إذا كانت القيمة المحددة هي نفس القيمة الحالية، قم بإلغاء التحديد
                        if (watch("min_bathes") === value) {
                          setValue("min_bathes", ""); // أو null
                        } else {
                          // إذا كانت مختلفة، قم بتعيين القيمة الجديدة
                          setValue("min_bathes", value);
                        }
                      }}
                      className={`w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer hover:bg-secondary hover:text-white transition ${
                        watch("min_bathes") === value
                          ? "bg-secondary text-white"
                          : ""
                      }`}
                    >
                      {value}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-grey p-4 rounded-[8px] shadow-md">
            <div className="filter-wrapper">
              <h2 className="text-lg font-bold mb-2">
                {i18n.language === "ar" ? "المساحة" : "Square Meter"}{" "}
                <span className="text-gray-500">
                  {i18n.language === "ar" ? (
                    <>
                      (م<sup>2</sup>)
                    </>
                  ) : (
                    <>
                      (M<sup>2</sup>)
                    </>
                  )}
                </span>
              </h2>
              <div className="flex gap-4">
                <div className="w-32">
                  <input
                    {...register("min_area")}
                    placeholder={i18n.language === "ar" ? "أقل مساحة" : "Min"}
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="w-32">
                  <input
                    {...register("max_area")}
                    placeholder={i18n.language === "ar" ? "أكبر مساحة" : "max"}
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/** Amentias__options */}
          {amenitiesData && (
            // Amentias__options--wrapper
            <div className="Amentias__options--wrapper bg-grey p-4 rounded-[8px] shadow-md text-secondary w-full">
              <button
                type="button"
                aria-label="Amentias__options"
                className="flex gap-3 items-center w-full truncate"
                onClick={() =>
                  dispatch({
                    type: "setToggleAmentiasOptions",
                    payload: !state.toggleAmentiasOptions,
                  })
                }
              >
                <span className="text-2xl bg-custome-white text-secondary font-bold rounded-full w-8 h-7 flex justify-center items-center rtl:items-end">
                  {state.toggleAmentiasOptions ? "-" : "+"}
                </span>
                {/* {state.toggleAmentiasOptions
                  ? t("Amentias.title_collapsed.false")
                  : t("Amentias.title_collapsed.true")} */}
                {i18n.language === "ar" ? "مميزات" : "Amentias"}
              </button>

              {/* Toggle Amentias Options */}
              <div
                // amenities_options
                className={`pr-2 rtl:pr-0 pl-2 w-full grid grid-cols-2 xl:grid-cols-1 clg:grid-cols-2 axs:grid-cols-1 overflow-hidden gap-x-6 gap-y-5 transition-all duration-300 ease-in-out
      ${
        state.toggleAmentiasOptions
          ? "max-h-72 overflow-y-auto opacity-100 mt-5"
          : "max-h-0 opacity-0 mt-0"
      }
    `}
                style={{
                  maxHeight: state.toggleAmentiasOptions ? "300px" : "0px",
                }}
              >
                {amenitiesData?.map((amenity: any, index: any) => (
                  <CheckBox
                    key={amenity.id}
                    register={register}
                    name={`amenities.${index}`}
                    label={amenity.title}
                    value={amenity.id}
                    Bgcolor="light"
                    searchOption
                    errors={undefined}
                    ServerErrors={undefined}
                  />
                ))}
              </div>
            </div>
          )}

          {/** Submit Button */}
          <button
            // disabled={!isValid}
            onClick={handleClick}
            className="bg-custome-yellow border border-custome-yellow text-custome-blue text-base font-semibold transition duration-300 py-2 rounded text-center mt-6 w-full hover:text-custome-yellow hover:bg-transparent active:!scale-100"
            type="submit"
          >
            {/* {t("Submit_Button", "بحث")} */}
            Search
          </button>
        </div>
        {/* </form> */}
      </form>
    </div>
  );
});
export default SearchPropertyInProject;

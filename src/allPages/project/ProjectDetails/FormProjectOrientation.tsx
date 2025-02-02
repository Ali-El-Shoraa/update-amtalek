"use client";
import { memo, useCallback, useRef, useState } from "react";
import favIconSrc from "@/assets/images/fav-icon.png";
import favoritesIllustration from "@/assets/images/favorites-illustration.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
// import animation_property from "./animation_property.json";
import {
  setShowFormProjectOrientation,
  showFormProjectOrientation,
} from "@/Store/Features/AuthenticationSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Lottie from "react-lottie-player";
import { PhoneComponent, TextComponent } from "@/FormComponents";
import { useForm } from "react-hook-form";
// import { usePostData } from "@/Hooks/usePostData";
import ReactPlayer from "react-player";
import toast from "react-hot-toast";
const FormProjectOrientation = memo(function FormProjectOrientation({
  data,
}: any) {
  const { t, i18n } = useTranslation("Pages_LandingPage");

  let [filePdf, setFilePdf] = useState<File | null>(null);

  const LoginPopUpContent = useRef<HTMLDivElement>(null);
  const toggleLoginPopUp = useSelector(showFormProjectOrientation);
  const dispatchRedux = useDispatch();

  const handleClick = useCallback((e: any) => {
    if (!LoginPopUpContent?.current?.contains(e.target)) {
      dispatchRedux(setShowFormProjectOrientation(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const idRequest = data?.id;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    getValues,
    watch,
    setValue,
  }: any = useForm({
    mode: "onBlur",
    defaultValues: {
      name: "",
      phone: "",
      broker_name: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);

    // إنشاء كائن FormData
    const formData = new FormData();
    formData?.append("name", data?.name);
    formData?.append("phone", data?.phone);
    formData?.append("broker_name", data?.broker_name);

    // إضافة ملف السيرة الذاتية إذا كان موجودًا
    if (filePdf) {
      formData.append("cv", filePdf);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_GET_DATA}web/v2/project-orientation-request/${idRequest}`,
        {
          method: "POST",
          body: formData, // إرسال FormData
        }
      );

      const result = await response.json();
      if (response?.ok) {
        // alert("تم الإرسال بنجاح!");
        toast.success(result?.message);

        reset();
        dispatchRedux(setShowFormProjectOrientation(false));
      } else {
        // alert("حدث خطأ أثناء الإرسال. حاول مرة أخرى.");
        toast.error(result?.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // alert("تعذر الإرسال. تحقق من الاتصال بالإنترنت.");
    }

    setIsSubmitting(false);
  };

  return (
    <section
      className={`w-full h-screen ${
        toggleLoginPopUp
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } trns fixed inset-0 z-[1000] `}
    >
      <div className="relative w-full h-full  flex justify-center items-center">
        <div
          onClick={handleClick}
          className="LoginPopUp__absolute absolute h-full w-full bg-secondary opacity-40"
        ></div>
        {data?.project_orientation_type ? (
          <>
            <div
              ref={LoginPopUpContent}
              className={`LoginPopUp__content w-1/2 min-w-[750px] amd:min-w-[300px] h-1/2 min-h-[530px]  md:w-full round flex bg-grey ${
                toggleLoginPopUp ? "scale-100" : "scale-0"
              } trns origin-bottom shadow-lg amd:w-full amd:h-full amd:flex-col amd:items-center amd:justify-center relative`}
            >
              {data?.project_orientation_type === "video" ? (
                <>
                  {/* amd:flex-1 */}
                  <div className="w-1/2 amd:w-full h-auto flex flex-col items-center justify-center p-7 gap-3 amd:flex-1">
                    <h3 className=" text-2xl font-bold h-[15%] amd:h-auto  flex items-center text-secondary text-center">
                      {i18n.language === "en"
                        ? `Check ${data?.title} Video Orientation`
                        : `فيديو لشرح مشروع ${data?.title}`}
                    </h3>
                    <div className="aspect-w-16 aspect-h-9 h-96">
                      <ReactPlayer
                        url={data?.project_orientation_path_pdf}
                        width={`100%`}
                        height={`100%`}
                      />
                    </div>
                  </div>
                </>
              ) : (
                // ) : data?.project_orientation_type === "pdf" ? (
                <>
                  <div className="w-1/2 amd:w-full h-auto flex flex-col items-center justify-center p-7 gap-3 amd:flex-grow-0">
                    <h3 className=" text-2xl font-bold h-[15%] amd:h-auto  flex items-center text-secondary text-center">
                      {i18n.language === "en"
                        ? `Check ${data?.title} PDF Orientation`
                        : `ملف لشرح مشروع ${data?.title}`}
                    </h3>
                    <a
                      href={`${data?.project_orientation_path_pdf}`}
                      className="flex items-center gap-3 p-4 font-bold rounded bg-red-500 text-white shadow-md transition-all duration-500 ease-in-out transform hover:scale-110 hover:shadow-lg hover:brightness-125 cursor-pointer"
                      download
                    >
                      <svg
                        className="fill-current w-4 h-4 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                      </svg>
                      <span>
                        {i18n.language === "en" ? "Download" : "تحميل"}
                      </span>
                    </a>
                  </div>
                </>
              )}
              {/*  pt-6 bg-bg */}
              <div className="w-1/2 amd:w-full amd:pt-7 amd:gap-4 h-auto flex justify-start px-7 flex-col items-center amd:flex-1 bg-secondary">
                {/*  */}
                <Lottie
                  path="/animation_cv.json"
                  play
                  color="#005879"
                  loop={true}
                  className="amd:hidden"
                  style={{ width: 150, height: 150 }}
                />

                {/* <Player autoplay loop src={animationData} style={{ width: "100%", height: "100%" }} /> */}
                {/* amd:hidden */}
                <p className=" text-xl font-medium h-[15%] amd:h-auto  flex items-center text-white text-center">
                  {t("LoginPopUp.heading_Form_project_orintation")}
                  <br />
                  {t("LoginPopUp.sub_heading_Form_project_orintation")}

                  {/* stile need orientation ? <br />
              please fill form */}
                </p>
                {/* flex items-center justify-center gap-2  */}
                {/* <form className="space-y-3 w-full"> */}
                {/* onSubmit={handleSubmit(onSubmit)} */}
                <form
                  className="w-full space-y-3"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <TextComponent
                    t={t}
                    register={register}
                    name="name"
                    placeholder={t("LoginPopUp.sub_heading_first_name")}
                    errors={errors}
                    // ServerErrors={ServerErrors}
                    withIcon
                    width={"w-full"}
                  />

                  <TextComponent
                    t={t}
                    register={register}
                    name="broker_name"
                    placeholder={t("LoginPopUp.sub_heading_company_name")}
                    errors={errors}
                    // ServerErrors={ServerErrors}
                    withIcon
                    width={"w-full"}
                  />

                  <PhoneComponent
                    t={t}
                    register={register}
                    name="phone"
                    width="w-full"
                    withIcon
                    // label={t("LoginPopUp.sub_heading_phone")}
                    placeholder={t("LoginPopUp.sub_heading_phone")}
                    errors={errors}
                  />

                  {/* </div> */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full round  h-10 flex justify-center items-center gap-2 px-2 py-[6px] transition-all duration-300 ease-in-out  bg-bg text-secondary hover:bg-red-500 hover:text-white text-lg mt-5 mb-3 amd:max-w-xs amd:mx-auto"
                  >
                    {t("LoginPopUp.submit_data_without_login")}
                    {/* أرسل بياناتك*/}
                  </button>
                </form>
              </div>
              <FontAwesomeIcon
                onClick={() =>
                  dispatchRedux(setShowFormProjectOrientation(false))
                }
                className=" absolute left-5 rtl:left-auto rtl:right-5 top-5 cursor-pointer trns active:scale-90 text-3xl "
                icon={faCircleXmark}
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-[500px] amd:w-full amd:pt-7 amd:gap-4 h-auto flex justify-start px-20 gap-5 flex-col items-center amd:flex-1 bg-secondary z-10 py-6 pb-16 rounded-2xl relative">
              {/*  */}
              <FontAwesomeIcon
                onClick={() =>
                  dispatchRedux(setShowFormProjectOrientation(false))
                }
                className="absolute left-5 rtl:left-auto rtl:right-5 top-5 cursor-pointer trns active:scale-90 text-3xl text-white"
                icon={faCircleXmark}
              />
              <Lottie
                path="/animation_cv.json"
                play
                color="#005879"
                loop={true}
                style={{ width: 150, height: 150 }}
              />

              {/* <Player autoplay loop src={animationData} style={{ width: "100%", height: "100%" }} /> */}
              {/* amd:hidden */}
              <p className=" text-xl font-medium h-[15%] amd:h-auto  flex items-center text-white text-center">
                {t("LoginPopUp.heading_Form_project_orintation")}
                <br />
                {t("LoginPopUp.sub_heading_Form_project_orintation")}

                {/* stile need orientation ? <br />
              please fill form */}
              </p>
              {/* flex items-center justify-center gap-2  */}
              {/* <form className="space-y-3 w-full"> */}
              {/* onSubmit={handleSubmit(onSubmit)} */}
              <form
                className="w-full space-y-3"
                onSubmit={handleSubmit(onSubmit)}
              >
                <TextComponent
                  t={t}
                  register={register}
                  name="name"
                  placeholder={t("LoginPopUp.sub_heading_first_name")}
                  errors={errors}
                  // ServerErrors={ServerErrors}
                  withIcon
                  width={"w-full"}
                />

                <TextComponent
                  t={t}
                  register={register}
                  name="broker_name"
                  placeholder={t("LoginPopUp.sub_heading_company_name")}
                  errors={errors}
                  // ServerErrors={ServerErrors}
                  withIcon
                  width={"w-full"}
                />

                <PhoneComponent
                  t={t}
                  register={register}
                  name="phone"
                  width="w-full"
                  withIcon
                  // label={t("LoginPopUp.sub_heading_phone")}
                  placeholder={t("LoginPopUp.sub_heading_phone")}
                  errors={errors}
                />

                {/* </div> */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full round  h-10 flex justify-center items-center gap-2 px-2 py-[6px] transition-all duration-300 ease-in-out  hover:bg-bg hover:text-secondary bg-red-500 text-white text-lg mt-5 mb-3 amd:max-w-xs amd:mx-auto"
                >
                  {t("LoginPopUp.submit_data_without_login")}
                  {/* أرسل بياناتك*/}
                </button>
              </form>
            </div>
            {/* <FontAwesomeIcon
              onClick={() =>
                dispatchRedux(setShowFormProjectOrientation(false))
              }
              className=" absolute left-5 rtl:left-auto rtl:right-5 top-5 cursor-pointer trns active:scale-90 text-3xl "
              icon={faCircleXmark}
            /> */}
          </>
        )}
      </div>
    </section>
  );
});

export default FormProjectOrientation;
// async function VideoComponent({ fileName }:any) {
//   const { blobs } = await list({
//     prefix: fileName,
//     limit: 2,
//   });
//   const { url } = blobs[0];
//   const { url: captionsUrl } = blobs[1];

//   return (
//     <video controls preload="none" aria-label="Video player">
//       <source src={url} type="video/mp4" />
//       <track src={captionsUrl} kind="subtitles" srcLang="en" label="English" />
//       Your browser does not support the video tag.
//     </video>
//   );
// }

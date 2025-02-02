"use client";
import { useCallback, useRef, useState } from "react";
import favIconSrc from "@/assets/images/fav-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import {
  setShowLoginOrSendDetailsPopUp,
  showLoginOrSendDetailsPopUp,
  userData,
} from "@/Store/Features/AuthenticationSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Lottie from "react-lottie-player";
import { PhoneComponent, ReCaptcha, TextComponent } from "@/FormComponents";
import { useForm } from "react-hook-form";
import { usePostData } from "@/Hooks/usePostData";

export default function LoginOrSendDetailsPopUp({
  type,
  api,
  Bgcolor,
  params,
  for_what,
  propID,
  refetch,
}: any) {
  const LoginPopUpContent = useRef<HTMLDivElement>(null);
  const toggleLoginPopUp = useSelector(showLoginOrSendDetailsPopUp);
  const dispatchRedux = useDispatch();

  const handleClick = useCallback((e: any) => {
    if (!LoginPopUpContent?.current?.contains(e.target)) {
      dispatchRedux(setShowLoginOrSendDetailsPopUp(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ************************************************************************************************************
  const { t } = useTranslation("Pages_LandingPage");

  type ReCAPTCHAInstance = {
    reset: () => void;
  };
  const recaptchaRef = useRef<ReCAPTCHAInstance | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector(userData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: user?.token
        ? user?.data?.first_name + " " + user?.data?.last_name
        : "",
      phone: user?.token ? user?.data?.phone : "",
      email: user?.token ? user?.data?.email : "",
      not_ropot: "no",
      offer_type: "",
      from: "Web",
      project_id: propID,
    },
  });

  const not_ropot = watch("not_ropot");
  // const offer_type = watch("offer_type");

  const {
    mutate,
    isLoading,
    error: ServerErrors,
    isSuccess,
  }: any = usePostData(
    true,
    () => {
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      reset();
      setValue("not_ropot", "no");
      setSubmitted(false);
      // if (type === "offer") {
      //   refetch();
      // }
    },
    true,
    (error: any) => {
      console.error("Error occurred:", error);
    }
  );

  const onSubmit = useCallback(
    (data: any) => {
      setSubmitted(true);
      // const { message, ...rest } = data;
      if (not_ropot !== "no") {
        if (for_what !== "for_both") {
          mutate({
            api: api,
            data: { ...data, ...params, offer_type: for_what },
            file: undefined,
          });
        } else {
          mutate({
            api: api,
            data: { ...data, ...params },
            file: undefined,
          });
        }
      }
    },
    [api, for_what, mutate, not_ropot, params]
  );

  //
  const onChange = useCallback(
    (value: any) => {
      if (value) {
        setValue("not_ropot", "yes");
      } else {
        setValue("not_ropot", "no");
      }
    },
    [setValue]
  );

  return (
    <section
      onClick={handleClick}
      className={`w-full h-screen ${
        toggleLoginPopUp
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } trns fixed inset-0 z-[1000] `}
    >
      <div className="relative w-full h-full  flex justify-center items-center">
        <div className="LoginPopUp__absolute absolute h-full w-full bg-secondary opacity-40"></div>
        <div
          ref={LoginPopUpContent}
          // min-h-[852px] h-1/2
          className={`LoginPopUp__content w-1/2 min-w-[750px] amd:min-w-[300px] h-auto md:w-full round flex bg-grey ${
            toggleLoginPopUp ? "scale-100" : "scale-0"
          } trns origin-bottom shadow-lg amd:w-full amd:h-full amd:flex-col-reverse amd:items-center amd:justify-center relative`}
        >
          {/* amd:flex-1 */}
          <div className="w-1/2 amd:w-full h-auto flex flex-col items-center justify-center p-7 gap-3 amd: amd:h-fit">
            <div className="w-full flex items-center justify-center gap-1 flex-col amd:flex-row">
              <Image
                width={1000}
                height={1000}
                className="w-14  aspect-square amd:hidden"
                src={favIconSrc}
                alt="fav-icon"
              />
              <h3 className="text-2xl font-bold text-center amd:hidden">
                {t("LoginPopUp.heading")}
              </h3>
            </div>
            {/*  amd:flex */}
            <p className=" text-lg font- items-center hidden amd:hidden">
              {t("LoginPopUp.sub_heading")}
            </p>

            <p className="font-bold amd:hidden">
              {t("LoginPopUp.sub_heading_as_user")}
            </p>

            <div className="w-full flex items-center justify-center gap-3  flex-col amd:flex-row">
              <Link
                href="/login"
                className="mx-auto w-full round  h-10  flex justify-center items-center gap-2 px-2 py-[6px] bg-secondary transition-all duration-300 ease-in-out  hover:bg-bg hover:text-secondary text-bg text-lg amd:max-w-xs"
              >
                {t("LoginPopUp.login")}
              </Link>
              <Link
                href="/register"
                className="mx-auto w-full round  h-10  flex justify-center items-center gap-2 px-2 py-[6px] bg-bg transition-all duration-300 ease-in-out  hover:bg-secondary hover:text-bg text-secondary text-lg amd:max-w-xs"
              >
                {t("LoginPopUp.Register")}
              </Link>
            </div>
          </div>
          {/*  pt-6 bg-bg */}

          <div className="w-1/2 amd:w-full amd:pt-7 amd:gap-4 h-auto flex justify-start px-7 flex-col items-center amd:flex-1 bg-secondary p-8 gap-2 amd:justify-center">
            <p className=" text-xl font-medium h-[15%] amd:h-auto  flex items-center text-center text-white">
              {t("LoginPopUp.sub_heading_two")}
            </p>
            {/* flex items-center justify-center gap-2  */}
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-3 w-full">
                <TextComponent
                  register={register}
                  name="name"
                  placeholder={t("AsideForm.name.placeholder")}
                  errors={errors}
                  ServerErrors={ServerErrors}
                  Bgcolor={Bgcolor}
                  withIcon
                  width={"w-full"}
                  t={t}
                  disabled={user?.token}
                />

                <PhoneComponent
                  register={register}
                  placeholder={t("AsideForm.phone.placeholder")}
                  errors={errors}
                  ServerErrors={ServerErrors}
                  width="w-full"
                  Bgcolor={Bgcolor}
                  withIcon
                  t={t}
                  disabled={user?.token}
                />

                <ReCaptcha
                  refs={recaptchaRef}
                  onChange={onChange}
                  error={submitted && not_ropot === "no"}
                  ServerError={
                    ServerErrors?.response?.data?.errors?.not_ropot &&
                    ServerErrors?.response?.data?.errors?.not_ropot[0]
                      ? ServerErrors?.response?.data?.errors?.not_ropot[0]
                      : null
                  }
                  t={t}
                />
                <button className="w-full round  h-10 flex justify-center items-center gap-2 px-2 py-[6px] transition-all duration-300 ease-in-out  hover:bg-bg hover:text-secondary bg-red-500 text-white text-lg mt-5 mb-3 amd:max-w-xs amd:mx-auto">
                  {t("LoginPopUp.submit_data_without_login")}
                </button>
              </div>
            </form>
          </div>
          <FontAwesomeIcon
            onClick={() => dispatchRedux(setShowLoginOrSendDetailsPopUp(false))}
            className=" absolute left-5 rtl:left-auto rtl:right-5 top-5 amd:top-16 amd:text-white cursor-pointer trns active:scale-90 text-3xl"
            icon={faCircleXmark}
          />
        </div>
      </div>
    </section>
  );
}

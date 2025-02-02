"use client";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import arlogoImg from "/public/images/navArLogo.png";

import logoImg from "/public/images/navEnLogo.png";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { usePostData } from "@/Hooks/useAxios";
import {
  setShowLoginPopUp,
  setUserData,
} from "@/Store/Features/AuthenticationSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  EmailComponent,
  PasswordComponent,
  ReCaptcha,
  SubmitBtnComponent,
} from "@/FormComponents";
import { useRouter } from "next/navigation";
import { setAuthToken } from "@/lib/actions/auth-actions";
import { setUserDataAction } from "@/lib/actions/user.data.actions";
import toast from "react-hot-toast";

export default function LoginForm({ loginDispatch }: any) {
  const { t, i18n } = useTranslation("Pages_Login");
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const recaptchaRef: any = useRef(null);
  const dispatchRedux = useDispatch();
  const { mutate: requestNewCode }: any = usePostData(
    false,
    () => {},
    false,
    () => {}
  );

  let validations = {};
  // const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    getValues,
    watch,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      not_ropot: "no",
      created_from: "web",
      // operation_type: "forget_password",
    },
  });
  const not_ropot = watch("not_ropot");
  const email = watch("email");

  const handleSetToken = async (data: any) => {
    try {
      await setAuthToken(data?.data?.token);
      await setUserDataAction(JSON.stringify(data?.data));
      router.push("/");
    } catch (error: any) {
      toast.error(error);
    }
  };

  const {
    data,
    mutate: postLoginData,
    isLoading,
    error: ServerErrors,
  }: any = usePostData(
    true,
    (data) => {
      localStorage.setItem("userData", JSON.stringify(data?.data));
      dispatchRedux(setUserData(data?.data));
      recaptchaRef.current.reset();
      setValue("not_ropot", "no");
      reset();

      handleSetToken(data);
      dispatchRedux(setShowLoginPopUp(false));
      setSubmitted(false);
      data && router.push("/");
    },
    false,
    (error) => {
      if (error?.response?.data?.message === "Please Verify Code") {
        requestNewCode({
          api: process.env.NEXT_PUBLIC_SEND_CODE_TO_EMAIL,
          data: {
            email: email,
            not_ropot: "no",
            created_from: "web",
            operation_type: "verify_code",
          },
          file: undefined,
        });
        loginDispatch({
          type: "setCodeNotVerified",
          payload: true,
        });
        loginDispatch({
          type: "setEmail",
          payload: getValues("email"),
        });
      }
    }
  );

  const onSubmit = useCallback(
    (data: any) => {
      setSubmitted(true);
      postLoginData({
        api: "login",
        data: data,
        file: undefined,
      });
    },
    [postLoginData]
  );
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
    <form
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
      className="register--form ss:my-auto  w-full px-8 h-full  flex flex-col items-start justify-start gap-6  py-2 overflow-y-auto overflow-x-hidden"
    >
      <Link href="/" className="logo  w-36 max-w-[144px] min-w-[144px] mx-auto">
        <Image
          height={757}
          width={2928}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          src={i18n.language?.startsWith("ar") ? arlogoImg : logoImg}
          alt="Amtalek"
          className="h-full w-full cursor-pointer"
        />
      </Link>
      <h1 className=" text-2xl font-bold  text-center w-full mb-4">
        {t("LoginForm.heading")}
      </h1>
      <div className="flex w-full items-start justify-between gap-16 clg:gap-10  md:flex-col md:gap-6">
        {/** Email  */}

        <EmailComponent
          t={t}
          register={register}
          name="email"
          label={t("LoginForm.email.label")}
          placeholder={t("LoginForm.email.placeholder")}
          errors={errors}
          ServerErrors={ServerErrors}
        />
        {/** Password  */}
        <PasswordComponent
          t={t}
          register={register}
          name="password"
          label={t("LoginForm.password.label")}
          placeholder={t("LoginForm.password.placeholder")}
          errors={errors}
          ServerErrors={ServerErrors}
        />
      </div>
      {/** Remember me & forget password  */}
      <div className="flex w-full items-start justify-between gap-16 clg:gap-10 md:flex-col md:gap-6">
        <div className=" flex w-fit  items-center justify-center gap-5 ">
          <div className="checkbox-wrapper">
            <div className="cbx">
              <input
                id="remember_me"
                className="signin-inputs w-full"
                type="checkbox"
                name="remember_me"
              />
              <label htmlFor="remember_me"></label>
              <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                <path d="M2 8.36364L6.23077 12L13 2"></path>
              </svg>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
              <defs>
                <filter id="goo-12">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="4"
                    result="blur"
                  ></feGaussianBlur>
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                    result="goo-12"
                  ></feColorMatrix>
                  <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
                </filter>
              </defs>
            </svg>
          </div>

          <label className="w-fit  cursor-pointer" htmlFor="remember_me">
            {t("LoginForm.remember_me.label")}
          </label>
        </div>

        <div
          onClick={() =>
            loginDispatch({
              type: "setForgotPassword",
              payload: true,
            })
          }
          className="relative group cursor-pointer  h-7 flex flex-col justify-start "
        >
          {t("LoginForm.Forgot_password")}
          <hr className=" border-[0px] border-secondary w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
        </div>
      </div>
      <ReCaptcha
        t={t}
        refs={recaptchaRef}
        onChange={onChange}
        error={submitted && not_ropot === "no"}
        ServerError={
          ServerErrors?.response?.data?.errors?.not_ropot &&
          ServerErrors?.response?.data?.errors?.not_ropot[0]
            ? ServerErrors?.response?.data?.errors?.not_ropot[0]
            : null
        }
      />
      {/** Submit Button */}
      <SubmitBtnComponent
        disabled={not_ropot === "no" || isLoading}
        isLoading={isLoading}
        value={t("LoginForm.SubmitBtnComponent.value")}
      />
      <p className="w-full flex justify-center items-center gap-1 text-sm -mt-2">
        {t("LoginForm.login__providers.have_no_account")}
        <Link href="/register" className="font-bold text-base cursor-pointer">
          {t("LoginForm.login__providers.register")}{" "}
        </Link>
      </p>{" "}
    </form>
  );
}

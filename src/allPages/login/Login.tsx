"use client";

import LoginForm from "./components/LoginForm";
import LoginImage from "./components/LoginImage";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import UpdatePasswordForm from "../Authentication/UpdatePasswordForm";
import VerificationCodeForm from "../Authentication/VerificationCodeForm";
import {
  EmailComponent,
  ReCaptcha,
  SubmitBtnComponent,
} from "@/FormComponents";
import { usePostData } from "@/Hooks/usePostData";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  setShowLoginOrSendDetailsPopUp,
  setShowLoginPopUp,
} from "@/Store/Features/AuthenticationSlice";
import { useDispatch } from "react-redux";

function SendCodeForm({ loginDispatch, t }: any) {
  const [submitted, setSubmitted] = useState(false);
  const recaptchaRef = useRef<any>(null);
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
      not_ropot: "no",
      created_from: "web",
      operation_type: "forget_password",
    },
  });
  const not_ropot = watch("not_ropot");

  const {
    mutate: postSendCodeData,
    isLoading,
    error: ServerErrors,
  }: any = usePostData(
    true,
    () => {
      recaptchaRef.current.reset();

      setValue("not_ropot", "no");
      loginDispatch({
        type: "setCodeSentSuccess",
        payload: true,
      });
      loginDispatch({
        type: "setEmail",
        payload: getValues("email"),
      });
      reset();
      setSubmitted(false);
    },
    true,
    () => {}
  );

  const onSubmit = useCallback(
    (data: any) => {
      setSubmitted(true);
      postSendCodeData({
        api: process.env.NEXT_PUBLIC_SEND_CODE_TO_EMAIL,
        data: data,
      });
    },
    [postSendCodeData]
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
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      className="register--form  w-full px-8 full  flex flex-col items-start justify-start gap-6  py-2 overflow-y-auto"
    >
      <h1 className=" text-xl font-medium  text-center w-full mb-4">
        {t("SendCodeForm.heading")}
      </h1>
      {/** Email  */}
      <EmailComponent
        t={t}
        width={"w-full"}
        register={register}
        name="email"
        label={t("SendCodeForm.email.label")}
        placeholder={t("SendCodeForm.email.placeholder")}
        errors={errors}
        ServerErrors={ServerErrors}
      />
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
        disabled={!isValid || not_ropot === "no" || isLoading}
        isLoading={isLoading}
        value={t("SendCodeForm.SubmitBtnComponent.value")}
      />
      <div className="w-full flex justify-center">
        <p
          onClick={() =>
            loginDispatch({
              type: "setForgotPassword",
              payload: false,
            })
          }
          className="w-fit flex justify-center items-center cursor-pointer gap-1 text-sm"
        >
          {t("SendCodeForm.Return_to_login")}
        </p>
      </div>
    </form>
  );
}

export default function Login({ locale }: any) {
  const { t } = useTranslation("Pages_Login");

  const dispatchRedux = useDispatch();
  useEffect(() => {
    dispatchRedux(setShowLoginPopUp(false));
    dispatchRedux(setShowLoginOrSendDetailsPopUp(false));
  }, []);

  function reducer(state: any, action: any) {
    switch (action.type) {
      case "setForgotPassword": {
        return {
          ...state,
          forgotPassword: action.payload,
        };
      }
      case "setCodeSentSuccess": {
        return {
          ...state,
          codeSentSuccess: action.payload,
        };
      }
      case "setCodeVerifiedSuccess": {
        return {
          ...state,
          codeVerifiedSuccess: action.payload,
        };
      }
      case "setCodeNotVerified": {
        return {
          ...state,
          codeNotVerified: action.payload,
        };
      }
      case "setEmail": {
        return {
          ...state,
          email: action.payload,
        };
      }
      case "setCode": {
        return {
          ...state,
          code: action.payload,
        };
      }

      default:
        throw Error("Unknown action: " + action.type);
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    forgotPassword: false,
    codeSentSuccess: false,
    codeVerifiedSuccess: false,
    codeNotVerified: false,
    email: "",
    code: "",
  });

  return (
    <section className="w-full login_background bg-login-patter  h-screen md:min-h-screen md:overflow-y-auto bg- flex justify-center items-center ">
      <div className="illustration__form--wrapper site_container  h-[90%]  md:h-full  shadow-md flex flex-row-reverse  jus round overflow-hidden">
        <LoginImage locale={locale} />
        <div className="forms__wrapper w-1/2 clg:w-full h-full flex flex-col items-center bg-bg gap- pt-5">
          {/* {type === "register" ? <Register /> : <LoginForm />} */}
          {state.codeNotVerified ? (
            //!--if the user tried to login but it hasn't verified it yet
            <VerificationCodeForm
              t={t}
              from="login"
              loginDispatch={dispatch}
              email={state.email}
              heading={t("VerificationCodeForm.heading_for_verify_account")}
            />
          ) : state.codeVerifiedSuccess ? (
            <UpdatePasswordForm
              t={t}
              loginDispatch={dispatch}
              code={state.code}
              email={state.email}
            />
          ) : state.codeSentSuccess ? (
            <VerificationCodeForm
              t={t}
              loginDispatch={dispatch}
              email={state.email}
              heading={t("VerificationCodeForm.heading_for_reset_pass")}
            />
          ) : state.forgotPassword ? (
            <SendCodeForm t={t} loginDispatch={dispatch} />
          ) : (
            <LoginForm t={t} loginDispatch={dispatch} />
          )}
          {/* <LoginForm loginDispatch={dispatch} /> */}
        </div>
      </div>
    </section>
  );
}

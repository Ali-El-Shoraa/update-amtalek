"use client";
import { useCallback } from "react";
import { usePostData } from "@/Hooks/useAxios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRef } from "react";
import {
  EmailComponent,
  MessageComponent,
  PhoneComponent,
  ReCaptcha,
  SubmitBtnComponent,
  TextComponent,
} from "@/FormComponents/index";
import {
  userData,
  userProfileData,
} from "@/Store/Features/AuthenticationSlice";
import { useSelector } from "react-redux";
import { TUser } from "@/Types/AppTypes";
import { useTranslation } from "react-i18next";
import { RatingComponent } from "@/components/SubComponents";

function SendMessageForm({ type, api, params, showRating = false }: any) {
  const { t } = useTranslation("Pages_PropertyDetails");

  const recaptchaRef = useRef<any>(null);
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector(userData);
  const userProfile = useSelector(userProfileData) as TUser | null;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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
      message: "",
      not_ropot: "no",
      starts: 0,
      from: "Web",
    },
  });
  const not_ropot = watch("not_ropot");
  const starts = watch("starts");
  const {
    mutate,
    isLoading,
    error: ServerErrors,
  }: any = usePostData(
    true, // showToasts
    () => {
      recaptchaRef.current.reset();
      reset();
      setValue("not_ropot", "no");
      setSubmitted(false);
    },
    true,
    (error: any) => {
      console.error("Error:", error);
    }
  );

  const onSubmit = useCallback(
    (data: any) => {
      setSubmitted(true);
      if (not_ropot !== "no") {
        const finalData =
          type === "PropertyDetails__Comment"
            ? { ...data, ...params }
            : { ...data, ...params };
        mutate({ api: api, data: finalData });
      }
    },
    [api, mutate, not_ropot, params, type]
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
      className="add__comment--form mt-7 w-full flex flex-col justify-start  gap-6  "
    >
      <div className="add__comment--form--top w-full flex justify-between items-start md:flex-col gap-6 md:justify-start">
        {/**  Name  && Phone &&  Email*/}

        <div className="w-1/2 md:w-full flex flex-col items-start gap-6">
          {/**  Name  */}

          <TextComponent
            t={t}
            register={register}
            name="name"
            placeholder={t("SendMessageForm.name.placeholder")}
            errors={errors}
            ServerErrors={ServerErrors}
            withIcon
            width={"w-full"}
            disabled={user?.token}
          />
          {/** Phone  */}
          <div className="my-[2px] w-full">
            <PhoneComponent
              t={t}
              register={register}
              placeholder={t("SendMessageForm.phone.placeholder")}
              name="phone"
              errors={errors}
              ServerErrors={ServerErrors}
              width="w-full"
              disabled={user?.token}
              withIcon
            />
          </div>

          {/** Email  */}

          <EmailComponent
            t={t}
            register={register}
            placeholder={t("SendMessageForm.email.placeholder")}
            name="email"
            errors={errors}
            ServerErrors={ServerErrors}
            width="w-full"
            withIcon
            disabled={user?.token}
          />
        </div>
        {/**  Message*/}

        <div className="w-1/2 md:w-full ">
          <MessageComponent
            t={t}
            register={register}
            placeholder={t("SendMessageForm.message.placeholder")}
            errors={errors}
            ServerErrors={ServerErrors}
            rows={showRating ? 5 : 7}
          />
          {showRating && (
            <RatingComponent
              placeholder={t("SendMessageForm.RatingComponent.placeholder")}
              rating={starts}
              setValue={setValue}
              stateName="starts"
            />
          )}
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
        disabled={!isValid || not_ropot === "no" || isLoading}
        isLoading={isLoading}
        width="w-1/3 md:w-1/2 sm:w-full"
        value={t("SendMessageForm.SubmitBtnComponent.value")}
      />
    </form>
  );
}

export default SendMessageForm;

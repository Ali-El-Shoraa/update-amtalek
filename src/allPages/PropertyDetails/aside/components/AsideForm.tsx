"use client";
import {
  useCallback,
  // useEffect
} from "react";
import { usePostData } from "@/Hooks/useAxios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRef } from "react";
import {
  // ComboBox,
  EmailComponent,
  MessageComponent,
  NumberComponent,
  PhoneComponent,
  ReCaptcha,
  SubmitBtnComponent,
  TextComponent,
} from "@/FormComponents/index";
import {
  // setUserProfileData,
  userData,
  // userProfileData,
} from "@/Store/Features/AuthenticationSlice";
import {
  // useDispatch,
  useSelector,
} from "react-redux";
// import { TUser } from "@/Types/AppTypes";
import { useTranslation } from "react-i18next";
import React from "react";
import ComboBoz from "@/FormComponents/ComboBoz";

function AsideForm({ type, api, Bgcolor, params, for_what, propID, refetch }: any) {
  const { t, i18n } = useTranslation("Pages_PropertyDetails");

  type ReCAPTCHAInstance = {
    reset: () => void;
  };
  const recaptchaRef = useRef<ReCAPTCHAInstance | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector(userData);
  // const userProfile = useSelector(userProfileData) as TUser | null;
  const offerOptions = [
    { title: t("AsideForm.offer_type.Options.for_rent"), id: "for_rent" },
    { title: t("AsideForm.offer_type.Options.for_sale"), id: "for_sale" },
  ];
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
      name: user?.token ? user?.data?.first_name + " " + user?.data?.last_name : "",
      phone: user?.token ? user?.data?.phone : "",
      email: user?.token ? user?.data?.email : "",
      not_ropot: "no",
      offer_type: "",
      from: "Web",
      property_id: propID,
    },
  });

  const not_ropot = watch("not_ropot");
  const offer_type = watch("offer_type");

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
      if (type === "offer") {
        refetch();
      }
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
    <section className="MAKE__YOUR--OFFER border border-primary bg-custome-venice p-6 rounded flex flex-col items-center gap-9 w-full">
      <h2 className="Property__name text-xl font-semibold text-center">
        {type === "offer" &&
          t("aside.MAKE_YOUR_OFFER", {
            defaultValue: t("aside.MAKE_YOUR_OFFER", {
              lng: i18n.language === "en" ? "en" : "",
            }),
          })}

        {type === "message" && t("send_message")}
      </h2>

      <form
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className="add__comment--form w-full flex flex-col justify-start gap-6"
      >
        {/**  Name  && Phone &&  Email*/}
        {/**  Name  */}
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
        {/** Phone  */}
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
        {/** Email  */}
        <EmailComponent
          register={register}
          placeholder={t("AsideForm.email.placeholder")}
          errors={errors}
          ServerErrors={ServerErrors}
          width="w-full"
          Bgcolor={Bgcolor}
          withIcon
          t={t}
          disabled={user?.token}
        />
        {type == "message" ? (
          <MessageComponent
            register={register}
            placeholder={t("AsideForm.message.placeholder")}
            errors={errors}
            ServerErrors={ServerErrors}
            rows={7}
            Bgcolor={Bgcolor}
            t={t}
          />
        ) : type == "offer" ? (
          <>
            <NumberComponent
              register={register}
              errors={errors}
              ServerErrors={ServerErrors}
              name="offer"
              placeholder={t("AsideForm.offer.placeholder")}
              width="w-full"
              withIcon
              Bgcolor={Bgcolor}
              icon={"offer"}
              t={t}
            />
            {for_what === "for_both" && (
              <div className="flex w-full flex-col items-start text-lg justify-center gap-2">
                {/* <ComboBox
                  selectBox
                  setValue={setValue}
                  data={offerOptions}
                  placeholder={t("AsideForm.offer_type.placeholder")}
                  stateName={"offer_type"}
                  isSuccess={isSuccess}
                /> */}

                <ComboBoz
                  selectBox
                  setValue={setValue}
                  data={offerOptions}
                  placeholder={t("AsideForm.offer_type.placeholder")}
                  stateName={"offer_type"}
                  isSuccess={isSuccess}
                />
                {submitted && offer_type === "" && (
                  <p className="pt-2 text-xs text-red-500">{t("AsideForm.offer_type.err_msg")}</p>
                )}
                {
                  //!--- server errors --------
                  ServerErrors?.response?.data?.errors?.offer_type && (
                    <p className="pt-2 text-xs text-red-500">
                      {ServerErrors?.response?.data?.errors?.offer_type[0]}
                    </p>
                  )
                }
              </div>
            )}
          </>
        ) : (
          ""
        )}
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
        {/** Submit Button */}
        <SubmitBtnComponent
          disabled={
            !isValid ||
            not_ropot === "no" ||
            (offer_type === "" && for_what === "for_both" && type == "offer") ||
            isLoading
          }
          isLoading={isLoading}
          value={t("AsideForm.SubmitBtnComponent.value", { context: type })}
        />
      </form>
    </section>
  );
}

export default AsideForm;

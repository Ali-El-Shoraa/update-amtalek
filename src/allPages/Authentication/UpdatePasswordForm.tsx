import { useCallback, memo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { PasswordComponent, ReCaptcha, SubmitBtnComponent } from "@/FormComponents";
import { usePostData } from "@/Hooks/usePostData";

function UpdatePasswordForm({ loginDispatch, email, code, t }: any) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    getValues,
    setValue,
    watch,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: email,
      code: code,
      password: "",
      // new_password: "",
      confirm_new_password: "",
      not_ropot: "no",
      created_from: "web",
    },
  });
  const recaptchaRef = useRef<any>(null);

  const not_ropot = watch("not_ropot");

  const {
    mutate: postSetPasswordData,
    isLoading,
    error: ServerErrors,
  }: any = usePostData(
    true,
    () => {
      recaptchaRef.current.reset();
      reset();
      setValue("not_ropot", "no");
      loginDispatch({
        type: "setForgotPassword",
        payload: false,
      });
      loginDispatch({
        type: "setCodeSentSuccess",
        payload: false,
      });
      loginDispatch({
        type: "setCodeVerifiedSuccess",
        payload: false,
      });
      setSubmitted(false);
    },
    true, // authorizedAPI (قم بتغييرها حسب الحاجة)
    (error) => {
      // هنا يمكنك التعامل مع الخطأ كما تريد
      console.error("Error occurred:", error);
    }
  );

  const onSubmit = useCallback(
    (data: any) => {
      setSubmitted(true);
      postSetPasswordData({
        api: process.env.NEXT_PUBLIC_FORGET_PASSWORD,
        data: data,
      });
    },
    [postSetPasswordData]
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
      className="register--form  w-full px-8 h-full  flex flex-col items-start justify-start gap-6  py-2 overflow-y-auto"
    >
      <h1 className=" text-xl font-medium  text-center w-full mb-4">
        {t("UpdatePasswordForm.heading")}
      </h1>

      {/** Password  */}

      <PasswordComponent
        t={t}
        width={"w-full"}
        register={register}
        name="password"
        // name="new_password"
        label={t("UpdatePasswordForm.new_password.label")}
        placeholder={t("UpdatePasswordForm.new_password.placeholder")}
        errors={errors}
        ServerErrors={ServerErrors}
      />
      {/** Confirm Password  */}
      <PasswordComponent
        t={t}
        width={"w-full"}
        register={register}
        name="confirm_new_password"
        label={t("UpdatePasswordForm.confirm_new_password.label")}
        placeholder={t("UpdatePasswordForm.confirm_new_password.placeholder")}
        errors={errors}
        ServerErrors={ServerErrors}
        validations={{
          validate: (value: any) => value === getValues("password"),
          // validate: (value: any) => value === getValues("new_password"),
        }}
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
        value={t("UpdatePasswordForm.SubmitBtnComponent.value")}
      />
    </form>
  );
}
export default memo(UpdatePasswordForm);

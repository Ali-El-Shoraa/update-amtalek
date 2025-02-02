"use client";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faCheck,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { DatePicker, Space } from "antd";

import {
  // ComboBox,
  EmailComponent,
  PasswordComponent,
  PhoneComponent,
  ReCaptcha,
  SubmitBtnComponent,
  TextComponent,
  UploadFileComponent,
} from "@/FormComponents/index";

import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setRegistrationUserType } from "@/Store/Features/AuthenticationSlice";
import { usePostData } from "@/Hooks/usePostData";
import VerificationCodeForm from "./VerificationCodeForm";
import LangLink from "@/components/LangLink";
import { useRouter } from "next/navigation";
import ComboBox from "./ComboBox";
import getData from "@/lib/api/getData";

function Register() {
  const { t, i18n } = useTranslation("Pages_Register");
  // const i18n.language = useSelector(lang);
  // const {i18n}= useTranslation();
  const dispatchRedux = useDispatch();
  const birthdayRef = useRef<any>(null);

  const router = useRouter();
  const recaptchaRef = useRef<any>(null);
  const [submitted, setSubmitted] = useState<any>(false);
  const [checkBroker, setCheckBroker] = useState("");
  const [savedEmailBeforeReset, setSavedEmailBeforeReset] = useState<any>("");
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);
  const [showVerificationCodeForm, setShowVerificationCodeForm] =
    useState<any>(false);
  function reducer(state: any, action: any) {
    switch (action.type) {
      case "setHide": {
        return {
          ...state,
          hide: !state?.hide,
        };
      }

      case "setFormStep": {
        return {
          ...state,
          formStep: action.payload,
        };
      }
      case "DecreaseFormStep": {
        return {
          ...state,
          formStep: state.formStep - 1,
        };
      }
      case "IncreaseFormStep": {
        return {
          ...state,
          formStep: state.formStep + 1,
        };
      }
      case "setRegisterSuccess": {
        return {
          ...state,
          registerSuccess: action.payload,
        };
      }
      case "setHaveCode": {
        return {
          ...state,
          haveCode: action.payload,
        };
      }
      default:
        throw Error("Unknown action: " + action.type);
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    hide: false,
    formStep: 1,
    registerSuccess: false,
    haveCode: false,
  });

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
      iam: "",
      company_name: "",
      company_logo: "",
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password: "",
      confirm_password: "",
      birthday: "",
      gender: "",
      accept_condition: "",
      country: "",
      // city: "",
      // region: "",
      not_ropot: "no",
      created_from: "web",
    },
  });

  const iam = watch("iam");
  const company_name = watch("company_name");
  const vendor_type = watch("vendor_type");
  const company_logo = watch("company_logo");
  const country = watch("country");
  const city = watch("city");
  const not_ropot = watch("not_ropot");
  const firstNameWatch = watch("first_name");
  const secondNameWatch = watch("last_name");
  const phone = watch("phone");
  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirm_password");
  const birthday = watch("birthday");
  const gender = watch("gender");
  const { ref, ...rest } = register("birthday");

  const userTypeData = [
    { id: "individual", title: t("step_0.user_type.selections.individual") },
    { id: "company", title: t("step_0.user_type.selections.company") },
  ];

  const companyTypeData = [
    { id: "broker", title: t("step_0.company_type.selections.broker") },
    { id: "developer", title: t("step_0.company_type.selections.developer") },
  ];

  // const useFetch = (url, options) => {
  const [countriesData, setDataCountriesData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(
          `web/${process.env.NEXT_PUBLIC_COUNTRIES_REGISTER}`,
          i18n.language
        );
        // if (!response.ok) {
        //   throw new Error("Network response was not ok");
        // }
        const result = response;
        setDataCountriesData(result?.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    mutate: registerUser,
    isSuccess,
    isLoading,
    error: ServerErrors,
  }: any = usePostData(
    true,
    () => {
      recaptchaRef.current.reset();
      reset();
      setValue("not_ropot", "no");
      dispatch({ type: "setRegisterSuccess", payload: true });
      setSubmitted(false);
      // if (iam === "company") {
      //   router.push(`/login`);
      // } else if (iam === "individual") {
      setShowVerificationCodeForm(true);
      // }
    },
    true,
    () => {}
  );
  const { mutate: sendVerificationCode }: any = usePostData(
    true,
    () => {},
    true,
    () => {}
  );

  //!-- request the code only after a successful register

  useEffect(() => {
    if (isSuccess && showVerificationCodeForm) {
      sendVerificationCode({
        // ${process.env.NEXT_PUBLIC_BASE_URL_FULL}
        api: `${process.env.NEXT_PUBLIC_SEND_CODE_TO_EMAIL}`,
        data: {
          actor_type: checkBroker,
          operation_type: "verify_code",
          email: savedEmailBeforeReset,
        },

        file: undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    email,
    isSuccess,
    savedEmailBeforeReset,
    sendVerificationCode,
    showVerificationCodeForm,
  ]);
  // city !== "" &&
  //   region !== "" &&
  // , city, region
  useEffect(() => {
    if (country !== "" && not_ropot !== "no") {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  }, [not_ropot, country]);

  // useEffect(() => {
  //   if (country !== "") {
  //     refetchCities();
  //   }
  // }, [country, refetchCities]);

  // useEffect(() => {
  //   if (city !== "") {
  //     refetchRegions();
  //   }
  // }, [city, refetchRegions]);

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
  const handleClick = () => {
    if (birthdayRef.current) {
      birthdayRef.current?.showPicker();
    }
  };

  const onSubmit = useCallback(
    (data: any) => {
      setSubmitted(true);
      if (allFieldsFilled) {
        setSavedEmailBeforeReset(email);
        setCheckBroker(() => (iam === "company" ? "broker" : ""));
        const finalData = {
          ...data,
          accept_condition: data.accept_condition === true ? "yes" : "no",
          company_logo: iam === "company" ? company_logo?.[0] : null,
          company_name: iam === "company" ? company_name : null,
          actor_type: iam === "company" ? "broker" : null,
          vendor_type: iam === "company" ? vendor_type : null,
        };

        registerUser({
          // ${process.env.NEXT_PUBLIC_BASE_URL_FULL}
          api: `${process.env.NEXT_PUBLIC_REGISTER_USER}`,
          data: finalData,
          file: true,
        });
      } else toast.error("Please fill in all the required fields!");
    },
    [allFieldsFilled, email, registerUser, company_logo, company_name, iam]
  );
  const validateAge = useCallback((value: any) => {
    const selected = new Date(value).getFullYear();
    const now = new Date().getFullYear();
    return now - selected >= 18;
  }, []);

  if ((state.registerSuccess || state.haveCode) && showVerificationCodeForm) {
    return (
      <>
        {/*  <HelmetTags title={t("tab.title")} description={t("tab.description")} /> */}
        <div className="register--form  w-full min-h-[600px   flex flex-col justify-between gap- px-8 h-44   pt-2   overflow-y-auto relative overflow-x-hidden py-10">
          <div className="form__top  ">
            <h1 className=" text-2xl font-medium  text-center w-full mb-4 ">
              {t("heading")}
            </h1>
            <div
              dir="ltr"
              className="form__Steps--numbers w-full justify-center items-center flex  gap-2 axss:gap-1 "
            >
              <div
                className={`step__one  ${
                  state.formStep >= 2
                    ? "bg-secondary text-bg"
                    : "bg-grey text-secondary"
                }  font-medium text-2xl w-12 aspect-square lg:text-xl rounded-full flex justify-center items-center min-w-fit xxl:w-9`}
              >
                {state.formStep >= 2 ? (
                  <FontAwesomeIcon icon={faCheck} />
                ) : i18n.language === "ar" ? (
                  "١"
                ) : (
                  "1"
                )}
              </div>
              <div className="w-16 xxl:w-12 md:w-9 axss:w-5  h-[2px] bg-grey  ">
                <hr
                  className={`border-secondary duration-300 ease-in-out transition-all ${
                    state.formStep >= 2
                      ? "w-16 xxl:w-12 md:w-9 axss:w-5 border-[1px]"
                      : " w-0   "
                  } `}
                />
              </div>
              <div
                className={`step__two  ${
                  state.formStep >= 3
                    ? "bg-secondary text-bg"
                    : "bg-grey text-secondary"
                }  font-medium text-2xl w-12 aspect-square lg:text-xl rounded-full flex justify-center items-center min-w-fit xxl:w-9`}
              >
                {state.formStep >= 3 ? (
                  <FontAwesomeIcon icon={faCheck} />
                ) : i18n.language === "ar" ? (
                  "٢"
                ) : (
                  "2"
                )}
              </div>
              <div className="w-16 xxl:w-12 md:w-9 axss:w-5  h-[2px] bg-grey">
                <hr
                  className={`border-secondary duration-300 ease-in-out transition-all ${
                    state.formStep >= 3
                      ? "w-16 xxl:w-12 md:w-9 axss:w-5 border-[1px]"
                      : " w-0   "
                  } `}
                />
              </div>
              <div
                className={`step__two  ${
                  state.formStep >= 4
                    ? "bg-secondary text-bg"
                    : "bg-grey text-secondary"
                }  font-medium text-2xl w-12 aspect-square lg:text-xl rounded-full flex justify-center items-center min-w-fit xxl:w-9`}
              >
                {state.formStep >= 4 ? (
                  <FontAwesomeIcon icon={faCheck} />
                ) : i18n.language === "ar" ? (
                  "٣"
                ) : (
                  "3"
                )}
              </div>
              <div className="w-16 xxl:w-12 md:w-9 axss:w-5  h-[2px] bg-grey">
                <hr
                  className={`border-secondary duration-300 ease-in-out transition-all ${
                    state.formStep >= 4
                      ? "w-16 xxl:w-12 md:w-9 axss:w-5 border-[1px]"
                      : " w-0   "
                  } `}
                />
              </div>
              <div
                className={`step__two  ${
                  state.formStep >= 5
                    ? "bg-secondary text-bg"
                    : "bg-secondary text-bg"
                }  font-medium text-2xl w-12 aspect-square lg:text-xl rounded-full flex justify-center items-center min-w-fit xxl:w-9`}
              >
                {state.formStep >= 5 ? (
                  <FontAwesomeIcon icon={faCheck} />
                ) : (
                  <FontAwesomeIcon icon={faCheck} />
                )}
              </div>
              <div className="w-16 xxl:w-12 md:w-9 axss:w-5  h-[2px] bg-grey">
                <hr
                  className={`border-secondary duration-300 ease-in-out transition-all ${
                    state.formStep >= 5
                      ? "w-16 xxl:w-12 md:w-9 axss:w-5 border-[1px]"
                      : " w-0   "
                  } `}
                />
              </div>
              <div
                className={`step__three  ${
                  state.formStep >= 5
                    ? "bg-secondary text-bg"
                    : "bg-grey text-secondary"
                }  font-medium text-2xl w-12 aspect-square lg:text-xl rounded-full flex justify-center items-center min-w-fit xxl:w-9`}
              >
                {state.formStep >= 5 ? (
                  <FontAwesomeIcon icon={faThumbsUp} />
                ) : i18n.language === "ar" ? (
                  <FontAwesomeIcon icon={faThumbsUp} />
                ) : (
                  <FontAwesomeIcon icon={faThumbsUp} />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* ****************************************************************************************** */}
        <VerificationCodeForm
          from="register"
          email={savedEmailBeforeReset}
          t={t}
          heading={t("VerificationCodeForm.heading_for_verify_account")}
          checkBroker={checkBroker}
        />
      </>
    );
  }

  return (
    <>
      {/* <HelmetTags title={t("tab.title")} description={t("tab.description")} /> */}
      <form
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className="register--form  w-full min-h-[600px   flex flex-col justify-between gap- px-8 h-full  pt-2   overflow-y-auto relative overflow-x-hidden py-10"
      >
        <div className="form__top  ">
          <h1 className=" text-2xl font-bold  text-center w-full mb-4">
            {t("heading")}
          </h1>
          <div
            dir="ltr"
            className="form__Steps--numbers w-full justify-center items-center flex  gap-2 axss:gap-1 "
          >
            <div
              className={`step__one  ${
                state.formStep >= 2
                  ? "bg-secondary text-bg"
                  : "bg-grey text-secondary"
              }  font-medium text-2xl w-12 aspect-square lg:text-xl rounded-full flex justify-center items-center min-w-fit xxl:w-9`}
            >
              {state.formStep >= 2 ? (
                <FontAwesomeIcon icon={faCheck} />
              ) : i18n.language === "ar" ? (
                "١"
              ) : (
                "1"
              )}
            </div>
            <div className="w-16 xxl:w-12 md:w-9 axss:w-5  h-[2px] bg-grey  ">
              <hr
                className={`border-secondary duration-300 ease-in-out transition-all ${
                  state.formStep >= 2
                    ? "w-16 xxl:w-12 md:w-9 axss:w-5 border-[1px]"
                    : " w-0   "
                } `}
              />
            </div>
            <div
              className={`step__two  ${
                state.formStep >= 3
                  ? "bg-secondary text-bg"
                  : "bg-grey text-secondary"
              }  font-medium text-2xl w-12 aspect-square lg:text-xl rounded-full flex justify-center items-center min-w-fit xxl:w-9`}
            >
              {state.formStep >= 3 ? (
                <FontAwesomeIcon icon={faCheck} />
              ) : i18n.language === "ar" ? (
                "٢"
              ) : (
                "2"
              )}
            </div>
            <div className="w-16 xxl:w-12 md:w-9 axss:w-5  h-[2px] bg-grey">
              <hr
                className={`border-secondary duration-300 ease-in-out transition-all ${
                  state.formStep >= 3
                    ? "w-16 xxl:w-12 md:w-9 axss:w-5 border-[1px]"
                    : " w-0   "
                } `}
              />
            </div>
            <div
              className={`step__two  ${
                state.formStep >= 4
                  ? "bg-secondary text-bg"
                  : "bg-grey text-secondary"
              }  font-medium text-2xl w-12 aspect-square lg:text-xl rounded-full flex justify-center items-center min-w-fit xxl:w-9`}
            >
              {state.formStep >= 4 ? (
                <FontAwesomeIcon icon={faCheck} />
              ) : i18n.language === "ar" ? (
                "٣"
              ) : (
                "3"
              )}
            </div>
            <div className="w-16 xxl:w-12 md:w-9 axss:w-5  h-[2px] bg-grey">
              <hr
                className={`border-secondary duration-300 ease-in-out transition-all ${
                  state.formStep >= 4
                    ? "w-16 xxl:w-12 md:w-9 axss:w-5 border-[1px]"
                    : " w-0   "
                } `}
              />
            </div>
            <div
              className={`step__two  ${
                state.formStep >= 5
                  ? "bg-secondary text-bg"
                  : "bg-grey text-secondary"
              }  font-medium text-2xl w-12 aspect-square lg:text-xl rounded-full flex justify-center items-center min-w-fit xxl:w-9`}
            >
              {state.formStep >= 5 ? (
                <FontAwesomeIcon icon={faCheck} />
              ) : i18n.language === "ar" ? (
                "٤"
              ) : (
                "4"
              )}
            </div>
            <div className="w-16 xxl:w-12 md:w-9 axss:w-5  h-[2px] bg-grey">
              <hr
                className={`border-secondary duration-300 ease-in-out transition-all ${
                  state.formStep >= 5
                    ? "w-16 xxl:w-12 md:w-9 axss:w-5 border-[1px]"
                    : " w-0   "
                } `}
              />
            </div>
            <div
              className={`step__three  ${
                state.formStep >= 5
                  ? "bg-secondary text-bg"
                  : "bg-grey text-secondary"
              }  font-medium text-2xl w-12 aspect-square lg:text-xl rounded-full flex justify-center items-center min-w-fit xxl:w-9`}
            >
              {state.formStep >= 5 ? (
                <FontAwesomeIcon icon={faThumbsUp} />
              ) : i18n.language === "ar" ? (
                <FontAwesomeIcon icon={faThumbsUp} />
              ) : (
                <FontAwesomeIcon icon={faThumbsUp} />
              )}
            </div>
          </div>
        </div>
        <section
        // className="min-h-[370px] md:min-h-[470px]"
        >
          <section
            dir="ltr"
            className={`form__steps flex justify-start items-start w-[500%]  absolute  top-32 md:top-28 transition-all duration-300 bg-del ease-in-out  
        h-72 md:h-fit bg- asmm:pt-7
        ${
          state.formStep === 1
            ? "left-0"
            : state.formStep === 2
            ? "-left-full"
            : state.formStep === 3
            ? "left-[-200%]"
            : state.formStep === 4
            ? "left-[-300%]"
            : state.formStep === 5
            ? "left-[-400%]"
            : "left-0"
        }
`}
          >
            <section
              dir={i18n.language === "ar" ? "rtl" : "ltr"}
              className="first_step px-8   w-1/5  flex flex-col items-start justify-start gap-6"
            >
              <>
                {/** user Type  */}
                {
                  //!we must'nt make the check here (state.formStep === 0 && ) because if the check is set and the user went to another step then went back to this step , the selected image will be removed because the input were removed from the dom "
                }
                <label
                  className=" flex w-full  flex-col items-start justify-center gap-2  "
                  htmlFor="user_type"
                >
                  {t("step_0.user_type.label")}

                  <ComboBox
                    company_name={"company_name"}
                    company_logo={"company_logo"}
                    setValue={setValue}
                    data={userTypeData}
                    placeholder={t("step_0.user_type.placeholder")}
                    stateName={"iam"}
                    light
                    selectBox
                    callBcFn={(type: any) =>
                      dispatchRedux(setRegistrationUserType(type))
                    }
                  />
                  {submitted && iam === "" && (
                    <p className="pt-2 text-xs text-red-500">
                      {t("step_0.user_type.validation_required")}
                    </p>
                  )}
                  {
                    //!--- server errors --------
                    ServerErrors?.response?.data?.errors?.iam && (
                      <p className="pt-2 text-xs text-red-500">
                        {ServerErrors?.response?.data?.errors?.iam[0]}
                      </p>
                    )
                  }
                </label>
                {iam === "company" && (
                  <div className="flex w-full items-start justify-between gap-16 md:flex-col lg:gap-10 md:gap-6">
                    {/** First Name  */}

                    <div className="flex flex-col gap-5">
                      <label
                        className=" flex w-full  flex-col items-start justify-center gap-2  text-lg"
                        htmlFor="vendor_type"
                      >
                        {t("step_0.company_type.label")}
                        <ComboBox
                          setValue={setValue}
                          data={companyTypeData}
                          placeholder={t("step_0.company_type.placeholder")}
                          stateName={"vendor_type"}
                          light
                          errors={errors}
                          ServerErrors={ServerErrors}
                          NotFoundMessage={t(
                            "step_0.company_type.NotFoundMessage"
                          )}
                        />
                        {submitted && vendor_type === "" && (
                          <p className="pt-2 text-xs text-red-500">
                            {t("step_0.company_type.validation_required")}
                          </p>
                        )}
                        {
                          //!--- server errors --------
                          ServerErrors?.response?.data?.errors?.vendor_type && (
                            <p className="pt-2 text-xs text-red-500">
                              {
                                ServerErrors?.response?.data?.errors
                                  ?.vendor_type?.[0]
                              }
                            </p>
                          )
                        }
                      </label>

                      <TextComponent
                        t={t}
                        register={register}
                        name="company_name"
                        label={t("step_0.company_name.label")}
                        placeholder={t("step_0.company_name.placeholder")}
                        errors={errors}
                        ServerErrors={ServerErrors}
                        width="w-full"
                      />
                    </div>

                    <div>
                      <UploadFileComponent
                        required={iam == "company"}
                        register={register}
                        errors={errors}
                        ServerErrors={ServerErrors}
                        name="company_logo"
                        label={t("step_0.company_logo.label")}
                        btnText={t("step_0.company_logo.btnText")}
                        watch={watch}
                        t={t}
                        fileFor="company_logo"
                      />
                      <span className="text-[10px]">
                        {t("step_0.company_logo.hint")}
                      </span>
                      {/* {company_logo[0]?.size} */}
                    </div>
                  </div>
                )}
              </>
            </section>
            <section
              dir={i18n.language === "ar" ? "rtl" : "ltr"}
              className="first_step px-8   w-1/5  flex flex-col items-start justify-start gap-6"
            >
              {state.formStep === 2 && (
                <>
                  {/** First & Second Names  */}
                  <div className="flex w-full items-start justify-between gap-16 md:flex-col lg:gap-10 md:gap-6">
                    {/** First Name  */}

                    <TextComponent
                      t={t}
                      register={register}
                      name="first_name"
                      label={t("step_1.first_name.label")}
                      placeholder={t("step_1.first_name.placeholder")}
                      errors={errors}
                      ServerErrors={ServerErrors}
                    />

                    {/** Second Name  */}

                    <TextComponent
                      t={t}
                      register={register}
                      name="last_name"
                      label={t("step_1.last_name.label")}
                      placeholder={t("step_1.last_name.placeholder")}
                      errors={errors}
                      ServerErrors={ServerErrors}
                    />
                  </div>
                  {/** Phone & Email  */}
                  <div className="flex w-full items-start justify-between gap-16 md:flex-col lg:gap-10 md:gap-6">
                    {/** Phone  */}
                    <PhoneComponent
                      t={t}
                      register={register}
                      name="phone"
                      label={t("step_1.phone.label")}
                      placeholder={t("step_1.phone.placeholder")}
                      errors={errors}
                      ServerErrors={ServerErrors}
                    />
                    {/** Email  */}
                    <EmailComponent
                      t={t}
                      register={register}
                      name="email"
                      label={t("step_1.email.label")}
                      placeholder={t("step_1.email.placeholder")}
                      errors={errors}
                      ServerErrors={ServerErrors}
                    />
                  </div>{" "}
                  <div className="flex w-full items-start justify-between gap-16 md:flex-col lg:gap-10  md:gap-6">
                    {/** Password  */}
                    <PasswordComponent
                      t={t}
                      register={register}
                      name="password"
                      label={t("step_2.password.label")}
                      placeholder={t("step_2.password.placeholder")}
                      errors={errors}
                      ServerErrors={ServerErrors}
                    />
                    {/** Confirm Password  */}
                    <PasswordComponent
                      t={t}
                      register={register}
                      name="confirm_password"
                      label={t("step_2.confirm_password.label")}
                      placeholder={t("step_2.confirm_password.placeholder")}
                      errors={errors}
                      ServerErrors={ServerErrors}
                      validations={{
                        validate: (value: any) =>
                          value === getValues("password"),
                      }}
                    />
                  </div>
                </>
              )}
            </section>
            <section
              dir={i18n.language === "ar" ? "rtl" : "ltr"}
              className="second_step px-8   w-1/5  flex flex-col items-start justify-start gap-6"
            >
              {" "}
              {state.formStep === 3 && (
                <>
                  {/** Passwords  */}
                  <label
                    className=" flex w-full  flex-col items-start justify-center gap-2  "
                    htmlFor="country"
                  >
                    {t("step_2.Country.label")}
                    <ComboBox
                      getValues={getValues}
                      setValue={setValue}
                      data={countriesData}
                      placeholder={t("step_2.Country.placeholder")}
                      stateName={"country"}
                      light
                      NotFoundMessage={t("step_2.Country.NotFoundMessage")}
                    />
                    {submitted && country === "" && (
                      <p className="pt-2 text-xs text-red-500">
                        {t("step_2.Country.validation_required")}
                      </p>
                    )}
                    {
                      //!--- server errors --------
                      ServerErrors?.response?.data?.errors?.country && (
                        <p className="pt-2 text-xs text-red-500">
                          {ServerErrors?.response?.data?.errors?.country[0]}
                        </p>
                      )
                    }
                  </label>
                  {/** Birthday  */}
                  {/* <DatePicker
                    id="birthday"
                    placeholder={t("step_2.birthday.placeholder")}
                    min="1899-01-01"
                    max="2004-13-13"
                    autoComplete="on"
                    {...register("birthday", {
                      required: true,
                      validate: validateAge,
                    })}
                  /> */}
                  <label
                    className=" flex bg w-full flex-col items-start justify-center gap-2  "
                    htmlFor="birthday"
                  >
                    {t("step_2.birthday.label")}
                    <input
                      onClick={handleClick}
                      className="light-bg-inputs w-full pr-2 cursor-pointer"
                      type="date"
                      id="birthday"
                      placeholder={t("step_2.birthday.placeholder")}
                      min="1899-01-01"
                      max="2004-13-13"
                      autoComplete="on"
                      ref={(e) => {
                        ref(e);
                        birthdayRef.current = e; // you can still assign to ref
                      }}
                      {...rest}
                    />
                    <span className="ss:text-sm">
                      {t("step_2.birthday.validation_age")}
                    </span>
                    {errors.birthday && (
                      <p className="pt-2 text-xs text-red-500">
                        {errors.birthday.type === "required" &&
                          t("step_2.birthday.validation_required")}
                        {errors.birthday.type === "validate" &&
                          t("step_2.birthday.validation_age")}
                      </p>
                    )}

                    {
                      //!--- server errors --------
                      ServerErrors &&
                        ServerErrors?.response?.data?.errors?.birthday && (
                          <p className="pt-2 text-xs text-red-500">
                            {ServerErrors?.response?.data?.errors?.birthday[0]}
                          </p>
                        )
                    }
                  </label>
                  {/** Gender  */}
                  <div className=" flex w-full flex-col items-start justify-center gap-2  ">
                    {t("step_2.gender.label")}
                    <div className="flex w-full items-start justify-start gap-6">
                      <div className=" flex w-fit  light-bg-inputs cursor-pointer px-2 items-center justify-center gap-3 ">
                        <div className="checkbox-wrapper">
                          <div className="cbx">
                            <input
                              id="male"
                              className=" w-full cursor-pointer"
                              type="radio"
                              name="male"
                              value="male"
                              {...register("gender", {
                                required: true,
                              })}
                            />
                            <label htmlFor="male"></label>
                            <svg
                              width="15"
                              height="14"
                              viewBox="0 0 15 14"
                              fill="none"
                            >
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
                                <feBlend
                                  in="SourceGraphic"
                                  in2="goo-12"
                                ></feBlend>
                              </filter>
                            </defs>
                          </svg>
                        </div>

                        <label className="w-fit  cursor-pointer" htmlFor="male">
                          {t("step_2.gender.male")}
                        </label>
                      </div>
                      <div className=" flex w-fit light-bg-inputs cursor-pointer px-2 items-center justify-center gap-3 ">
                        <div className="checkbox-wrapper">
                          <div className="cbx">
                            <input
                              id="female"
                              className=" w-full cursor-pointer"
                              type="radio"
                              name="female"
                              value="female"
                              {...register("gender", {
                                required: true,
                              })}
                            />
                            <label htmlFor="female"></label>
                            <svg
                              width="15"
                              height="14"
                              viewBox="0 0 15 14"
                              fill="none"
                            >
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
                                <feBlend
                                  in="SourceGraphic"
                                  in2="goo-12"
                                ></feBlend>
                              </filter>
                            </defs>
                          </svg>
                        </div>

                        <label
                          className="w-fit  cursor-pointer"
                          htmlFor="female"
                        >
                          {t("step_2.gender.female")}
                        </label>
                      </div>
                    </div>{" "}
                    {errors.gender && (
                      <p className="pt-2 text-xs text-red-500">
                        {errors.gender.type === "required" &&
                          t("step_2.gender.validation_required")}
                      </p>
                    )}
                    {
                      //!--- server errors --------
                      ServerErrors &&
                        ServerErrors?.response?.data?.errors?.gender && (
                          <p className="pt-2 text-xs text-red-500">
                            {ServerErrors?.response?.data?.errors?.gender[0]}
                          </p>
                        )
                    }
                  </div>
                </>
              )}
            </section>
            <section
              dir={i18n.language === "ar" ? "rtl" : "ltr"}
              className="third_step px-8   w-1/5  flex flex-col items-start justify-start gap-6 "
            >
              <>
                {
                  //!we must'nt make the check here (state.formStep === 4 && ) beccause if the check is set and the user went to another step then went back to thi step , the selections will be removed because the select boxes were removed from the dom "
                }
                {/** Country  */}

                {/** City  */}
                {/* {country && (
                  <label
                    className=" flex w-full flex-col items-start justify-center gap-2  "
                    htmlFor="city"
                  >
                    {t("step_3.City.label")}
                    <ComboBox
                      setValue={setValue}
                      data={citiesData}
                      placeholder={t("step_3.City.placeholder")}
                      stateName="city"
                      light
                      NotFoundMessage={t("step_3.City.NotFoundMessage")}
                    />
                    {submitted && city === "" && (
                      <p className="pt-2 text-xs text-red-500">
                        {t("step_3.City.validation_required")}
                      </p>
                    )}
                    {
                      //!--- server errors --------
                      ServerErrors?.response?.data?.errors?.city && (
                        <p className="pt-2 text-xs text-red-500">
                          {ServerErrors?.response?.data?.errors?.city[0]}
                        </p>
                      )
                    }
                  </label>
                )} */}
                {/** Region  */}
                {/* {city && (
                  <label
                    className=" flex w-full flex-col items-start justify-center gap-2  "
                    htmlFor="region"
                  >
                    {t("step_3.Region.label")}
                    <ComboBox
                      setValue={setValue}
                      data={regionsData}
                      placeholder={t("step_3.Region.placeholder")}
                      stateName="region"
                      light
                      NotFoundMessage={t("step_3.Region.NotFoundMessage")}
                    />
                    {submitted && region === "" && (
                      <p className="pt-2 text-xs text-red-500">
                        {t("step_3.Region.validation_required")}
                      </p>
                    )}
                    {
                      //!--- server errors --------
                      ServerErrors?.response?.data?.errors?.region && (
                        <p className="pt-2 text-xs text-red-500">
                          {ServerErrors?.response?.data?.errors?.region[0]}
                        </p>
                      )
                    }
                  </label>
                )} */}
                <>
                  <div className="flex w-full items-start justify-between md:flex-col gap-6">
                    <div className="terms__recapatcha flex flex-col w-fit md:w-full gap-6">
                      <div className=" flex  w-full flex-col items-start justify-center gap-2  ">
                        <div className=" flex w-fit  items-center justify-center gap-5 ">
                          <div className="checkbox-wrapper">
                            <div className="cbx">
                              <input
                                id="accept_condition"
                                className=" w-full"
                                type="checkbox"
                                name="accept_condition"
                                {...register("accept_condition", {
                                  required: true,
                                })}
                              />
                              <label htmlFor="accept_condition"></label>
                              <svg
                                width="15"
                                height="14"
                                viewBox="0 0 15 14"
                                fill="none"
                              >
                                <path d="M2 8.36364L6.23077 12L13 2"></path>
                              </svg>
                            </div>

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                            >
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
                                  <feBlend
                                    in="SourceGraphic"
                                    in2="goo-12"
                                  ></feBlend>
                                </filter>
                              </defs>
                            </svg>
                          </div>

                          <label
                            className="w-fit  cursor-pointer"
                            htmlFor="accept_condition"
                          >
                            {t("step_4.terms.txt")}{" "}
                            <LangLink
                              to="/terms-conditions"
                              className="font-medium underline underline-offset-4"
                              rel="noreferrer"
                              target={"_blank"}
                            >
                              {t("step_4.terms.CTA")}
                            </LangLink>{" "}
                          </label>
                        </div>
                        {errors.accept_condition && (
                          <p className="pt-2 text-xs text-red-500">
                            {errors.accept_condition.type === "required" &&
                              t("step_4.terms.validation_required")}
                          </p>
                        )}
                        {
                          //!--- server errors --------
                          ServerErrors &&
                            ServerErrors?.response?.data?.errors
                              ?.accept_condition && (
                              <p className="pt-2 text-xs text-red-500">
                                {
                                  ServerErrors?.response?.data?.errors
                                    ?.accept_condition[0]
                                }
                              </p>
                            )
                        }
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
                    </div>
                    {/* {user_type == "individual" && (
                    <UploadFileComponent
                      required={user_type == "individual"}
                      register={register}
                      errors={errors}
                      ServerErrors={ServerErrors}
                      name="user_img"
                      label={t("step_4.user_img.label")}
                      btnText={t("step_4.user_img.btnText")}
                      watch={watch}
                      t={t}
                      fileFor="user_register"
                    />
                  )} */}
                  </div>
                  {/** Submit Button */}

                  <SubmitBtnComponent
                    disabled={!isValid || !allFieldsFilled || isLoading}
                    isLoading={isLoading}
                    value={t("step_4.SubmitBtnComponent.value")}
                  />
                </>
              </>
            </section>
            <section
              dir={i18n.language === "ar" ? "rtl" : "ltr"}
              className="fourth_step px-8   w-1/5  flex flex-col items-start justify-start gap-6"
            >
              {/**  Accept The Privacy  */}
              {state.formStep === 5 &&
                //!we ust make this check to remove the recpatch from the dom /viewport ,otherwise if the uer went back to any step rather than the recpatch step and the recpatch had expired it will trigger onfocus on the recpatch and the move the steps to the recpatch steps but without any navigation arrows
                ""}
            </section>
          </section>
        </section>

        {/* button to step */}
      </form>

      <div className="form__bottom  bg- w-full px-8 pb-7 pt-3 asmm:shadow-custom">
        <div className="steps__controller w-full flex rtl:flex-row-reverse justify-between items-center ">
          <button
            title={t("form__bottom.navigation.prev_btn")}
            type="button"
            disabled={state.formStep < 2 || state.formStep >= 6}
            onClick={() => dispatch({ type: "DecreaseFormStep" })}
            className={`prev__step rounded-full flex justify-center items-center bg-grey text-secondary w-10 h-10 cursor-pointer text-xl   ease-in-out transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <FontAwesomeIcon className="rotate-180 " icon={faAngleRight} />
          </button>
          <div
            title={t("form__bottom.navigation.next_btn")}
            className="flex next_btns"
          >
            <button
              disabled={
                iam === "" ||
                (iam === "company" && company_name === "") ||
                (iam === "company" && company_logo === "") ||
                (iam === "company" && !vendor_type)
              }
              type="button"
              onClick={() => dispatch({ type: "IncreaseFormStep" })}
              className={`next__step rounded-full flex justify-center items-center bg-secondary text-bg w-10 h-10 cursor-pointer text-xl   ease-in-out transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
                state.formStep === 1 ? "block sm:mb-2" : "hidden"
              }`}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
            <button
              disabled={
                password === "" ||
                confirmPassword !== password ||
                firstNameWatch === "" ||
                secondNameWatch === "" ||
                phone === "" ||
                email === ""
              }
              type="button"
              onClick={() => dispatch({ type: "IncreaseFormStep" })}
              className={`next__step rounded-full flex justify-center items-center bg-secondary text-bg w-10 h-10 cursor-pointer text-xl   ease-in-out transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
                state.formStep === 2 ? "block sm:mb-2" : "hidden"
              }`}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
            <button
              disabled={
                !validateAge(birthday) || gender === "" || country === ""
              }
              type="button"
              onClick={() => dispatch({ type: "IncreaseFormStep" })}
              className={`next__step rounded-full flex justify-center items-center bg-secondary text-bg w-10 h-10 cursor-pointer text-xl   ease-in-out transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
                state.formStep === 3 ? "block " : "hidden"
              }`}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
            <button
              disabled={state.formStep === 4}
              type="button"
              onClick={() => dispatch({ type: "IncreaseFormStep" })}
              className={`next__step rounded-full flex justify-center items-center bg-secondary text-bg w-10 h-10 cursor-pointer text-xl   ease-in-out transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
                state.formStep === 4 ? "block " : "hidden"
              }`}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
            <button
              disabled={state.formStep === 5}
              type="button"
              onClick={() => dispatch({ type: "IncreaseFormStep" })}
              className={`next__step rounded-full flex justify-center items-center bg-secondary text-bg w-10 h-10 cursor-pointer text-xl   ease-in-out transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
                state.formStep === 5 ? "block " : "hidden"
              }`}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
        </div>
        <section
          className={` w-full ${state.formStep === 6 ? "hidden" : "block"}`}
        >
          <div className="w-full flex justify-center items-center gap-1 text-sm pt-3">
            {t("form__bottom.providers.have_an_account")}
            <LangLink
              to="/login"
              className="font-bold text-base cursor-pointer"
            >
              {t("form__bottom.providers.login")}
            </LangLink>{" "}
            {/* <button
                className={`ml-5 ${state.formStep === 4 ? "block" : "hidden"}`}
                onClick={() => dispatch({ type: "setHaveCode", payload: true })}
                type="button"
              >
                {t("form__bottom.providers.Have_a_code")}
              </button> */}
          </div>
        </section>
      </div>
    </>
  );
}

export default Register;

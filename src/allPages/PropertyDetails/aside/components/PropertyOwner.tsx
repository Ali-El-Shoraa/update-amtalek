"use client";
import { usePostData } from "@/Hooks/usePostData";
import {
  setShowLoginOrSendDetailsPopUp,
  setShowLoginPopUp,
  userData,
} from "@/Store/Features/AuthenticationSlice";
import { Modal } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

export default function PropertyOwner({ data, locale }: any) {
  const { t } = useTranslation("Pages_PropertyDetails");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatchRedux = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const user = useSelector(userData);

  const {
    mutate: CallMutate,
    data: CallData,
    isSuccess: CallSuccess,
    error: CallError,
  }: any = usePostData(
    false, // showToasts
    () => {
      // onSuccess callback
    },
    true, // authorizedAPI (تأكد مما إذا كنت تحتاج لهذا أن يكون true أو false)
    (error: any) => {
      // onError callback
      console.error("An error occurred:", error);
    }
  );
  useEffect(() => {
    if (CallSuccess) {
      showModal();
    }
  }, [CallSuccess]);

  const {
    mutate: EmailMutate,
    data: EmailData,
    isSuccess: EmailSuccess,
    error: EmailError,
  }: any = usePostData(
    false, // showToasts
    () => {},
    true, // authorizedAPI (حدد هنا إذا كان الـ API يتطلب توثيقًا)
    (error: any) => {
      console.error("Error occurred while sending email:", error);
    }
  );
  useEffect(() => {
    if (EmailSuccess) {
      window.open(`mailto:${data?.broker_details?.[0]?.email}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [EmailSuccess]);

  // const userProfile = useSelector((state: any) => state.Authentication.userProfileDataOut);

  // userProfile.id === data?.broker_details?.[0].id &&
  //   userProfile.actor_type === data?.broker_details?.[0]?.broker_type
  // );

  // useEffect(() => {
  //   if (EmailSuccess) {
  //     window.open(`mailto:${EmailData?.broker_details?.[0]?.email}`);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [EmailSuccess]);

  const {
    mutate: WhatsappMutate,
    data: WhatsappData,
    isSuccess: WhatsappSuccess,
    error: WhatsappError,
  }: any = usePostData(
    false, // showToasts: تعطيل إشعارات الـ toasts.
    () => {},
    true, // authorizedAPI: true إذا كانت الـ API تتطلب توثيقًا (قم بتغييره إلى false إذا لم يكن التوثيق مطلوبًا).
    (error: any) => {}
  );

  useEffect(() => {
    if (WhatsappSuccess) {
      const phone = data.broker_details?.[0]?.phone;
      const message = t("message", { link: window.location.href });
      const encodedMessage = encodeURIComponent(message);

      window.open(
        `https://web.whatsapp.com/send?phone=+2${phone}&text=${encodedMessage}`,
        "_blank" // فتح الرابط في نافذة جديدة
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [WhatsappSuccess]);

  useEffect(() => {
    if (
      CallError?.response?.status === 401 ||
      EmailError?.response?.status === 401 ||
      WhatsappError?.response?.status === 401
    ) {
      dispatchRedux(setShowLoginPopUp(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    CallError?.response?.status,
    EmailError?.response?.status,
    WhatsappError?.response?.status,
  ]);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="PROPERTY__OWNER border border-custome-blue bg-custome-venice p-6 rounded flex flex-col items-center gap-9 w-full">
      <h2 className="Property__name text-xl font-semibold text-center">
        {t("aside.PROPERTY_OWNER", {
          defaultValue: t("aside.PROPERTY_OWNER", {
            lng: locale === "en" ? "en" : "",
          }),
        })}
      </h2>

      <div className="PROPERTY__OWNER--details flex justify-start items-start gap-5 bg- w-full">
        <Link
          href={`/agencies/${data?.broker_details?.[0]?.name?.replace(
            /\s/g,
            "-"
          )}/${data?.broker_details?.[0]?.id}/${
            data?.broker_details?.[0]?.broker_type
          }`}
          className="w-28 aspect-  h-auto max-w-[112px] round  object-"
        >
          <Image
            /*  className="w-20 h-auto max-w-[80px] round bord-1 p-1 object-cover" */
            className="w-28 aspect- h-auto max-w-[112px] round  object-cover"
            // loading="lazy"
            src={
              data?.broker_details?.[0]?.logo || data?.broker_details?.[0]?.src
            }
            alt={data?.broker_details?.[0]?.name}
            width={1000}
            height={1000}
          />
        </Link>

        <div className="PROPERTY__OWNER--name--description flex flex-col gap-2">
          <Link
            href={`/agencies/${data?.broker_details?.[0]?.name?.replace(
              /\s/g,
              "-"
            )}/${data?.broker_details?.[0]?.id}/${
              data?.broker_details?.[0]?.broker_type
            }`}
            // className="w-[98px] rtl:w-[160px] overflow-hidden bg- h-fit flex w-full"
            className="rtl:w-[160px] overflow-hidden bg- h-fit flex w-full"
          >
            <h3 className="text-lg font-medium relative w-full ownerName group">
              {data?.broker_details?.[0]?.name}
              <span className="absolute -bottom-0 rtl:right-0 ltr:left-0 w-1/4 bg-custome-blue h-1 rounded ease-in duration-300 group-hover:w-1/2"></span>
            </h3>
          </Link>

          {data?.broker_details?.[0]?.description && (
            <p className="text-sm opacity-70">
              {data?.broker_details?.[0]?.description}
            </p>
          )}
        </div>
      </div>

      {/* <div className="PROPERTY__OWNER--separator w-3/4 h-[1px] bg-secondary opacity-20"></div> */}

      {/* {data?.broker_details?.[0]?.has_package === "yes" && (
        <div className="w-full flex ss:justify-center items-center gap-3 xl:gap-2 mt-5">
          <div
            onClick={() => {
              if (
                userProfile.id !== data?.broker_details?.[0]?.id ||
                userProfile.actor_type !== data?.broker_details?.[0]?.broker_type
              ) {
                WhatsappMutate({
                  api: `contact-brokers-in-details`,
                  data: {
                    property_id: data?.id,
                    transaction_type: "meeting",
                    broker_id: data?.broker_details?.[0]?.id,
                    broker_type: data?.broker_details?.[0]?.broker_type,
                  },
                  file: undefined,
                });
              }
            }}
            className={`p-2 bg-[#25d366] rounded flex text-white items-center text-lg gap-2 xl:gap-1 xl:p-1 xl:text-base ss:p-2 hover:text-[#25d366] hover:bg-white border-[#25d366] border duration-300 transition cursor-pointer ${
              userProfile.id === data?.broker_details?.[0]?.id &&
              userProfile.actor_type === data?.broker_details?.[0]?.broker_type
                ? "pointer-events-none opacity-50"
                : ""
            }`}
          >
            <span>{t("whatsapp")}</span> <FaWhatsapp />
          </div>

          <div
            onClick={() => {
              if (
                userProfile.id !== data?.broker_details?.[0]?.id ||
                userProfile.actor_type !== data?.broker_details?.[0]?.broker_type
              ) {
                CallMutate({
                  api: `contact-brokers-in-details`,
                  data: {
                    property_id: data?.id,
                    transaction_type: "call",
                    broker_id: data?.broker_details?.[0]?.id,
                    broker_type: data?.broker_details?.[0]?.broker_type,
                  },
                  file: undefined,
                });
              }
            }}
            className={`p-2 xl:gap-1 xl:p-1 xl:text-base bg-[#ff6665] rounded flex items-center text-lg text-white gap-2 ss:p-2 hover:text-[#ff6665] hover:bg-white border-[#ff6665] border duration-300 transition cursor-pointer ${
              userProfile.id === data?.broker_details?.[0]?.id &&
              userProfile.actor_type === data?.broker_details?.[0]?.broker_type
                ? "pointer-events-none opacity-50"
                : ""
            }`}
          >
            <span>{t("call")}</span> <FaPhoneAlt />
          </div>

          <div
            onClick={() => {
              if (
                userProfile.id !== data?.broker_details?.[0]?.id ||
                userProfile.actor_type !== data?.broker_details?.[0]?.broker_type
              ) {
                EmailMutate({
                  api: `contact-brokers-in-details`,
                  data: {
                    property_id: data?.id,
                    transaction_type: "email",
                    broker_id: data?.broker_details?.[0]?.id,
                    broker_type: data?.broker_details?.[0]?.broker_type,
                  },
                  file: undefined,
                });
              }
            }}
            className={`p-2 bg-[#005879] rounded flex items-center gap-2 text-lg text-white xl:gap-1 xl:p-1 xl:text-base ss:p-2 hover:text-secondary hover:bg-white border-secondary border duration-300 transition cursor-pointer ${
              userProfile.id === data?.broker_details?.[0]?.id &&
              userProfile.actor_type === data?.broker_details?.[0]?.broker_type
                ? "pointer-events-none opacity-50"
                : ""
            }`}
          >
            <span>{t("email")}</span> <MdOutlineMailOutline />
          </div>
        </div>
      )} */}

      {data?.broker_details?.[0]?.has_package === "yes" &&
        user?.data?.actor_type !== "broker" && (
          <div className="w-full flex ss:justify-center items-center gap-3 xl:gap-2 mt-5">
            <div
              onClick={() => {
                if (
                  user?.data?.id !== data?.broker_details?.[0]?.id ||
                  user?.data?.actor_type !==
                    data?.broker_details?.[0]?.broker_type
                ) {
                  user?.token
                    ? WhatsappMutate({
                        api: `contact-brokers-in-details`,
                        data: {
                          property_id: data?.id,
                          transaction_type: "meeting",
                          broker_id: data?.broker_details?.[0]?.id,
                          broker_type: data?.broker_details?.[0]?.broker_type,
                        },
                        file: undefined,
                      })
                    : dispatchRedux(setShowLoginOrSendDetailsPopUp(true));
                  // : dispatchRedux(setShowLoginPopUp(true));
                }
              }}
              className={`p-2 bg-[#25d366] rounded flex text-white items-center text-lg gap-2 xl:gap-1 xl:p-1 xl:text-base ss:p-2 hover:text-[#25d366] hover:bg-white border-[#25d366] border duration-300 transition cursor-pointer ${
                user?.data?.id === data?.broker_details?.[0]?.id &&
                user?.data?.actor_type ===
                  data?.broker_details?.[0]?.broker_type
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
            >
              <span>{t("whatsapp")}</span> <FaWhatsapp />
            </div>

            <Modal
              classNames={{
                content: "w-[300px] mx-auto callModalBroker",
              }}
              title={
                <span className="mx-auto !w-full !text-center">
                  {t("callUs")}
                </span>
              }
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              centered
              footer={null}
            >
              <div className="w-full flex flex-col gap-3">
                <Image
                  width={1000}
                  height={1000}
                  src={data?.broker_details?.[0]?.logo}
                  alt="niuhfd"
                  className="w-16 h-16 rounded-full mx-auto"
                />
                <div className="w-full flex gap-2 items-center">
                  <span className="text-gray-500">{t("phoneNumber")}</span>
                  <Link
                    className="p-2 xl:gap-1 xl:p-1 xl:text-base  rounded flex items-center text-lg text-secondary gap-2 ss:p-2 "
                    href={
                      user?.token && `tel:${data?.broker_details?.[0]?.phone}`
                    }
                  >
                    {data?.broker_details?.[0]?.phone}
                  </Link>
                </div>
                <div className="w-full flex  items-center border-y py-2 gap-2">
                  <span className="text-gray-500">{t("brokerName")}</span>
                  <span>{data?.broker_details?.[0]?.name}</span>
                </div>
              </div>
            </Modal>
            <div
              onClick={() => {
                if (
                  user?.data?.id !== data?.broker_details?.[0]?.id ||
                  user?.data?.actor_type !==
                    data?.broker_details?.[0]?.broker_type
                ) {
                  user?.token
                    ? CallMutate({
                        api: `contact-brokers-in-details`,
                        data: {
                          property_id: data?.id,
                          transaction_type: "call",
                          broker_id: data?.broker_details?.[0]?.id,
                          broker_type: data?.broker_details?.[0]?.broker_type,
                        },
                        file: undefined,
                      })
                    : dispatchRedux(setShowLoginOrSendDetailsPopUp(true));
                  // : dispatchRedux(setShowLoginPopUp(true));
                }
              }}
              className={`p-2 xl:gap-1 xl:p-1 xl:text-base bg-[#ff6665] rounded flex items-center text-lg text-white gap-2 ss:p-2 hover:text-[#ff6665] hover:bg-white border-[#ff6665] border duration-300 transition cursor-pointer ${
                user?.data?.id === data?.broker_details?.[0]?.id &&
                user?.data?.actor_type ===
                  data?.broker_details?.[0]?.broker_type
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
            >
              <span>{t("call")}</span> <FaPhoneAlt />
            </div>
            <div
              onClick={() => {
                if (
                  user?.data?.id !== data?.broker_details?.[0]?.id ||
                  user?.data?.actor_type !==
                    data?.broker_details?.[0]?.broker_type
                ) {
                  user?.token
                    ? EmailMutate({
                        api: `contact-brokers-in-details`,
                        data: {
                          property_id: data?.id,
                          transaction_type: "email",
                          broker_id: data?.broker_details?.[0]?.id,
                          broker_type: data?.broker_details?.[0]?.broker_type,
                        },
                        file: undefined,
                      })
                    : dispatchRedux(setShowLoginOrSendDetailsPopUp(true));
                  // : dispatchRedux(setShowLoginPopUp(true));
                }
              }}
              className={`p-2 bg-[#005879] rounded flex items-center gap-2 text-lg text-white xl:gap-1 xl:p-1 xl:text-base ss:p-2 hover:text-secondary hover:bg-white border-secondary  border duration-300 transition cursor-pointer ${
                user?.data?.id === data?.broker_details?.[0]?.id &&
                user?.data?.actor_type ===
                  data?.broker_details?.[0]?.broker_type
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
              // href={
              //   user?.token && `mailto:${data?.broker_details?.[0]?.email}`
              // }
            >
              <span>{t("email")}</span> <MdOutlineMailOutline />
            </div>
          </div>
        )}
    </section>
  );
}

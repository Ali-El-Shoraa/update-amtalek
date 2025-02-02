"use client";
import { memo, useEffect, useState } from "react";
import {
  userData,
  setShowLoginOrSendDetailsPopUp,
} from "@/Store/Features/AuthenticationSlice";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { Modal } from "antd";
import { usePostData } from "@/Hooks/useAxios";
import Image from "next/image";
const BrokerInfo = memo(function BrokerInfo({ data, t }: any) {
  const user = useSelector(userData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const dispatchRedux = useDispatch();

  const {
    mutate: CallMutate,
    data: CallData,
    isSuccess: CallSuccess,
    error: CallError,
  }: any = usePostData(
    false, // showToasts
    () => {}, // onSuccess
    true, // authorizedAPI, تأكد من وضع القيمة المناسبة (true أو false) حسب ما إذا كان يجب أن يكون الاتصال مرخصًا
    (error) => console.error(error) // onError, يمكنك تقديم دالة أخرى للتعامل مع الأخطاء كما يناسبك
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
    () => {}, // onSuccess
    true, // authorizedAPI, تأكد من وضع القيمة المناسبة (true أو false) حسب ما إذا كان يجب أن يكون الاتصال مرخصًا
    (error) => console.error(error) // onError, يمكنك تقديم دالة أخرى للتعامل مع الأخطاء كما يناسبك
  );

  useEffect(() => {
    if (EmailSuccess) {
      window.open(`mailto:${data?.email}`);
    }
  }, [EmailSuccess]);

  const {
    mutate: WhatsappMutate,
    data: WhatsappData,
    isSuccess: WhatsappSuccess,
    error: WhatsappError,
  }: any = usePostData(
    false, // showToasts
    () => {}, // onSuccess
    true, // authorizedAPI, يمكن أن يكون true أو false حسب ما إذا كانت تحتاج API مرخص
    (error) => console.error(error) // onError
  );

  useEffect(() => {
    if (WhatsappSuccess) {
      window.open(
        `https://web.whatsapp.com/send?phone=+2${data?.phone}&text=${t(
          "message",
          {
            link: window.location.href,
          }
        )}`
      );
    }
  }, [WhatsappSuccess]);

  useEffect(() => {
    if (
      CallError?.response?.status === 401 ||
      EmailError?.response?.status === 401 ||
      WhatsappError?.response?.status === 401
    ) {
      // dispatchRedux(setShowLoginPopUp(true));
      dispatchRedux(setShowLoginOrSendDetailsPopUp(true));
    }
  }, [CallError?.response?.status, EmailError?.response?.status, WhatsappError?.response?.status]);

  const disCursor =
    user?.data?.id === data?.id && user?.data?.actor_type === data?.broker_type
      ? "pointer-events-none opacity-50"
      : "";

  return (
    <div className="broker__info flex justify-between items-start gap-10 bg-slate-100 py-10 px-2 ss:gap-8 md:flex-col md:items-center md:justify-start w-full rounded-xl">
      <div className="w-1/2 md:w-full h-auto  max-h-80 flex justify-center">
        <Image
          width={1000}
          height={1000}
          className="broker__img object-cover w-auto h-auto max-h-80 max-w-full rounded-xl"
          src={data?.logo}
          alt={data?.name}
        />
      </div>
      <div className="broker__contacts w-1/2 md:w-full ltr:pr-8 rtl:pl-8">
        <h2 className="text-2xl font-semibold asm:text-center relative w-fit ownerName md:text-lg">
          {data?.name}
          <span className="absolute -bottom-2 rtl:right-0  left-0 w-1/4 bg-secondary h-1 rounded"></span>
        </h2>
        {data?.description && (
          <p className="broker__contacts--description text-sm opacity-70 mt-5 text-justify">
            {data?.description}
          </p>
        )}

        {data?.has_package === "yes" && user?.data?.actor_type !== "broker" && (
          // {data?.broker_details[0]?.has_package === "yes" && user?.data?.actor_type !== "broker" && (
          // {user?.data?.company_id !== data?.id && user?.data?.has_package === "yes" && (
          <div className="w-full flex ss:justify-center items-center gap-3 xl:gap-2 mt-5">
            <div
              onClick={() => {
                if (
                  user?.data?.id !== data?.id ||
                  user?.data?.actor_type !== data?.broker_type
                ) {
                  user?.token
                    ? WhatsappMutate({
                        api: `contact-brokers-in-details`,
                        data: {
                          property_id: data?.id,
                          transaction_type: "meeting",
                          broker_id: data?.broker_details[0]?.id,
                          broker_type: data?.broker_details[0]?.broker_type,
                        },
                        file: undefined,
                      })
                    : //dispatchRedux(setShowLoginPopUp(true));
                      dispatchRedux(setShowLoginOrSendDetailsPopUp(true));
                }
                // !user?.token && dispatchRedux(setShowLoginPopUp(true));
                !user?.token &&
                  dispatchRedux(setShowLoginOrSendDetailsPopUp(true));
              }}
              className={`p-2 bg-[#25d366] rounded flex text-white items-center text-lg gap-2 xl:gap-1 xl:p-1 xl:text-base ss:p-2 hover:text-[#25d366] hover:bg-white border-[#25d366] border duration-300 transition cursor-pointer ${disCursor}`}
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
                  alt="dsagfdd"
                  src={data?.logo}
                  className="w-16 h-16 rounded-full mx-auto"
                />
                <div className="w-full flex gap-2 items-center">
                  <span className="text-gray-500">{t("phoneNumber")}</span>
                  <Link
                    className="p-2 xl:gap-1 xl:p-1 xl:text-base  rounded flex items-center text-lg text-secondary gap-2 ss:p-2 "
                    href={user?.token && `tel:${data?.phone}`}
                  >
                    {data?.phone}
                  </Link>
                </div>
                <div className="w-full flex  items-center border-y py-2 gap-2">
                  <span className="text-gray-500">{t("brokerName")}</span>
                  <span>{data?.name}</span>
                </div>
              </div>
            </Modal>
            <div
              onClick={() => {
                if (
                  // .broker_details[0]?
                  // ?.broker_details[0]
                  user?.data?.id !== data?.id ||
                  user?.data?.actor_type !== data?.broker_type
                ) {
                  user?.token
                    ? CallMutate({
                        api: `contact-brokers-in-details`,
                        data: {
                          property_id: data?.id,
                          transaction_type: "call",
                          broker_id: data?.id,
                          broker_type: data?.broker_type,
                        },
                        file: undefined,
                      })
                    : //dispatchRedux(setShowLoginPopUp(true));
                      dispatchRedux(setShowLoginOrSendDetailsPopUp(true));
                }
                // !user?.token && dispatchRedux(setShowLoginPopUp(true));
                !user?.token &&
                  dispatchRedux(setShowLoginOrSendDetailsPopUp(true));
              }}
              className={`p-2 xl:gap-1 xl:p-1 xl:text-base bg-[#ff6665] rounded flex items-center text-lg text-white gap-2 ss:p-2 hover:text-[#ff6665] hover:bg-white border-[#ff6665] border duration-300 transition cursor-pointer ${disCursor}`}
            >
              <span>{t("call")}</span> <FaPhoneAlt />
            </div>

            <div
              onClick={() => {
                if (
                  user?.data?.id !== data?.id ||
                  user?.data?.actor_type !== data?.broker_type
                ) {
                  user?.token
                    ? EmailMutate({
                        api: `contact-brokers-in-details`,
                        data: {
                          property_id: data?.id,
                          transaction_type: "email",
                          broker_id: data?.id,
                          broker_type: data?.broker_type,
                        },
                        file: undefined,
                      })
                    : //dispatchRedux(setShowLoginPopUp(true));
                      dispatchRedux(setShowLoginOrSendDetailsPopUp(true));
                }
                // !user?.token && dispatchRedux(setShowLoginPopUp(true));
                !user?.token &&
                  dispatchRedux(setShowLoginOrSendDetailsPopUp(true));
              }}
              className={`p-2 bg-secondary rounded flex items-center gap-2 text-lg text-white xl:gap-1 xl:p-1 xl:text-base ss:p-2 hover:text-secondary hover:bg-white border-secondary  border duration-300 transition cursor-pointer ${disCursor}`}
              // to={
              //   user?.token && `mailto:${data?.broker_details[0]?.email}`
              // }
            >
              <span>{t("email")}</span> <MdOutlineMailOutline />
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default BrokerInfo;

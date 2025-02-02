"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FaWhatsapp } from "react-icons/fa";

import { TwitterShareButton, WhatsappShareButton, FacebookShareButton } from "react-share";
import Link from "next/link";
import { useTranslation } from "react-i18next";

function Share({ type, style, data, file }: any) {
  const { t, i18n } = useTranslation(file);
  const [currentUrl, setCurrentUrl] = useState<string>("");

  // استخدام useEffect للحصول على URL الصفحة من window على جهة العميل
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  return (
    <div
      className={`under__slider--share text-custome-blue w-full flex h-12 asm:h-auto justify-center items-center asm:flex-col asm:gap-1 ${style}`}
    >
      <h5 className="property__size text-center w-1/4 bg-custome-blue text-custome-white h-full flex items-center justify-center text- font-medium asm:w-full asm:h-12 border-r-4 border-r-grey asm:border-r-custome-blue">
        {t("ShareComponent.txt", { context: type })}
      </h5>{" "}
      <div className="w-3/4 asm:w-full flex justify-between items-center bg-custome-gray h-12">
        <FacebookShareButton
          url={currentUrl} // يجب أن تحتوي الصفحة على وسوم Open Graph
          hashtag={t("whatsappMsg")} // الوسم الذي تريد إضافته (اختياري)
          className="bedrooms__number flex justify-center items-center text-base asm:text-sm w-1/3 "
        >
          <FontAwesomeIcon className="pr-3 rtl:pr-0 rtl:pl-3 text-2xl" icon={faFacebook} />
          {t("ShareComponent.Facebook")}
        </FacebookShareButton>

        <div className="w-1 h-full bg-custome-white"></div>
        <TwitterShareButton
          title={t("whatsappMsg")}
          // url={data?.twitter}
          url={currentUrl} // استخدام currentUrl بدلاً من window.location.href
          className="bathrooms__number flex justify-center items-center text-base asm:text-sm w-1/3 "
        >
          <FontAwesomeIcon className="text-lg" icon={faXTwitter} />
          {data?.twitter && t("ShareComponent.Twitter")}
        </TwitterShareButton>
        <div className="w-1 h-full bg-custome-white"></div>
        <WhatsappShareButton
          className="bathrooms__number flex justify-center items-center text-base asm:text-sm w-1/3 "
          url={currentUrl} // استخدام currentUrl بدلاً من window.location.href
          title={t("whatsappMsg")}
          separator="  "
        >
          <FaWhatsapp className="pr-3 rtl:pr-0 rtl:pl-3 " size={30} />
          {t("ShareComponent.whatsapp")}
        </WhatsappShareButton>
      </div>
    </div>
  );
}

export default Share;

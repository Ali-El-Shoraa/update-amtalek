"use client";
import { WhatsappShareButton, TwitterShareButton } from "react-share";
import { FaFacebook, FaXTwitter, FaShareNodes } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io5";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { memo } from "react";

function ShareOptions({ card }: any) {
  const { i18n } = useTranslation();

  return (
    <div className="group w-fit h-auto">
      <FaShareNodes size={24} />
      <div className="absolute right-0 rtl:right-auto rtl:left-0 -translate-y-0 pt-[15px] w-36 bg-transparent z-[41] opacity-0 pointer-events-none trns group-hover:opacity-100 group-hover:pointer-events-auto">
        <div className="flex flex-col items-start border border-custome-venice overflow-hidden round shadow-lg">
          <Link
            rel="noreferrer"
            target="_blank"
            className="h-10 w-full bg-custome-venice hover:text-custome-white hover:bg-custome-blue trns flex justify-start pl-5 rtl:pl-0 rtl:pr-5 items-center cursor-pointer gap-3"
            href={card?.facebook}
          >
            <FaFacebook />

            {i18n.language.startsWith("ar") ? "فيسبوك" : "Facebook"}
          </Link>
          {/* <div className="w-full h-[0.05rem] bg-custome-venice"></div>
          <div className="w-full h-[0.05rem] bg-custome-gray"></div> */}
          <div className="w-full h-[0.09rem] bg-dark-gray"></div>
          <WhatsappShareButton
            url={`https://amtalek.com${
              i18n.language.startsWith("ar") ? "" : "/en"
            }/properties/${card?.listing_number}/${card?.title
              ?.replace(/\s/g, "-")
              ?.replace(/%/g, "-")}`}
            className="h-10 w-full !bg-custome-venice hover:!text-custome-white hover:!bg-custome-blue trns flex justify-start !pl-5 rtl:pl-0 rtl:!pr-5 items-center cursor-pointer gap-3"
          >
            <IoLogoWhatsapp size={20} />
            <span>
              {i18n.language.startsWith("ar") ? "واتساب" : "Whatsapp"}
            </span>
          </WhatsappShareButton>
          {/* <div className="w-full h-[0.05rem] bg-custome-gray"></div> */}
          <div className="w-full h-[0.09rem] bg-dark-gray"></div>

          <TwitterShareButton
            url={card?.twitter}
            className="h-10 w-full !bg-custome-venice hover:!text-custome-white hover:!bg-custome-blue trns flex justify-start !pl-5 rtl:pl-0 rtl:!pr-5 items-center cursor-pointer gap-3"
          >
            <FaXTwitter />
            {i18n.language.startsWith("ar") ? "تويتر" : "Twitter"}
          </TwitterShareButton>
        </div>
      </div>
    </div>
  );
}

export default memo(ShareOptions);

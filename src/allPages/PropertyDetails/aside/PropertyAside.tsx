"use client";
import AsideForm from "./components/AsideForm";
import PropertyOwner from "./components/PropertyOwner";
// import AdsProperty from "@/components/ADS/AdsProperty";
import LatestProperties from "./components/LatestProperties";
import FeaturedPropertiesAside from "./components/FeaturedPropertiesAside";
// import Loader from "@/components/loader/Loader";
import { useEffect, useState } from "react";
// import SearchFormForm from "@/allPages/SaerchFour/SaerchFormFour";
import { userData } from "@/Store/Features/AuthenticationSlice";
import { useSelector } from "react-redux";
import LoginOrSendDetailsPopUp from "@/allPages/login/LoginOrSendDetailsPopUp";
import Loader from "@/components/Loader";
import SearchFormForm from "@/components/SaerchFour/SaerchFormFour";
import AdsProperty from "@/components/ADS/AdsProperty";

export default function PropertyAside({
  listing_number,
  locale,
  allData,
}: any) {
  const user = useSelector(userData);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // إضافة مستمع لتغيير حجم النافذة
    window.addEventListener("resize", handleResize);

    // تنظيف المستمع عند إلغاء التثبيت
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="Property__Details--aside w-[31%] clg:w-3/4 md:w-full h-fit flex flex-col clg:items-center gap-10">
      {/* <LoginPopUp /> */}
      {!allData ? (
        <Loader />
      ) : (
        <>
          <LoginOrSendDetailsPopUp
            params={{
              vendor_id: allData?.[0]?.broker_details?.[0]?.id,
              broker_type: allData?.[0]?.broker_details[0]?.broker_type,
            }}
            // ${process.env.NEXT_PUBLIC_BASE_URL_FULL}
            api={`${process.env.NEXT_PUBLIC_SEND_MESSAGE_TO_BROKER}`}
            type="message"
            for_what={allData?.[0]?.for_what}
            Bgcolor="dark"
            // t={t}
            propID={allData?.[0]?.id}
          />
          <div>
            {windowWidth > 1016 && (
              <PropertyOwner data={allData?.[0]} locale={locale} />
            )}
          </div>
          <AdsProperty />

          {user?.token && user?.data?.actor_type !== "broker" && (
            <AsideForm
              params={{
                vendor_id: allData?.[0]?.broker_details?.[0]?.id,
                broker_type: allData?.[0]?.broker_details[0]?.broker_type,
              }}
              // ${process.env.NEXT_PUBLIC_BASE_URL_FULL}
              api={`${process.env.NEXT_PUBLIC_SEND_MESSAGE_TO_BROKER}`}
              type="message"
              for_what={allData?.[0]?.for_what}
              Bgcolor="dark"
              // t={t}
              propID={allData?.[0]?.id}
            />
          )}
          {user?.data?.actor_type !== "broker" && (
            <AsideForm
              params={{
                vendor_id: allData?.[0]?.broker_details?.[0]?.id,
                property_id: allData?.[0]?.id,
              }}
              api={process.env.NEXT_PUBLIC_SEND_OFFER_TO_BROKER}
              type="offer"
              for_what={allData?.[0]?.for_what}
              Bgcolor="dark"

              // t={t}
              // refetch={refetch}
            />
          )}
          <div className="w-full clg:hidden">
            <SearchFormForm type={"asideForm"} showOptions locale={locale} />
          </div>
          <div className="w-full hidden clg:block">
            <SearchFormForm
              type={"bigForm"}
              showOptions
              home={true}
              locale={locale}
            />
          </div>
          <LatestProperties />
          <FeaturedPropertiesAside />
        </>
      )}
    </section>
  );
}

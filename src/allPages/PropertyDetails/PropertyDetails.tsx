"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropertyHeader from "./components/PropertyHeader";
import PropertySlider from "./components/PropertySlider";
import initTranslations from "@/app/i18n";
import UnderSlider from "./components/UnderSlider";
// import Share from "@/components/Share";
import PropertyViews from "./components/PropertyViews";
import PropertyDescription from "./components/PropertyDescription";
import PropertyDetailsPoint from "./components/PropertyDetailsPoint";
import PropertyAminities from "./components/PropertyAminities";
import PropertyVideo from "./components/PropertyVideo";
import PropertyLocation from "./components/PropertyLocation";
import SimilarProperty from "./components/SimilarProperty";
import SendMessage from "./components/SendMessage";
import LoginPopUp from "@/allPages/login/LoginPopUp";
import Heading from "@/components/Heading";
// import Comments from "@/MainComponents/Comments";
import { userData } from "@/Store/Features/AuthenticationSlice";
import PropertyOwner from "./aside/components/PropertyOwner";
import Loader from "@/components/Loader";
import getData from "@/lib/api/getData";
import Comments from "@/components/MainComponents/Comments";
import Share from "@/components/Share";

export default function PropertyDetails({
  locale,
  listing_number,
  allViews,
}: any) {
  const [allData, setAllData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const user: any = useSelector(userData);
  const [t, setT] = useState(() => (key: string) => key); // دالة t فارغة في البداية
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getData(
          `web/property/${listing_number}`,
          locale,
          user?.token
        );
        setAllData(data?.data);

        if (data?.status === 1) {
          await getData(
            `web/increase-view-property/${data?.data?.[0]?.id}`,
            "en"
          );
        }

        const i18nNamespaces = [
          "Pages_PropertyDetails",
          "Pages_PropertyDetails",
        ];
        const translations = await initTranslations(locale, i18nNamespaces);
        setT(() => translations.t); // تعيين دالة t بعد تحميل الترجمات
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale, listing_number, user]);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <section className="Property__Details--content w-[66%] flex flex-col gap-8 ss:gap-5 clg:w-full">
        {!allData || allData.length === 0 ? (
          <Loader />
        ) : (
          <div className="Property__general--info w-full flex flex-col gap-8">
            <LoginPopUp />
            <PropertyHeader
              data={allData?.[0]}
              listing_number={listing_number}
            />
            <PropertySlider data={allData?.[0]} style={"mt-10"} />
            <UnderSlider data={allData?.[0]} locale={locale} t={t} />
            <Share
              data={allData?.[0]}
              type="property"
              style={"mt-8"}
              file={"Pages_PropertyDetails"}
            />
            <PropertyViews data={allData?.[0]} locale={locale} t={t} />
            <PropertyDescription data={allData?.[0]} locale={locale} t={t} />
            <PropertyDetailsPoint data={allData?.[0]} locale={locale} t={t} />
            <PropertyAminities data={allData?.[0]} locale={locale} t={t} />
            <PropertyLocation data={allData?.[0]} locale={locale} t={t} />

            <div>
              {windowWidth <= 1016 && (
                <PropertyOwner data={allData?.[0]} locale={locale} />
              )}
            </div>

            <PropertyVideo data={allData?.[0]} locale={locale} />
            <SimilarProperty data={allData?.[0]} locale={locale} />

            {allData?.[0]?.comments?.length > 0 && (
              <div className="Property__COMMENTS -mt-14 mb-14">
                <Heading>{t("headings.COMMENTS")}</Heading>
                {allData?.[0]?.comments?.length === 0 ? (
                  ""
                ) : (
                  <Comments data={allData?.[0]?.comments} locale={locale} />
                )}
              </div>
            )}

            {(!user?.token || user?.data?.actor_type === "user") && (
              <SendMessage data={allData?.[0]} locale={locale} t={t} />
            )}
          </div>
        )}
      </section>
    </>
  );
}

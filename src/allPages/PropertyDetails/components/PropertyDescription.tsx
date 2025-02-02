"use client"
import HeaderSection from "@/components/headerSection/HeaderSection";
import Heading from "@/components/Heading";

export default function PropertyDescription({ data, locale, t }: any) {
  return (
    <div className="Property__description">
      <Heading className={""}>
        {" "}
        {t("headings.description", {
          defaultValue: t("headings.description", {
            lng: locale === "ar" ? "ar" : "en",
          }),
        })}
      </Heading>
      <div dangerouslySetInnerHTML={{ __html: data?.description }} className="break-words"></div>
    </div>
  );
}

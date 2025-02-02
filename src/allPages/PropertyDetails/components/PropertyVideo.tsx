"use client";
import Heading from "@/components/Heading";
import { useTranslation } from "react-i18next";
import ReactPlayer from "react-player/youtube";

export default function PropertyVideo({ data, locale }: any) {
  const { t } = useTranslation("Pages_PropertyDetails");
  return (
    <>
      {data?.video && (
        <div className="Property__VIDEO">
          <Heading>
          {t("headings.VIDEO", {
            defaultValue: t("headings.VIDEO", {
              lng: locale === "en" ? "en" : "",
            }),
          })}
          </Heading>

          <ReactPlayer url={data?.video} width={`100%`} />
        </div>
      )}
    </>
  );
}

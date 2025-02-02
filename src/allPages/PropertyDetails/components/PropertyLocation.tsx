import Heading from "@/components/Heading";

export default function PropertyLocation({ data, locale, t }: any) {
  return (
    <>
      {data?.location && (
        <div className="Property__location ">
          <Heading>
          {t("headings.LOCATION", {
            defaultValue: t("headings.LOCATION", {
              lng: locale === "en" ? "en" : "",
            }),
          })}
          </Heading>
          <div
            className="iframe__fixed--height w-full border-2 border-custome-blue round  mt-7 "
            dangerouslySetInnerHTML={{
              __html: data?.location,
            }}
          ></div>
        </div>
      )}
    </>
  );
}

import Heading from "@/components/Heading";
import SendMessageForm from "./SendMessageForm";
import React from "react";

export default function SendMessage({ data, locale, t }: any) {
  return (
    <>
      {data?.broker_details[0]?.broker_type !== "user" && (
        // mt-14
        <div className="Property__LEAVE--COMMENT ">
          <Heading>
            {" "}
            {t("headings.LEAVE_COMMENT_word", {
              defaultValue: t("headings.LEAVE_COMMENT_word", {
                lng: locale === "en" ? "en" : "",
              }),
            })}
          </Heading>

          <SendMessageForm
            params={{
              property_id: data?.id,
            }}
            api={`${process.env.NEXT_PUBLIC_BASE_URL_FULL}${process.env.NEXT_PUBLIC_SINGLE_PROPERTY_LEAVE_COMMENT}`}
            type="PropertyDetails__Comment"
            // t={t}
            showRating
          />
        </div>
      )}
      {/* <Heading>
        {" "}
        {t("headings.LEAVE_COMMENT_word", {
          defaultValue: t("headings.LEAVE_COMMENT_word", {
            lng: locale === "en" ? "en" : "",
          }),
        })}
      </Heading>

      <SendMessageForm
        params={{
          property_id: data?.id,
        }}
        api={`${process.env.NEXT_PUBLIC_BASE_URL_FULL}${process.env.NEXT_PUBLIC_SINGLE_PROPERTY_LEAVE_COMMENT}`}
        type="PropertyDetails__Comment"
        // t={t}
        showRating
      /> */}
    </>
  );
}

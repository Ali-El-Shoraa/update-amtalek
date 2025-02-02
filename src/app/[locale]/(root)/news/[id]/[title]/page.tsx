import NewsDetails from "@/allPages/News/NewsDetails";
import initTranslations from "@/app/i18n";
import getData from "@/lib/api/getData";
import Head from "next/head";
import React from "react";

export async function generateMetadata({ params }: any) {
  const { locale, id } = await params;
  const i18nNamespaces = ["Pages_NewsDetails"];

  const { t } = await initTranslations(locale, i18nNamespaces);
  const respons = await getData(
    `web/${process.env.NEXT_PUBLIC_SINGLE_NEW_DETAILS}${id}`,
    locale
  );

  return {
    title: t("tab.title", { details: respons?.data?.[0]?.title }),
    description: respons?.data?.[0]?.latest_news?.[0]?.description,
    openGraph: {
      title: respons?.data?.[0]?.title,
      description: respons?.data?.[0]?.latest_news?.[0]?.description,
      images: [
        {
          url: respons?.data?.[0]?.image,
          alt: respons?.data?.[0]?.title,
          width: 800,
          height: 600,
        },
      ],
    },
    icons: {
      icon: "/fav-icon.png",
    },
  };
}

export default async function page({ params: { locale, id, title } }: any) {
  const respons = await getData(
    `web/${process.env.NEXT_PUBLIC_SINGLE_NEW_DETAILS}/${id}`,
    locale
  );
  const data = await respons?.data?.[0];

  return (
    <>
      {/* <html> */}
      <Head>
        <meta charSet="UTF-8" />

        <meta name="google-play-app" content="app-id=eramo.amtalek" />

        <meta property="og:title" content={data?.title?.toUpperCase()} />
        <meta property="og:description" content={data?.description} />
        <meta itemProp="image" content={data?.primary_image} />

        <meta property="og:image" content={data?.primary_image} />
        {/* <meta property="og:url" content={data?.url} /> */}
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta name="description" content={data?.description} />
        <meta name="keywords" content={data?.description} />
      </Head>

      {/* <body> */}
      <NewsDetails data={data} tit={title} />
      {/* </body>
      </html> */}
    </>
  );
}

import PropertyAside from "@/allPages/PropertyDetails/aside/PropertyAside";
import PropertyDetails from "@/allPages/PropertyDetails/PropertyDetails";
import initTranslations from "@/app/i18n";
import getData from "@/lib/api/getData";
import Head from "next/head";

export async function generateMetadata({ params }: any) {
  const { locale, listing_number } = await params;
  const i18nNamespaces = ["Pages_PropertyDetails"];

  const { t, i18n } = await initTranslations(locale, i18nNamespaces);
  const data = await getData(`web/property/${listing_number}`, locale);

  return {
    title:
      (i18n.language.startsWith("ar") ? "أمتلك.كوم |" : "Amtalek |") +
      " " +
      data?.data?.[0]?.title,
    description: data?.data?.[0]?.description, //t("tab.description"),
    openGraph: {
      title: data?.data?.[0]?.title?.toUpperCase(),
      description: data?.data?.[0]?.description,
      keywords: ["Next.js", "React", "JavaScript"],
      images: [
        {
          // url: "https://amtalek.com/assets/images/meta-image-amtalek.jpg",
          url: data?.data?.[0]?.primary_image,
          alt: data?.data?.[0]?.title?.toUpperCase(),
          width: 800,
          height: 600,
        },
      ],
    },

    meta: [
      {
        name: "keywords",
        content: data?.data?.[0]?.title + ", " + data?.data?.[0]?.description,
      },

      {
        name: "url",
        content: data?.data?.[0]?.title + ", " + data?.data?.[0]?.description,
      },
    ],
  };
}

export default async function PropertyDetailsPage({ params }: any) {
  const { locale, listing_number } = await params;

  const data = await getData(`web/property/${listing_number}`, locale);
  const allData = data?.data;

  // const allViews = views?.message;
  return (
    <>
      <Head>
        {/* <head> */}
        <meta charSet="UTF-8" />

        {/* <meta name="google-play-app" content="app-id=eramo.amtalek" /> */}

        <meta
          property="og:title"
          content={data?.data?.[0]?.title?.toUpperCase()}
        />
        <meta
          property="og:description"
          content={data?.data?.[0]?.description}
        />
        <meta itemProp="image" content={data?.data?.[0]?.primary_image} />

        <meta property="og:image" content={data?.data?.[0]?.primary_image} />
        <meta name="description" content={data?.data?.[0]?.description} />
        <meta
          name="keywords"
          content={`${data?.data?.[0]?.description}, Next.js, React, JavaScript`}
        />
        {/* </head> */}
      </Head>
      <main className="min-h-[calc(100vh-136px)]">
        <div className="site_container   flex justify-between items-start pt-20 asm:pt-8 gap-0 clg:gap-20 pb-32 clg:pb-44 clg:flex-col clg:items-center clg:justify-start">
          {/* <div className="site_container text-custome-blue flex justify-between items-start pt-20 gap-0 clg:gap-20 pb-32 clg:pb-44 clg:flex-col clg:items-center clg:justify-start"> */}
          <PropertyDetails locale={locale} listing_number={listing_number} />

          <PropertyAside
            locale={locale}
            listing_number={listing_number}
            allData={allData}
            data={data}
          />
        </div>
      </main>
    </>
  );
}

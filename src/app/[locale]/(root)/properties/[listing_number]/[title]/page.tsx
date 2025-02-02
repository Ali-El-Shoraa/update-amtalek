import PropertyAside from "@/allPages/PropertyDetails/aside/PropertyAside";
import PropertyDetails from "@/allPages/PropertyDetails/PropertyDetails";
import getData from "@/lib/api/getData";
import Head from "next/head";

export default async function PropertyDetailsPage({
  params: { locale, listing_number },
}: any) {
  const i18nNamespaces = [
    "Pages_PropertyDetails",
    "Pages_LandingPage",
    "LayoutComponents",
    "Pages_PropertyDetails",
    "MainComponents_SearchForm",
    "Pages_AllProperties",
  ];

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

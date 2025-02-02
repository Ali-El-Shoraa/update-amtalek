"use server";
import { cookies } from "next/headers";
import getData from "./getData";

export async function footerData() {
  const locale = (await cookies()).get("NEXT_LOCALE")?.value || "en";

  const footerData = await getData("web/footer", locale);

  return footerData || [];
}

export async function getHomePageApiStatic() {
  const locale = (await cookies()).get("NEXT_LOCALE")?.value || "en";

  const [
    sliders,
    featured,
    latestProps,
    marketSection,
    homeNews,
    citiesMost,
    mostView,
    descripeUs,
    dataImage,
    ads,
    broker,
    countries,
    developers,
  ] = await Promise.all([
    getData("web/v2/web-home-sliders", locale),
    getData("web/v2/web-home-featured-props", locale),
    getData("web/v2/web-home-latest-props-in-country", locale),
    getData("web/v2/web-home-market-section", locale),
    getData("web/v2/web-home-news", locale),
    getData("web/v2/web-home-cities-most-pops", locale),
    getData("web/v2/web-home-most-view-deals-main", locale),
    getData("web/v2/web-home-descripe-us-data", locale),
    getData("web/info-graph", locale),
    getData("ads-getter/home-page", locale),
    getData("web/our-brokers", locale),
    getData("web/countries", locale),
    getData(`web/projects`, locale),
  ]);

  return {
    allSliders: sliders?.data || [],
    allFeatured: featured?.data || [],
    allLatestProps: latestProps?.data || [],
    allMarketSection: marketSection?.data || [],
    allHomeNews: homeNews?.data || [],
    allCitiesMost: citiesMost?.data || [],
    allMostView: mostView?.data || [],
    allDescripeUs: descripeUs?.data || [],
    allDataImage: dataImage?.data || [],
    allAds: ads?.data || [],
    allBroker: broker?.data || [],
    AllCountries:
      Array.isArray(countries?.data) && countries.data.length > 0
        ? countries.data?.[0]
        : null,
    allPRoject: developers,
  };
}

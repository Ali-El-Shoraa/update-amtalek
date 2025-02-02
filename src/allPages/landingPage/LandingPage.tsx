import Hero from "./hero/Hero";
import ImagesSection from "./imagesSection/ImagesSection";
import FeaturedProperties from "./featuredProperties/FeaturedProperties";
// import ADSHome from "@/components/ADS/ADSHome";
import MarketSection from "./marketSection/components/MarketSection";
import LatestNews from "./lastNews/components/LatestNews";
import LatestProperties from "./latestProperties/components/LatestProperties";
import LatestProjects from "./latestProjects/LatestProjects";
import { getHomePageApiStatic } from "@/lib/api/api.home.page";

export default async function LandingPage({ locale }: any) {
  const {
    allSliders,
    allMarketSection,
    allLatestProps,
    allFeatured,
    // allBroker,
    allDataImage,
    allAds,
    AllCountries,
    // allCitiesMost,
    allHomeNews,
    // allDescripeUs,
    // allMostView,
    allPRoject,
  } = await getHomePageApiStatic();
  return (
    <>
      {/* <Suspense fallback={<Loading />}> */}
      <Hero data={allSliders || []} />
      <ImagesSection data={allDataImage || []} locale={locale} />
      {/* <ADSHome data={allAds || []} /> */}
      <FeaturedProperties data={allFeatured || []} countrie={AllCountries} />

      <LatestProjects allPRoject={allPRoject} />

      <LatestProperties data={allLatestProps || []} countrie={AllCountries} />
      <MarketSection data={allMarketSection?.[0] || null} locale={locale} />

      <LatestNews data={allHomeNews || []} locale={locale} />

      {/* </Suspense> */}
    </>
  );
}

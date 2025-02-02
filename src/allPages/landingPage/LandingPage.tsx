import Hero from "./hero/Hero";
import ImagesSection from "./imagesSection/ImagesSection";
import FeaturedProperties from "./featuredProperties/FeaturedProperties";
// import ADSHome from "@/components/ADS/ADSHome";
import MarketSection from "./marketSection/components/MarketSection";
import LatestNews from "./lastNews/components/LatestNews";
import LatestProperties from "./latestProperties/components/LatestProperties";
import LatestProjects from "./latestProjects/LatestProjects";
import { getHomePageApiStatic } from "@/lib/api/api.home.page";
import Loader from "@/components/Loader";
import { memo } from "react";

export default memo(async function LandingPage({ locale }: any) {
  try {
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
    return !allSliders ? (
      <Loader />
    ) : (
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
  } catch (e: any) {
    throw new Error("somthing is wrong please try again", e.error);
  }
});

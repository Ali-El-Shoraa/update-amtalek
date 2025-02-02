"use server";
import { cookies } from "next/headers";
// import getData from "./getData";

export async function footerData() {
  const locale = (await cookies()).get("NEXT_LOCALE")?.value || "en";

  const footerData = await getData("web/footer", locale);

  return footerData || [];
}

import { getAuthToken } from "@/lib/actions/auth-actions";

// import Cookies from "js-cookie";
export default async function getData(
  point: string,
  locale: string,
  token?: string,
  retries: number = 3 // تحديد عدد المحاولات القصوى
): Promise<any> {
  // إنشاء headers بشكل ديناميكي
  const headers: HeadersInit = {
    lang: locale || "ar",
  };

  // التحقق مما إذا كان token موجودًا
  const tokenVerification = await getAuthToken();
  if (tokenVerification) {
    headers["Authorization"] = `Bearer ${tokenVerification}`;
  }

  // دالة لجلب البيانات مع إضافة منطق المحاولة
  const fetchData = async (attempt: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_GET_DATA}${point}`,
        {
          headers: headers,
          method: "GET",
          next: {
            revalidate: 0,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);

      if (attempt < retries) {
        return fetchData(attempt + 1); // إعادة المحاولة
      }

      // إذا تجاوز الحد الأقصى للمحاولات
      return {
        props: {
          data: null,
          error: "Failed to fetch data after multiple attempts.",
        },
      };
    }
  };

  // استدعاء الدالة للمحاولة الأولى
  return fetchData(1);
}

export async function getHomePageApiStatic() {
  const locale = (await cookies()).get("NEXT_LOCALE")?.value || "en";

  // if (locale) return;
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

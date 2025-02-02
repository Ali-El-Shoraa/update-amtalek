import { MetadataRoute } from "next";

async function responseDataPost(endpoint: any, lang: any, page: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL_GET_DATA}web/search-property?page=${page}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        lang: lang,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  return response.json();
}

async function responseDataGet(endpoint: any, lang: any, page: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL_GET_DATA}${endpoint}?page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        lang: lang,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  return response.json();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // **************************************************************************************
    // project sitemap
    // تحويل البيانات إلى JSON
    const jsonDataArProject = await responseDataGet("web/projects", "ar", "");
    const jsonDataEnProject = await responseDataGet("web/projects", "en", 1);

    // الوصول إلى البيانات المطلوبة
    const dataArProject = jsonDataArProject?.data?.original?.data;
    const dataEnProject = jsonDataEnProject?.data?.original?.data;

    const urlArProject = dataArProject?.map((item: any) => {
      return {
        url: `https://amtalek.com/projects/${item?.listing_number}/${item?.title
          ?.replace(/\//g, "-")
          ?.replace(/\s/g, "-")}`, // تعديل حسب الحقل المناسب
        lastModified: new Date(item?.created_at).toISOString(), // تعديل حسب الحقل المناسب
        changeFrequency: "daily" as const, // يمكن تغييرها حسب الحاجة
      };
    });

    const urlEnProject = dataEnProject?.map((item: any) => {
      return {
        url: `https://amtalek.com/en/projects/${
          item?.listing_number
        }/${item?.title?.replace(/\//g, "-")?.replace(/\s/g, "-")}`, // تعديل حسب الحقل المناسب
        lastModified: new Date(item?.created_at).toISOString(), // تعديل حسب الحقل المناسب
        changeFrequency: "daily" as const, // يمكن تغييرها حسب الحاجة
      };
    });

    // **************************************************************************************
    // properties sitemap
    const jsonDataArProp = await responseDataPost(
      "web/search-property",
      "ar",
      1
    );
    const jsonDataEnProp = await responseDataPost(
      "web/search-property",
      "en",
      1
    );

    // الوصول إلى البيانات المطلوبة
    const dataArProp = jsonDataArProp?.data?.original?.[0]?.data;
    const dataEnProp = jsonDataEnProp?.data?.original?.[0]?.data;

    const Pages = jsonDataEnProp?.data?.original?.[0]?.meta?.last_page;

    // جلب البيانات لجميع الصفحات
    const allDataPagesAr = await Promise.all(
      Array.from({ length: Pages }, async (_, index) => {
        const data = await responseDataPost(
          "web/search-property",
          "ar",
          index + 1
        );
        return data?.data?.original?.[0]?.data;
      })
    );

    const allDataPagesEn = await Promise.all(
      Array.from({ length: Pages }, async (_, index) => {
        const data = await responseDataPost(
          "web/search-property",
          "en",
          index + 1
        );
        return data?.data?.original?.[0]?.data;
      })
    );

    // تحويل البيانات إلى تنسيق Sitemap
    const urlArProp = dataArProp?.map((item: any) => {
      return {
        url: `https://amtalek.com/properties/${
          item?.listing_number
        }/${item?.title
          ?.replace(/\//g, "-")
          ?.replace(/\s/g, "-")
          ?.replace(/%/g, "-")}`, // تعديل حسب الحقل المناسب
        lastModified: new Date(item?.created_at)?.toISOString(), // تعديل حسب الحقل المناسب
        changeFrequency: "daily" as const, // يمكن تغييرها حسب الحاجة
      };
    });

    const urlEnProp = dataEnProp?.map((item: any) => {
      return {
        url: `https://amtalek.com/en/properties/${
          item?.listing_number
        }/${item?.title
          ?.replace(/\//g, "-")
          ?.replace(/\s/g, "-")
          ?.replace(/%/g, "-")}`, // تعديل حسب الحقل المناسب
        lastModified: new Date(item?.created_at)?.toISOString(), // تعديل حسب الحقل المناسب
        changeFrequency: "daily" as const, // يمكن تغييرها حسب الحاجة
      };
    });

    const urlArAllPagesProp = allDataPagesAr.flat().map((item: any) => {
      return {
        url: `https://amtalek.com/properties/${
          item?.listing_number
        }/${item?.title
          ?.replace(/\//g, "-")
          ?.replace(/\s/g, "-")
          ?.replace(/%/g, "-")}`, // تعديل حسب الحقل المناسب
        lastModified: new Date(item?.created_at)?.toISOString(), // تعديل حسب الحقل المناسب
        changeFrequency: "daily" as const, // يمكن تغييرها حسب الحاجة
      };
    });

    const urlEnAllPagesProp = allDataPagesEn.flat().map((item: any) => {
      return {
        url: `https://amtalek.com/en/properties/${
          item?.listing_number
        }/${item?.title
          ?.replace(/\//g, "-")
          ?.replace(/\s/g, "-")
          ?.replace(/%/g, "-")}`, // تعديل حسب الحقل المناسب
        lastModified: new Date(item?.created_at)?.toISOString(), // تعديل حسب الحقل المناسب
        changeFrequency: "daily" as const, // يمكن تغييرها حسب الحاجة
      };
    });
    // **************************************************************************************
    // news sitemaps
    // جلب البيانات من API
    const jsonDataArNews = await responseDataGet("web/news", "ar", 1);
    const jsonDataEnNewa = await responseDataGet("web/news", "en", 1);

    // الوصول إلى البيانات المطلوبة
    const dataArNews = jsonDataArNews?.data?.original?.data;
    const dataEnNews = jsonDataEnNewa?.data?.original?.data;

    const PagesNews = jsonDataEnNewa?.data?.original?.meta?.last_page;
    // جلب البيانات لجميع الصفحات
    const allDataPagesArNews = await Promise.all(
      Array.from({ length: PagesNews }, async (_, index) => {
        const data = await responseDataGet("web/news", "ar", index + 1);
        return data?.data?.original?.data;
      })
    );

    const allDataPagesEnNews = await Promise.all(
      Array.from({ length: PagesNews }, async (_, index) => {
        const data = await responseDataGet("web/news", "en", index + 1);
        return data?.data?.original?.data;
      })
    );

    // تحويل البيانات إلى تنسيق Sitemap
    const urlArNews = dataArNews?.map((item: any) => {
      const parseCustomDate = (dateString: string): Date => {
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const [day, monthName, year] = dateString.split(/[\s,]+/);
        const month = months.indexOf(monthName);
        return new Date(Number(year), month, Number(day));
      };
      return {
        url: `https://amtalek.com/news/${item?.id}/${item?.title
          ?.replace(/\//g, "-")
          ?.replace(/\s/g, "-")}`, // تعديل حسب الحقل المناسب
        lastModified: parseCustomDate(item?.created_at)?.toISOString(), // تعديل حسب الحقل المناسب
        changeFrequency: "daily" as const, // يمكن تغييرها حسب الحاجة
      };
    });

    const urlEnNews = dataEnNews?.map((item: any) => {
      const parseCustomDate = (dateString: string): Date => {
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const [day, monthName, year] = dateString.split(/[\s,]+/);
        const month = months.indexOf(monthName);
        return new Date(Number(year), month, Number(day));
      };
      return {
        url: `https://amtalek.com/en/news/${item?.id}/${item?.title
          ?.replace(/\//g, "-")
          ?.replace(/\s/g, "-")}`, // تعديل حسب الحقل المناسب
        lastModified: parseCustomDate(item?.created_at)?.toISOString(), // تعديل حسب الحقل المناسب
        changeFrequency: "daily" as const, // يمكن تغييرها حسب الحاجة
      };
    });

    const urlArAllPagesNews = allDataPagesArNews.flat().map((item: any) => {
      const parseCustomDate = (dateString: string): Date => {
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const [day, monthName, year] = dateString.split(/[\s,]+/);
        const month = months.indexOf(monthName);
        return new Date(Number(year), month, Number(day));
      };
      return {
        url: `https://amtalek.com/news/${item?.id}/${item?.title
          ?.replace(/\//g, "-")
          ?.replace(/\s/g, "-")}`, // تعديل حسب الحقل المناسب
        lastModified: parseCustomDate(item?.created_at)?.toISOString(), // تعديل حسب الحقل المناسب
        changeFrequency: "daily" as const, // يمكن تغييرها حسب الحاجة
      };
    });

    const urlEnAllPagesNews = allDataPagesEnNews.flat().map((item: any) => {
      const parseCustomDate = (dateString: string): Date => {
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const [day, monthName, year] = dateString.split(/[\s,]+/);
        const month = months.indexOf(monthName);
        return new Date(Number(year), month, Number(day));
      };
      return {
        url: `https://amtalek.com/en/news/${item?.id}/${item?.title
          ?.replace(/\//g, "-")
          ?.replace(/\s/g, "-")}`, // تعديل حسب الحقل المناسب
        lastModified: parseCustomDate(item?.created_at)?.toISOString(), // تعديل حسب الحقل المناسب
        changeFrequency: "daily" as const, // يمكن تغييرها حسب الحاجة
      };
    });

    // **************************************************************************************
    // careers sitemap

    const jsonDataArCareers = await responseDataGet("job-search", "ar", 1);
    const jsonDataEnCareers = await responseDataGet("job-search", "en", 1);

    // الوصول إلى البيانات المطلوبة
    const dataArCareers = jsonDataArCareers?.data?.data;
    const dataEnCareers = jsonDataEnCareers?.data?.data;

    const PagesCareers = jsonDataEnCareers?.data?.meta?.last_page;

    // جلب البيانات لجميع الصفحات
    const allDataPagesArCareers = await Promise.all(
      Array.from({ length: PagesCareers }, async (_, index) => {
        const data = await responseDataGet("job-search", "ar", index + 1);
        return data?.data?.data;
      })
    );

    const allDataPagesEnCareers = await Promise.all(
      Array.from({ length: PagesCareers }, async (_, index) => {
        const data = await responseDataGet("job-search", "en", index + 1);
        return data?.data?.data;
      })
    );

    // تحويل البيانات إلى تنسيق Sitemap
    const urlArCareers = dataArCareers?.map((item: any) => {
      return {
        url: `https://amtalek.com/careers/company/${item?.broker_details?.company_name?.replace(
          /\s/g,
          "-"
        )}/${item?.id}/${item?.title
          ?.replace(/\//g, "-")
          ?.replace(/\s/g, "-")}`, // تعديل حسب الحقل المناسب
        lastModified: item?.created_at, //new Date(item?.id)?.toISOString(), // تعديل حسب الحقل المناسب
        changeFrequency: "daily" as const, // يمكن تغييرها حسب الحاجة
      };
    });

    const urlEnCareers = dataEnCareers?.map((item: any) => {
      return {
        url: `https://amtalek.com/en/careers/company/${item?.broker_details?.company_name?.replace(
          /\s/g,
          "-"
        )}/${item?.id}/${item?.title
          ?.replace(/\//g, "-")
          ?.replace(/\s/g, "-")}`, // تعديل حسب الحقل المناسب
        lastModified: item?.created_at, //new Date(item?.id)?.toISOString(), // تعديل حسب الحقل المناسب
        changeFrequency: "daily" as const, // يمكن تغييرها حسب الحاجة
      };
    });

    const urlArAllPagesCareers = allDataPagesArCareers
      .flat()
      .map((item: any) => {
        return {
          url: `https://amtalek.com/careers/company/${item?.broker_details?.company_name?.replace(
            /\s/g,
            "-"
          )}/${item?.id}/${item?.title
            ?.replace(/\//g, "-")
            ?.replace(/\s/g, "-")}`, // تعديل حسب الحقل المناسب
          lastModified: item?.created_at, //new Date(item?.id)?.toISOString(), // تعديل حسب الحقل المناسب
          changeFrequency: "daily" as const, // يمكن تغييرها حسب الحاجة
        };
      });

    const urlEnAllPagesCareers = allDataPagesEnCareers
      .flat()
      .map((item: any) => {
        return {
          url: `https://amtalek.com/en/careers/company/${item?.broker_details?.company_name?.replace(
            /\s/g,
            "-"
          )}/${item?.id}/${item?.title
            ?.replace(/\//g, "-")
            ?.replace(/\s/g, "-")}`, // تعديل حسب الحقل المناسب
          lastModified: item?.created_at, //new Date(item?.id)?.toISOString(), // تعديل حسب الحقل المناسب
          changeFrequency: "daily" as const, // يمكن تغييرها حسب الحاجة
        };
      });

    // **************************************************************************************
    // search properties page in all regions in Egypt
    const jsonDataArCities = await responseDataGet("web/all-cities", "ar", 1);
    const jsonDataEnCities = await responseDataGet("web/all-cities", "en", 1);

    const dataArCities = jsonDataArCities?.data;
    const dataEnCities = jsonDataEnCities?.data;

    const urlArDataArCitiesPropertiesForSale = dataArCities?.map(
      (item: any) => {
        return {
          url: `https://amtalek.com/search/properties/عقارات-للبيع-في-مصر/عقارات-للبيع-في-${item?.title
            ?.replaceAll(/\//g, "-")
            ?.replaceAll(/\s/g, "-")}`, // تعديل حسب الحقل المناسب
          lastModified: new Date()?.toISOString(), //new Date(item?.id)?.toISOString(), // تعديل حسب الحقل المناسب
          changeFrequency: "daily" as const, // يمكن تغييرها حسب الحاجة
        };
      }
    );

    const urlEnDataEnCitiesPropertiesForSale = dataEnCities?.map(
      (item: any) => {
        return {
          url: `https://amtalek.com/en/search/properties/Properties-for_sale-in-Egypt/Properties-for_sale-in-${item?.title
            ?.replaceAll(/\//g, "-")
            ?.replaceAll(/\s/g, "-")}`, // تعديل حسب الحقل المناسب
          lastModified: new Date()?.toISOString(), //new Date(item?.id)?.toISOString(), // تعديل حسب الحقل المناسب
          changeFrequency: "daily" as const, // يمكن تغييرها حسب الحاجة
        };
      }
    );

    const urlArDataArCitiesPropertiesForRent = dataArCities?.map(
      (item: any) => {
        return {
          url: `https://amtalek.com/search/properties/عقارات-للايجار-في-مصر/عقارات-للايجار-في-${item?.title
            ?.replaceAll(/\//g, "-")
            ?.replaceAll(/\s/g, "-")}`, // تعديل حسب الحقل المناسب
          lastModified: new Date()?.toISOString(), //new Date(item?.id)?.toISOString(), // تعديل حسب الحقل المناسب
          changeFrequency: "daily" as const, // يمكن تغييرها حسب الحاجة
        };
      }
    );

    const urlEnDataEnCitiesPropertiesForRent = dataEnCities?.map(
      (item: any) => {
        return {
          url: `https://amtalek.com/en/search/properties/Properties-for_rent-in-Egypt/Properties-for_rent-in-${item?.title
            ?.replaceAll(/\//g, "-")
            ?.replaceAll(/\s/g, "-")}`, // تعديل حسب الحقل المناسب
          lastModified: new Date()?.toISOString(), //new Date(item?.id)?.toISOString(), // تعديل حسب الحقل المناسب
          changeFrequency: "daily" as const, // يمكن تغييرها حسب الحاجة
        };
      }
    );

    // **************************************************************************************
    const staticData = [
      {
        url: "https://amtalek.com/en/search/projects/Projects-in-Egypt",
        lastModified: new Date()?.toISOString(),
        changeFrequency: "daily" as const,
      },
      {
        url: "https://amtalek.com/search/projects/مشاريع-في-مصر",
        lastModified: new Date()?.toISOString(),
        changeFrequency: "daily" as const,
      },
      {
        url: "https://amtalek.com/en/search/properties/Properties-for_rent-in-Egypt",
        lastModified: new Date()?.toISOString(),
        changeFrequency: "daily" as const,
      },
      {
        url: "https://amtalek.com/search/properties/عقارات-للايجار-في-مصر",
        lastModified: new Date()?.toISOString(),
        changeFrequency: "daily" as const,
      },
      {
        url: "https://amtalek.com/en/search/properties/Properties-for_sale-in-Egypt",
        lastModified: new Date()?.toISOString(),
        changeFrequency: "daily" as const,
      },
      {
        url: "https://amtalek.com/search/properties/عقارات-للبيع-في-مصر",
        lastModified: new Date()?.toISOString(),
        changeFrequency: "daily" as const,
      },
      {
        url: "https://amtalek.com/en/news",
        lastModified: new Date()?.toISOString(),
        changeFrequency: "daily" as const,
      },
      {
        url: "https://amtalek.com/news",
        lastModified: new Date()?.toISOString(),
        changeFrequency: "daily" as const,
      },
      {
        url: "https://amtalek.com/careers",
        lastModified: new Date()?.toISOString(),
        changeFrequency: "daily" as const,
      },
      {
        url: "https://amtalek.com/en/careers",
        lastModified: new Date()?.toISOString(),
        changeFrequency: "daily" as const,
      },
    ];

    // **************************************************************************************

    // final data to show in sitemap.xml
    const allData = [
      ...staticData,
      ...urlArProject,
      ...urlEnProject,
      ...urlArProp,
      ...urlEnProp,
      ...urlArNews,
      ...urlEnNews,
      ...urlArAllPagesProp,
      ...urlEnAllPagesProp,
      ...urlEnAllPagesNews,
      ...urlArAllPagesNews,
      ...urlEnCareers,
      ...urlArCareers,
      ...urlArAllPagesCareers,
      ...urlEnAllPagesCareers,
      ...urlArDataArCitiesPropertiesForRent,
      ...urlArDataArCitiesPropertiesForSale,
      ...urlEnDataEnCitiesPropertiesForSale,
      ...urlEnDataEnCitiesPropertiesForRent,
    ];

    if (!Array.isArray(allData)) {
      throw new Error("Expected data to be an array");
    }
    // التحقق من صحة البيانات وتحويلها إلى الصيغة المطلوبة
    const urls = allData
      ?.map((item: any) => {
        try {
          // التحقق من وجود الحقول الأساسية
          if (!item.url) {
            throw new Error("Missing required field: url");
          }

          // التحقق من صحة التاريخ (إذا كان موجودًا)
          const lastModified = item.lastModified
            ? new Date(item.lastModified)
            : undefined;
          if (lastModified && isNaN(lastModified.getTime())) {
            throw new Error("Invalid date format");
          }

          // التحقق من القيم الخاصة (مثل علامات XML التي قد تكون غير صالحة)
          if (/[<>&]/.test(item.url)) {
            throw new Error("Invalid characters in url");
          }

          // إرجاع العنصر إذا كان صحيحًا
          return {
            url: item.url,
            lastModified: lastModified?.toISOString(), // اختياري
            changeFrequency: item.changeFrequency || "daily", // اختياري
          };
        } catch (error: any) {
          // تجاهل العنصر إذا كان يحتوي على خطأ
          console.warn("Skipping invalid object:", {
            item,
            error: error.message,
          });
          return null;
        }
      })
      .filter((item) => item !== null); // إزالة الكائنات غير الصالحة

    return urls;
  } catch (error) {
    console.error("Error processing sitemap:", error);
    return [];
  }
}

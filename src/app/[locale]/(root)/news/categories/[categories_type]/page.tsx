import { CategoryDetails } from "@/allPages/News/CategoryDetails";
import initTranslations from "@/app/i18n";
import getData from "@/lib/api/getData";
import { convert } from "html-to-text";

export async function generateMetadata({ params }: any) {
  const { locale, categories_type } = await params;
  const i18nNamespaces = ["Pages_CategoryDetails"];
  const { t } = await initTranslations(locale, i18nNamespaces);
  // const decodedName = decodeURIComponent(categories_type);
  const result = await getData(
    `web/news-categories/${categories_type.replace("-", " ")}`,
    locale
  );

  const descriptionText = convert(result?.data?.[0]?.description || "", {
    wordwrap: false, // لا تقم بلف النص
  });

  return {
    title: t("tab.title", { details: result?.data?.[0]?.title }),
    description: descriptionText, // النص العادي
    openGraph: {
      title: t("tab.title", { details: result?.data?.[0]?.title }),
      description: descriptionText, // نص عادي فقط
    },
    icons: {
      icon: "/fav-icon.png",
    },
  };
}

export default async function page({
  params: { locale, categories_type },
}: any) {
  const result = await getData(
    `web/news-categories/${categories_type.replace("-", " ")}`,
    locale
  );

  return <CategoryDetails dataNews={result?.data?.[0]} />;
}

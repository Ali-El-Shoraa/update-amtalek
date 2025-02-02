import News from "@/allPages/News/News";
import initTranslations from "@/app/i18n";
export async function generateMetadata({ params }: any) {
  const { locale } = await params;
  const i18nNamespaces = ["Pages_News"];

  const { t } = await initTranslations(locale, i18nNamespaces);

  return {
    title: t("tab.title"),
    description: t("tab.description"),
    openGraph: {
      title: t("tab.title"),
      description: t("tab.description"), // نص عادي فقط
    },
    icons: {
      icon: "/fav-icon.png",
    },
  };
}

export default function NewsPage() {
  return <News />;
}

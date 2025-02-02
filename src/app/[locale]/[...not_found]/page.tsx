import initTranslations from "@/app/i18n";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: any) {
  const { locale } = await params;
  const i18nNamespaces = ["Pages_NotFound"];

  const { t } = await initTranslations(locale, i18nNamespaces);

  return {
    title: t("tab.title"),
    description: t("tab.description"),
    icons: {
      icon: "/fav-icon.png",
    },
  };
}

export default async function NotFoundCatchAll() {
  // const i18nNamespaces = ["Pages_NotFound"];

  notFound();
}

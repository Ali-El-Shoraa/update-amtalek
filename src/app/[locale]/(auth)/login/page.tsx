// "use client";
import Login from "@/allPages/login/Login";
import initTranslations from "@/app/i18n";

export async function generateMetadata({ params }: any) {
  const i18nNamespaces = ["Pages_Login"];

  const { locale } = await params;

  const { t } = await initTranslations(locale, i18nNamespaces);

  return {
    title: t("tab.title"),
    description: t("tab.description"),
    icons: {
      icon: "/fav-icon.png",
    },
  };
}

export default async function LoginPage({ params }: any) {
  const { locale } = await params;
  return (
    <div>
      <Login locale={locale} />
    </div>
  );
}

import initTranslations from "@/app/i18n";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";
import TopHeader from "@/components/shared/topHeader/TopHeader";

export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const i18nNamespaces = [
    "LayoutComponents",
    "Pages_LandingPage",
    "MainComponents_SearchForm",
    "Pages_Finish",
    "SettingsLayout",
    "FriendsProfileLayout",
    "Pages_About",
    "Pages_AllProperties",
    "Pages_BrokerDetails",
    "Pages_Brokers",
    "Pages_CategoryDetails",
    "Pages_Cities",
    "Pages_Coming",
    "Pages_PropertyDetails",
    "Pages_NotFound",
    "Pages_Projects",
  ];

  const { t } = await initTranslations(locale, i18nNamespaces);

  return (
    <div>
      <TopHeader t={t} locale={locale} />
      <Header t={t} locale={locale} />
      {children}
      <Footer t={t} locale={locale} />
    </div>
  );
}

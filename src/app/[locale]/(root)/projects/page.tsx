import LatestDeveloper from "@/allPages/project/ProjectDetails/LatestDeveloper";
import MostViewsProject from "@/allPages/project/ProjectDetails/MostViewsProject";
import ProjectsDevelopers from "@/allPages/project/ProjectsDevelopers";
import initTranslations from "@/app/i18n";
import getData from "@/lib/api/getData";

export async function generateMetadata({ params }: any) {
  const locale = await params;
  const i18nNamespaces = ["Pages_Projects"];

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

export default async function ProjectsPage({ params }: any) {
  const { locale } = await params;
  const countries = await getData("web/countries", locale);
  const AllCountries = countries?.data?.[0] || [];

  const data = await getData("web/project-most-views", locale);
  const allData = data?.data?.original?.data || [];

  const filterData = await getData("web/project-filter-createria", locale);
  const allFilterData = filterData?.data;

  return (
    <main className="min-h-[calc(100vh-136px)]">
      <section className="site_container pt-10  pb-12">
        <ProjectsDevelopers locale={locale} data={allFilterData} />
        <MostViewsProject
          data={allData || []}
          locale={locale}
          countrie={AllCountries}
        />
        <LatestDeveloper
          data={allFilterData?.developers}
          locale={locale}
          countrie={AllCountries}
        />
      </section>
    </main>
  );
}

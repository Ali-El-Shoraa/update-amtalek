import ProjectDetails from "@/allPages/project/ProjectDetails/ProjectDetails";
import initTranslations from "@/app/i18n";
import getData from "@/lib/api/getData";

export async function generateMetadata({ params }: any) {
  const { locale, listing_number } = await params;
  const i18nNamespaces = ["Pages_ProjectDetails"];

  const { t } = await initTranslations(locale, i18nNamespaces);
  const data = await getData(
    `web/v2/project-details/${listing_number}`,
    locale
  );
  const dataProject = data?.data?.original?.data?.[0];

  return {
    title: t("tab.title", { details: dataProject?.title }),
    description: t("tab.description"),
    openGraph: {
      title: dataProject?.agent_data?.[0]?.name,
      description: data?.description,
      images: [
        {
          url: dataProject?.agent_data?.[0]?.logo,
          alt: dataProject?.agent_data?.[0]?.name,
          width: 800,
          height: 600,
        },
      ],
    },
    icons: {
      icon: "/fav-icon.png",
    },
  };
}

export default async function ProjectsDetailsPage({ params }: any) {
  const { locale, listing_number } = await params;
  const data = await getData(
    `web/v2/project-details/${listing_number}`,
    locale
  );
  const allData = data?.data?.original?.data?.[0];

  return (
    <>
      <main className="min-h-[calc(100vh-136px)]">
        {/* <FormProjectOrientation /> */}
        <div className="site_container text-custome-blue flex justify-between items-start gap-0 clg:gap-20 pb-8 clg:pb-44 clg:flex-col clg:items-center clg:justify-start">
          {/* <LoginPopUp /> */}
          <ProjectDetails
            listing_number={listing_number}
            locale={locale}
            data={allData}
          />
        </div>

        {/* ****************************************************************************************************************** */}
      </main>
    </>
  );
}

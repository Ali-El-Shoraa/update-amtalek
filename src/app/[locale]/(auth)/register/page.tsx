import LogInRegister from "@/allPages/Authentication/LogInRegister";
import initTranslations from "@/app/i18n";

export async function generateMetadata({ params }: any) {
  const { locale } = await params;
  const i18nNamespaces = ["Pages_Register"];

  const { t } = await initTranslations(locale, i18nNamespaces);

  return {
    title: t("tab.title"),
    description: t("tab.description"),
    icons: {
      icon: "/fav-icon.png",
    },
  };
}

export default function RegisterPage() {
  return (
    <div>
      <LogInRegister />
    </div>
  );
}

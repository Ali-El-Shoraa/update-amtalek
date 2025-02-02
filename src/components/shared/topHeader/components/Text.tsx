// "use client";

// import { useTranslation } from "@/app/i18n/client";
// import { useLocale } from "@/context/LocaleContext";

export default async function Text({ t }: any) {
  // const lng = useLocale();

  // const { t } = useTranslation("ar", "LayoutComponents");

  return <h3 className="font-medium clg:hidden clg:text-[14px]">{t("Layout_header.txt")}</h3>;
}

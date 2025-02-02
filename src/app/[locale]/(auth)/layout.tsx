import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";

export default async function LoginLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}): Promise<JSX.Element> {
  // انتظر للحصول على قيمة params
  const { locale } = await params;

  return (
    <>
      <section className="min-h-[calc(100vh-136px)]">{children}</section>;
    </>
  );
}

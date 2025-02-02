import LandingPage from "@/allPages/landingPage/LandingPage";
import { Suspense } from "react";
// import Loading from "./loading";
import initTranslations from "../../i18n";
import Head from "next/head";
import Loading from "../Loading";

export async function generateMetadata({ params }: any) {
  // انتظر params ثم قم بتفكيك locale منها
  const { locale } = await params;

  const i18nNamespaces = ["Pages_LandingPage"];

  const { t, i18n } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t("tab.title"),
    description: t("tab.description"),
    openGraph: {
      title: t("tab.title"),

      description: i18n.language.startsWith("ar")
        ? "أمتلك تقدم لك CRM كامل لإدارة فريقك ومهام شركتك, إبحث عن عقارك خلال تنوع كبير من العقارات سواء للبيع، للإيجار في القاهرة، الجيزة وجميع أنحاء مصر "
        : "Amtalek offers complete CRM to manage your team and company tasks. Also you can search for your property through a wide variety of properties for sale or rent in Cairo, Giza and all over Egypt.",
      images: [
        {
          url: "https://dmlygcfpc782j.cloudfront.net/assets/images/meta-image-amtalek.jpg",
          alt: "AMTALEK Meta Image",
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

export default async function HomePage({ params }: any) {
  // انتظر params ثم قم بتفكيك locale منها
  const { locale } = await params;
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />

        <meta
          property="og:description"
          content="أمتلك تقدم لك CRM كامل لإدارة فريقك ومهام شركتك, إبحث عن عقارك خلال تنوع كبير من العقارات سواء للبيع، للإيجار في القاهرة، الجيزة وجميع أنحاء مصر"
        />
        <meta
          property="og:title"
          content="عقارات في مصر - عقارات لإيجار وبيع في مصر"
        />

        <meta
          property="og:logo"
          content="https://amtalek.com/_next/static/media/navEnLogo.dd28eeb4.png"
        />
        <meta itemProp="url" content="https://www.amtalek.com" />
        <meta property="og:url" content="https://www.amtalek.com" />
        <meta
          itemProp="image"
          content="https://dmlygcfpc782j.cloudfront.net/assets/images/meta-image-amtalek.jpg"
        />

        <meta
          property="og:image"
          content="https://dmlygcfpc782j.cloudfront.net/assets/images/meta-image-amtalek.jpg"
        />
        <meta
          name="description"
          content="أمتلك تقدم لك CRM كامل لإدارة فريقك ومهام شركتك, إبحث عن عقارك خلال تنوع كبير من العقارات سواء للبيع، للإيجار في القاهرة، الجيزة وجميع أنحاء مصر "
        />
        <meta
          name="keywords"
          content="أمتلك تقدم لك CRM كامل لإدارة فريقك ومهام شركتك, إبحث عن عقارك خلال تنوع كبير من العقارات سواء للبيع، للإيجار في القاهرة، الجيزة وجميع أنحاء مصر"
        />
      </Head>

      <main>
        <Suspense fallback={<Loading />}>
          <LandingPage locale={locale} />
        </Suspense>
      </main>
    </>
  );
}

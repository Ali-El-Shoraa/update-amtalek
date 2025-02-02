import { dir } from "i18next";

import { Cairo, Roboto } from "next/font/google";
import initTranslations from "../i18n";
import { Suspense } from "react";
import TranslationsProvider from "@/components/TranslationsProvider";
const cairo = Cairo({ subsets: ["arabic"], weight: ["400", "700"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });
// **************************************************************************
import "../SASS/styles.scss";
import "../SASS/index.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GoogleTagManager } from "@next/third-parties/google";
import Footer from "@/components/shared/footer/Footer";
import ClientWrapper from "@/components/shared/ClientWrapper";
import TooltipProviderComponents from "@/components/TooltipProviderComponents";
import QueryProvider from "@/components/QueryProvider";
import ToasterProvider from "@/components/ToasterProvider";
import ScrollToTop from "@/components/ScrollToTop";
import LoadingBarComponents from "@/components/LoadingBarComponents";
import LoginPopUp from "@/components/LoginPopUp";
import LogOutPopUp from "@/components/LogOutPopUp";
import UserProfileComponent from "@/components/UserProfileComponent";
import Loading from "./Loading";
import { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "/fav-icon.png",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  const fontClass = locale === "ar" ? cairo?.className : roboto?.className;
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
    "Pages_Login",
    "Pages_Register",
  ];

  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
        <meta charSet="UTF-8" />

        <meta
          name="facebook-domain-verification"
          content="mweksz5mf6ici4tmt838s3ytl4tt7r"
        />
        <meta name="google-adsense-account" content="ca-pub-6367957675332720" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <!-- logo page --> */}
        <link
          rel="icon"
          type="image/svg+xml"
          href="/assets/images/fav-icon.png"
        />
        {/* <!-- font google --> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600&family=Roboto:wght@400;500&display=swap"
          rel="preconnect"
          crossOrigin="anonymous"
        />
        <meta
          property="og:logo"
          content="https://amtalek.com/_next/static/media/navEnLogo.dd28eeb4.png"
        />

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6367957675332720"
          crossOrigin="anonymous"
          defer
        ></script>

        <meta name="google-play-app" content="app-id=eramo.amtalek" />

        <meta property="og:type" content="Website" />
        <meta property="og:site_name" content="Amtalek" />
        <meta property="og:url" content="https://www.amtalek.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@amtalekcom" />
        <meta
          name="twitter:title"
          content="Amtalek offers complete CRM to manage your team and company tasks. Also you can search for your property through a wide variety of properties for sale or rent in Cairo, Giza and all over Egypt."
        />
        <meta itemProp="url" content="https://www.amtalek.com" />
        <link href="https://www.amtalek.com" rel="canonical" />
        <link href="https://www.amtalek.com" rel="alternate" hrefLang="ar" />
        <link href="https://www.amtalek.com/en" rel="alternate" hrefLang="en" />

        <meta property="fb:app_id" content="859549992423067" />

        <meta name="author" content="e-RAMO For Digital Solutions" />

        <meta
          name="publish_date"
          property="og:publish_date"
          content="2024-07-01T12:00:00-0600"
        />

        <meta name="publisher" content="https://www.amtalek.com" />

        <meta name="distribution" content="global" />

        <link rel="alternate" hrefLang="ar" href="https://www.amtalek.com" />
      </head>
      <body className={fontClass}>
        <GoogleAnalytics gaId="G-KCWDP1MG7B" />
        <GoogleTagManager gtmId="GTM-KWTCFKJG" />

        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={locale}
          resources={resources}
        >
          <ClientWrapper>
            <LoadingBarComponents />
            <TooltipProviderComponents>
              <QueryProvider>
                <ToasterProvider />
                <Suspense fallback={<Loading />}>
                  <UserProfileComponent>
                    <LoginPopUp />
                    <LogOutPopUp />

                    <main>{children}</main>

                    <ScrollToTop />
                  </UserProfileComponent>
                </Suspense>
              </QueryProvider>
            </TooltipProviderComponents>
          </ClientWrapper>
        </TranslationsProvider>
      </body>
    </html>
  );
}

"use client";

import { I18nextProvider } from "react-i18next";
import initTranslations from "@/app/i18n";
import { createInstance } from "i18next";
import Loader from "./Loader";

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}) {
  const i18n = createInstance();

  initTranslations(locale, namespaces, i18n, resources);

  const isClientDocument = typeof document !== "undefined";
  const isClientWindow = typeof window !== "undefined";

  if (!isClientDocument && !isClientWindow) {
    <html lang="en">
      <body>
        <div>
          <Loader />
        </div>
      </body>
    </html>; // Render nothing on the server if necessary
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

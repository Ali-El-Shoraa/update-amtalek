"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18nConfig from "../../i18nConfig";
import { TbWorld } from "react-icons/tb";

export default function LanguageChanger() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = () => {
    // تحديد اللغة الجديدة
    const newLocale = currentLocale === "ar" ? "en" : "ar";

    // تعيين الـ Cookie لتغيير اللغة في next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // تغيير المسار حسب اللغة الجديدة
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    // تحديث الصفحة بعد التغيير
    router.refresh();
  };

  return (
    <button
      onClick={handleChange}
      className="flex items-center justify-center gap-2"
    >
      <TbWorld />
      {currentLocale === "ar" ? "English" : "العربية"}
    </button>
  );
}
// *************************************************************************************************************

// "use client";

// import { useState } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { useTranslation } from "react-i18next";
// import i18nConfig from "../../i18nConfig";
// import { TbWorld } from "react-icons/tb";
// import { useDispatch } from "react-redux";
// import { startLoading, stopLoading } from "@/Store/loaderSlice";

// export default function LanguageChanger() {
//   const { i18n } = useTranslation();
//   const [loading, setLoading] = useState(false); // حالة التحميل
//   const currentLocale = i18n.language;
//   const router = useRouter();
//   const currentPathname = usePathname();
//   const dispatch = useDispatch();

//   const handleChange = async () => {
//     dispatch(startLoading()); // تفعيل الـ Loader
//     setLoading(true); // تشغيل التحميل عند الضغط

//     try {
//       // تحديد اللغة الجديدة
//       const newLocale = currentLocale === "ar" ? "en" : "ar";

//       // تعيين الـ Cookie لتغيير اللغة في next-i18n-router
//       const days = 30;
//       const date = new Date();
//       date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//       const expires = date.toUTCString();
//       document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

//       // تغيير المسار حسب اللغة الجديدة
//       if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
//         router.push("/" + newLocale + currentPathname);
//       } else {
//         router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
//       }

//       // تحديث الصفحة بعد التغيير
//       router.refresh();
//     } catch (error) {
//       console.error("Error changing language:", error);
//     } finally {
//       dispatch(stopLoading()); // إيقاف الـ Loader بعد تغيير اللغة
//       setLoading(false); // إيقاف التحميل بعد الانتهاء
//     }
//   };

//   return (
//     <div className="flex flex-col items-center gap-4">
//       <button
//         onClick={handleChange}
//         className="flex items-center justify-center gap-2"
//         disabled={loading} // تعطيل الزر أثناء التحميل
//       >
//         <TbWorld />
//         {loading ? "Loading..." : currentLocale === "ar" ? "English" : "العربية"}
//       </button>

//       {/* {loading && (
//         <button className="px-4 py-2 text-sm bg-gray-300 rounded cursor-not-allowed" disabled>
//           Switching Language...
//         </button>
//       )} */}
//     </div>
//   );
// }
// *************************************************************************************************************
// "use client";

// import { useDispatch } from "react-redux";
// import { startLoading, stopLoading } from "@/Store/loaderSlice";
// import { useTranslation } from "react-i18next";
// import { dir } from "i18next";

// export default function LanguageChanger() {
//   const { i18n } = useTranslation();
//   const dispatch = useDispatch();

//   const handleLanguageChange = () => {
//     dispatch(startLoading()); // تفعيل الـ Loader
//     const newLocale = i18n.language === "ar" ? "en" : "ar";
//     const days = 30;
//     const date = new Date();
//     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//     const expires = date.toUTCString();
//     document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;
//     // document.html.dirname = i18n.language === "ar" ? "rtl" : "ltr";
//     document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
//     document.documentElement.lang = i18n.language; //newLocale === "ar" ? "ar" : "en";

//     if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
//       router.push("/" + newLocale + currentPathname);
//     } else {
//       router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
//     }

//     i18n.changeLanguage(newLocale).finally(() => {
//       dispatch(stopLoading()); // إيقاف الـ Loader بعد تغيير اللغة
//     });
//   };

//   return (
//     <button
//       onClick={handleLanguageChange}
//       className="fixed top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//     >
//       {i18n.language === "ar" ? "English" : "العربية"}
//     </button>
//   );
// }

// *************************************************************************************************************
// "use client";

// import { useDispatch } from "react-redux";
// import { startLoading, stopLoading } from "@/Store/loaderSlice";
// import { useTranslation } from "react-i18next";
// // import { useRouter } from "next/router";
// import { usePathname } from "next/navigation";

// import { dir } from "i18next";
// import { useRouter } from "next/navigation";

// export default function LanguageChanger() {
//   const { i18n } = useTranslation();
//   const dispatch = useDispatch();
//   const router = useRouter(); // الحصول على الراوتر
//   const currentPathname = usePathname(); //router.pathname; // المسار الحالي
//   const i18nConfig = {
//     defaultLocale: "ar", // اللغة الافتراضية
//     prefixDefault: false, // إذا كنت لا تريد مسار اللغة الافتراضية
//   };

//   const handleLanguageChange = () => {
//     dispatch(startLoading()); // تفعيل الـ Loader
//     const newLocale = i18n.language === "ar" ? "en" : "ar";
//     const days = 30;
//     const date = new Date();
//     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//     const expires = date.toUTCString();
//     document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

//     // تحديث الاتجاه واللغة في عنصر <html>
//     document.documentElement.dir = dir(newLocale);
//     document.documentElement.lang = newLocale;

//     // تغيير المسار بناءً على اللغة
//     if (
//       i18n.language === i18nConfig.defaultLocale &&
//       !i18nConfig.prefixDefault
//     ) {
//       router.push(`/${newLocale}${currentPathname}`);
//     } else {
//       router.push(
//         currentPathname.replace(`/${i18n.language}`, `/${newLocale}`)
//       );
//     }

//     // تغيير اللغة
//     i18n.changeLanguage(newLocale).finally(() => {
//       dispatch(stopLoading()); // إيقاف الـ Loader بعد تغيير اللغة
//     });
//   };

//   return (
//     <button
//       onClick={handleLanguageChange}
//       className="fixed top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//     >
//       {i18n.language === "ar" ? "English" : "العربية"}
//     </button>
//   );
// }

// *************************************************************************************************************
// "use client";

// import { useDispatch } from "react-redux";
// import { startLoading, stopLoading } from "@/Store/loaderSlice";
// import { useTranslation } from "react-i18next";
// // import { useRouter } from "next/router";
// import { usePathname } from "next/navigation";

// import { dir } from "i18next";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function LanguageChanger() {
//   const { i18n } = useTranslation();
//   const dispatch = useDispatch();
//   const router = useRouter(); // الحصول على الراوتر
//   const currentPathname = usePathname(); //router.pathname; // المسار الحالي
//   const i18nConfig = {
//     defaultLocale: "ar", // اللغة الافتراضية
//     prefixDefault: false, // إذا كنت لا تريد مسار اللغة الافتراضية
//   };

//   const handleLanguageChange = () => {
//     // if (typeof document !== "undefined") {
//     dispatch(startLoading()); // تفعيل الـ Loader
//     const newLocale = i18n.language === "ar" ? "en" : "ar";
//     const days = 30;
//     const date = new Date();
//     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//     const expires = date.toUTCString();
//     document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

//     // تحديث الاتجاه واللغة في عنصر <html>
//     // document.documentElement.dir = dir(newLocale);
//     // document.documentElement.lang = newLocale;
//     // تغيير المسار بناءً على اللغة
//     if (
//       i18n.language === i18nConfig.defaultLocale &&
//       !i18nConfig.prefixDefault
//     ) {
//       router.push(`/${newLocale}${currentPathname}`);
//     } else {
//       router.push(
//         currentPathname.replace(`/${i18n.language}`, `/${newLocale}`)
//       );
//     }

//     // تغيير اللغة
//     i18n.changeLanguage(newLocale).finally(() => {
//       dispatch(stopLoading()); // إيقاف الـ Loader بعد تغيير اللغة
//     });
//     // }
//   };

//   return (
//     <button
//       onClick={handleLanguageChange}
//       // className="fixed top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//     >
//       {i18n.language === "ar" ? "English" : "العربية"}
//     </button>
//   );
// }

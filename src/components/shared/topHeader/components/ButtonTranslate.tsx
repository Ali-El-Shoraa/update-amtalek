"use client";
// import { useLocale } from "@/context/LocaleContext";
import i18next from "i18next";
import { TbWorld } from "react-icons/tb";

export default function ButtonTranslate() {
  // const locale = useLocale();

  const handleLanguageChange = () => {
    const newLang = i18next.language === "ar" ? "en" : "ar";

    // تغيير اللغة في i18next
    i18next.changeLanguage(newLang).then(() => {
      // تأكد أن اللغة تم تغييرها بنجاح
      const currentPath = window.location.pathname;
      const newPath = currentPath.replace(`/${i18next.language}`, `/${newLang}`);

      if (newPath.includes(newLang)) {
        // تحديث URL للرابط باللغة الجديدة
        window.location.replace(newPath);
      }
    });
  };

  return (
    <div>
      <button onClick={handleLanguageChange} className="flex items-center justify-center gap-2">
        <TbWorld />
        {/* {locale === "ar" ? "English" : "عربي"} */}
        {"English"}
      </button>
    </div>
  );
}

"use client";
// import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MdAttachMoney } from "react-icons/md";
import {
  faCircleUser,
  faHeart,
  faHouse,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import ButtonClientSide from "./ButtonClientSide";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  userData,
  userProfileDataOut,
} from "@/Store/Features/AuthenticationSlice";
import LangLink from "@/components/LangLink";
import LanguageChanger from "@/components/LanguageChanger";
// import { changeLanguage } from "i18next";

export default function HeaderTopMenu({ heroMenu }: any) {
  // const { i18n } = useTranslation();
  const { t, i18n } = useTranslation("LayoutComponents");

  function changeLanguage(lang: string) {
    // window.location.replace(window.location.href.replace(lng, lang));
    i18n.changeLanguage(lang);
    lang === "ar"
      ? window.location.replace(window.location.origin)
      : // : window.location.replace(window.location.href.replace(lng, lang));
        window.location.replace(window.location.origin + "/en");
    localStorage.setItem("i18nextLng", lang);
  }

  // حالة لتخزين بيانات المستخدم
  // const [userData, setUserData] = useState<any>({});

  // // مراقبة الـ cookie وتحديث حالة userData عند تغير الـ cookie
  // useEffect(() => {
  //   const cookieData = Cookies.get("userData");
  //   if (cookieData) {
  //     try {
  //       const parsedData = JSON.parse(cookieData);
  //       setUserData(parsedData);
  //     } catch (error) {
  //       console.error("Error parsing user cookie data: ", error);
  //     }

  //   }
  // }, []); // يتم استدعاء هذا الـ useEffect مرة واحدة عند تحميل الصفحة
  // const [userData, setUserData] = useState<any>({});

  const user = useSelector(userData); //localStorage.getItem("userData");
  // useEffect(() => {
  //   if (storedData) {
  //     try {
  //       const parsedData = JSON.parse(storedData);
  //       setUserData(parsedData);
  //     } catch (error) {
  //       console.error("Error parsing user data from localStorage: ", error);
  //     }
  //   }
  // }, []);

  // const userProfile: any = user?.data;
  const userProfile = useSelector(userProfileDataOut);

  const token: any = user?.token || null;

  // const userProfile: any = userData?.data;
  // const token: any = userData?.token || null;

  return (
    <div
      className={`hero__header--menu--items bg- flex items-center ${
        heroMenu
          ? "px-3 ss:px-1 w-full justify-between ss:justify-center "
          : "w-[55%] clg:w-full justify-end  clg:justify-center"
      }`}
    >
      {!token ? (
        <>
          <div className={`flex justify-start`}>
            <LangLink
              to="/login"
              className="border-r-2 rtl:border-r-0 rtl:border-l-2 border-r-secondary rtl:border-l-secondary flex justify-center items-center text-secondary px-3 axss:px-2 text-[10px] sm:text-[8px] font-bold axss:text-[6px] max-320:text-[4px]"
            >
              <FontAwesomeIcon
                className="mr-2 rtl:ml-2 rtl:mr-0 font-light text-[13px]"
                icon={faCircleUser}
              />
              {t("HeaderTopMenu.login")}
            </LangLink>

            <ButtonClientSide heroMenu={heroMenu} />
          </div>

          <LangLink
            className="submit__prop--btn flex justify-center items-center text-secondary px-3 axss:px-2 text-[10px] sm:text-[8px] font-bold axss:text-[6px] max-320:text-[4px]"
            to={
              !user?.token
                ? "/login"
                : userProfile?.has_package === "no"
                ? `/packages/${userProfile?.actor_type}`
                : (userProfile?.actor_type === "user" &&
                    userProfile?.has_package === "yes" &&
                    userProfile?.current_package_info?.package_info?.[0]
                      ?.reminder > 0) ||
                  (userProfile?.actor_type === "user" &&
                    userProfile?.has_package === "yes" &&
                    userProfile?.current_package_info?.package_info?.[1]
                      ?.reminder > 0)
                ? "/submit-property"
                : `/addons`
            }
            state={"showErrorToast"}
          >
            <FontAwesomeIcon
              className="mr-2 rtl:ml-2 rtl:mr-0 font-light text-[13px]"
              icon={faPlus}
            />
            {t("HeaderTopMenu.Submit_Property")}
          </LangLink>
        </>
      ) : (
        <>
          {userProfile?.actor_type === "user" && (
            <div
              className={`flex ${heroMenu ? "justify-start " : "justify-end "}`}
            >
              <LangLink
                className="border-r-2 rtl:border-r-0 rtl:border-l-2 border-r-secondary rtl:border-l-secondary flex justify-center items-center text-secondary px-3 axss:px-1 text-[10px] sm:text-[8px] font-bold axss:text-[6px] max-320:text-[4px]"
                to="/profile"
              >
                <FontAwesomeIcon
                  className="mr-2 rtl:ml-2 rtl:mr-0 font-light text-[13px]"
                  icon={faCircleUser}
                />
                {t("HeaderTopMenu.profile")}
              </LangLink>
              <LangLink
                className="border-r-2 rtl:border-r-0 rtl:border-l-2 border-r-secondary rtl:border-l-secondary flex justify-center items-center text-secondary px-3 axss:px-1 text-[10px] sm:text-[8px] font-bold axss:text-[6px] max-320:text-[4px]"
                to="/my-properties"
              >
                <FontAwesomeIcon
                  className="mr-2 rtl:ml-2 rtl:mr-0 font-light text-[13px]"
                  icon={faHouse}
                />
                {t("HeaderTopMenu.my_properties")}
              </LangLink>
              <LangLink
                to="/favorites"
                className={`flex justify-center items-center text-secondary px-3 axss:px-2 text-[10px] sm:text-[8px] font-bold axss:text-[6px] max-320:!text-[4px] ${
                  heroMenu
                    ? ""
                    : "border-r-2 rtl:border-r-0 rtl:border-l-2 border-r-secondary rtl:border-l-secondary"
                } ss:border-r-2 ss:rtl:border-r-0 ss:rtl:border-l-2 ss:border-r-secondary ss:rtl:border-l-secondary`}
              >
                <FontAwesomeIcon
                  className="mr-2 rtl:ml-2 rtl:mr-0 font-light text-[13px] max-320:text-[4px]"
                  icon={faHeart}
                />
                {t("HeaderTopMenu.Favorites")}
              </LangLink>
            </div>
          )}
          {userProfile?.actor_type === "broker" && (
            <Link
              // target={userProfile?.has_package === "yes" ? "_blank" : undefined}
              className="submit__prop--btn flex justify-center items-center text-secondary px-3 axss:px-2 text-[10px] sm:text-[8px] font-bold axss:text-[6px]"
              href={
                userProfile?.has_package === "no"
                  ? `/packages/${userProfile?.actor_type}`
                  : "https://dashboard.amtalek.com/en" //userProfile?.dashboard_link
              }
            >
              {t("HeaderTopMenu.go_to_dashboard")}
            </Link>
          )}
          {userProfile?.actor_type === "user" && (
            <LangLink
              className="submit__prop--btn ss:border-e ss:border-primary flex justify-center items-center text-secondary px-3 axss:px-2 text-[10px] sm:text-[8px] font-bold axss:text-[6px]"
              // to={
              //   userProfile?.has_package === "no"
              //     ? `/packages/${userProfile?.actor_type}`
              //     : "/submit-property"
              // }
              to={
                !user?.token
                  ? "/login"
                  : userProfile?.has_package === "no"
                  ? `/packages/${userProfile?.actor_type}`
                  : (userProfile?.actor_type === "user" &&
                      userProfile?.has_package === "yes" &&
                      userProfile?.current_package_info?.package_info?.[0]
                        ?.reminder > 0) ||
                    (userProfile?.actor_type === "user" &&
                      userProfile?.has_package === "yes" &&
                      userProfile?.current_package_info?.package_info?.[1]
                        ?.reminder > 0)
                  ? "/submit-property"
                  : `/addons`
              }
            >
              <FontAwesomeIcon
                className="mr-2 rtl:ml-2 rtl:mr-0 font-light text-[13px]"
                icon={faPlus}
              />
              {t("HeaderTopMenu.Submit_Property")}
            </LangLink>
          )}
        </>
      )}
      <LangLink
        className="border-x-2 ss:border-none border-secondary me-3 flex justify-center items-center text-secondary px-3 axss:px-2 text-[10px] sm:text-[8px] font-bold axss:text-[6px] xs:m-0 max-320:text-[4px]"
        to={token ? `/packages/${userProfile?.actor_type}` : "/packages"}
      >
        <MdAttachMoney size={15} /> {t("HeaderTopMenu.packages")}
      </LangLink>
      {/* <span className="flex justify-center items-center ss:hidden"> */}
      <span
        className={`${
          i18n.language.startsWith("ar")
            ? // border-r-2 rtl:border-r-2
              "text-[10px] sm:text-[8px] font-bold flex items-center justify-center rtl:border-l-0  border-l-secondary rtl:border-r-secondary px-2 ss:hidden"
            : "text-[10px] sm:text-[8px] font-bold flex items-center justify-center  px-2 ss:hidden"
        }`}
      >
        <LanguageChanger />

        {/* <MdOutlineLanguage /> */}

        {/* {i18n.language?.startsWith("ar") === true ? (
          <button
            className="text-[10px] sm:text-[8px] font-bold flex items-center justify-center  px-2 ss:hidden"
            onClick={() => changeLanguage("en")}
          >
            English
          </button>
        ) : (
          <button
            className="  text-[10px] sm:text-[8px] font-bold flex items-center justify-center border-r-2 rtl:border-l-0 rtl:border-r-2 border-l-secondary rtl:border-r-secondary px-2 ss:hidden"
            onClick={() => changeLanguage("ar")}
          >
            العربية
          </button>
        )} */}
      </span>
    </div>
  );
}

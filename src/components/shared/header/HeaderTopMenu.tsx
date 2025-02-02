"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MdAttachMoney } from "react-icons/md";

import {
  faCircleUser,
  faHeart,
  faHouse,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowLoginPopUp,
  userData,
  userProfileData,
} from "@/Store/Features/AuthenticationSlice";

import { TUser } from "@/Types/AppTypes";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";
import LangLink from "@/components/LangLink";
import LanguageChanger from "@/components/LanguageChanger";

export default function HeaderTopMenu({ heroMenu }: any) {
  const { t, i18n } = useTranslation("LayoutComponents");
  const user = useSelector(userData);
  const dispatchRedux = useDispatch();
  const userProfile = useSelector(userProfileData) as TUser | null;

  return (
    <div
      className={`hero__header--menu--items bg-   flex  items-center ${
        heroMenu
          ? " px-3 ss:px-1 w-full justify-between ss:justify-center "
          : "  w-[55%] clg:w-full justify-end  clg:justify-center"
      } `}
    >
      {!user?.token ? (
        <>
          <div className={` flex justify-start  `}>
            <LangLink
              to="/login"
              className="border-r-2  rtl:border-r-0 rtl:border-l-2  border-r-secondary rtl:border-l-secondary  flex justify-center items-center text-secondary px-3 axss:px-2 text-[10px] axss:text-[8px]    font-bold"
            >
              <FontAwesomeIcon
                className="mr-2 rtl:ml-2 rtl:mr-0 font-light text-[13px]"
                icon={faCircleUser}
              />
              {t("HeaderTopMenu.login")}
            </LangLink>

            <button
              className={`
              ${
                heroMenu
                  ? "  "
                  : "border-r-2 rtl:border-r-0 rtl:border-l-2  border-r-secondary rtl:border-l-secondary "
              }
              
              ss:border-r-2 ss:rtl:border-r-0 ss:rtl:border-l-2  ss:border-r-secondary ss:rtl:border-l-secondary flex justify-center items-center text-secondary px-3 axss:px-2 text-[10px] axss:text-[8px]  font-bold`}
              onClick={() => dispatchRedux(setShowLoginPopUp(true))}
            >
              <FontAwesomeIcon
                className="mr-2 rtl:ml-2 rtl:mr-0 font-light text-[13px]"
                icon={faHeart}
              />
              {t("HeaderTopMenu.Favorites")}
            </button>
          </div>

          <LangLink
            className="submit__prop--btn    flex justify-center items-center text-secondary px-3 axss:px-2 text-[10px] axss:text-[8px]  font-bold"
            to={`${
              user === null
                ? "/login"
                : userProfile?.actor_type === "user" &&
                  userProfile?.has_package === "yes"
                ? "/submit-property"
                : `/packages/${userProfile?.actor_type}`
            }`}
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
              className={` flex ${
                heroMenu ? "justify-start " : "justify-end "
              } `}
            >
              <LangLink
                className="border-r-2  rtl:border-r-0 rtl:border-l-2  border-r-secondary rtl:border-l-secondary  flex justify-center items-center text-secondary px-3 axss:px-1 text-[10px] axss:text-[8px] bgred5  font-bold"
                to="/profile"
              >
                <FontAwesomeIcon
                  className="mr-2 rtl:ml-2 rtl:mr-0 font-light text-[13px]"
                  icon={faCircleUser}
                />
                {t("HeaderTopMenu.profile")}
              </LangLink>
              <LangLink
                className="border-r-2 rtl:border-r-0 rtl:border-l-2  border-r-secondary rtl:border-l-secondary  flex justify-center items-center text-secondary px-3 axss:px-1 text-[10px] axss:text-[8px]  font-bold mb:bg-"
                to="/my-properties"
              >
                <FontAwesomeIcon
                  className="mr-2 rtl:ml-2 rtl:mr-0 font-light text-[13px] ss:text-[8px]"
                  icon={faHouse}
                />
                {t("HeaderTopMenu.my_properties")}{" "}
              </LangLink>

              <LangLink
                to="/favorites"
                className={`ss:border-r-2 ss:rtl:border-r-0 ss:rtl:border-l-2  ss:border-r-secondary ss:rtl:border-l-secondary flex justify-center items-center text-secondary px-3 axss:px-2 text-[10px] axss:text-[8px]  font-bold
              ${
                heroMenu
                  ? "  "
                  : "border-r-2 rtl:border-r-0 rtl:border-l-2  border-r-secondary rtl:border-l-secondary "
              }
              `}
              >
                <FontAwesomeIcon
                  className="mr-2 rtl:ml-2 rtl:mr-0 font-light text-[13px]"
                  icon={faHeart}
                />
                {t("HeaderTopMenu.Favorites")}
              </LangLink>
            </div>
          )}
          {userProfile?.actor_type === "broker" && (
            <Link
              target="_blank"
              className="submit__prop--btn flex justify-center items-center text-secondary px-3 axss:px-2 text-[10px] axss:text-[8px]  font-bold"
              href={
                userProfile?.has_package === "no"
                  ? `/${i18n.language}/packages/${userProfile?.actor_type}`
                  : userProfile?.dashboard_link
              }
            >
              {t("HeaderTopMenu.go_to_dashboard")}
            </Link>
          )}

          {userProfile?.actor_type === "user" && (
            <LangLink
              className="submit__prop--btn  ss:border-e ss:border-primary flex justify-center items-center text-secondary px-3 axss:px-2 text-[10px] axss:text-[8px]  font-bold"
              to={
                userProfile?.has_package === "no"
                  ? `/packages/${userProfile?.actor_type}`
                  : "/submit-property"
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
        className={
          "border-x-2 ss:border-none border-secondary me-3 flex justify-center items-center text-secondary px-3 axss:px-2 text-[10px] axss:text-[8px] font-bold "
        }
        to={user?.token ? `/packages/${userProfile?.actor_type}` : `/packages`}
      >
        <MdAttachMoney size={15} /> {t("HeaderTopMenu.packages")}
      </LangLink>
      <span className="flex justify-center items-center ss:hidden">
        <LanguageChanger />
      </span>
    </div>
  );
}

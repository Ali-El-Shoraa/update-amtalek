"use client";
import { setShowLoginPopUp } from "@/Store/Features/AuthenticationSlice";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

export default function ButtonClientSide({ heroMenu }: any) {
  const dispatchRedux = useDispatch();
  const { t } = useTranslation("LayoutComponents");

  return (
    <button
      className={`
            ${
              heroMenu
                ? "  "
                : "border-r-2 rtl:border-r-0 rtl:border-l-2  border-r-secondary rtl:border-l-secondary "
            }

            ss:border-r-2 ss:rtl:border-r-0 ss:rtl:border-l-2  ss:border-r-secondary ss:rtl:border-l-secondary flex justify-center items-center text-secondary px-3 axss:px-2 text-[10px] axss:text-[8px]  font-bold xs:text-[6px] max-320:text-[4px]`}
      onClick={() => dispatchRedux(setShowLoginPopUp(true))}
    >
      <FontAwesomeIcon className="mr-2 rtl:ml-2 rtl:mr-0 font-light text-[13px]" icon={faHeart} />
      {t("HeaderTopMenu.Favorites")}
    </button>
  );
}

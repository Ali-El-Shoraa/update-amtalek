"use client";
import { useCallback, useRef } from "react";
import favIconSrc from "@/assets/images/fav-icon.png";
import favoritesIllustration from "@/assets/images/favorites-illustration.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import {
  showLoginPopUp,
  setShowLoginPopUp,
} from "@/Store/Features/AuthenticationSlice";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";
// import Link from "./Link";

function LoginPopUp() {
  const { t } = useTranslation("Pages_LandingPage");

  const LoginPopUpContent = useRef<HTMLDivElement>(null);
  const toggleLoginPopUp = useSelector(showLoginPopUp);
  const dispatchRedux = useDispatch();

  const handleClick = useCallback((e: any) => {
    if (!LoginPopUpContent?.current?.contains(e.target)) {
      dispatchRedux(setShowLoginPopUp(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      onClick={handleClick}
      className={`w-full h-screen ${
        toggleLoginPopUp
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } trns fixed inset-0 z-[1000]`}
    >
      <div className="relative w-full h-full  flex justify-center items-center">
        <div className="LoginPopUp__absolute absolute h-full w-full bg-secondary opacity-40"></div>
        <div
          ref={LoginPopUpContent}
          className={`LoginPopUp__content w-1/2 min-w-[750px] amd:min-w-[300px] h-1/2 min-h-[420px]  md:w-full round flex bg-grey ${
            toggleLoginPopUp ? "scale-100" : "scale-0"
          } trns origin-bottom shadow-lg amd:w-full amd:h-full amd:flex-col amd:items-center amd:justify-between relative`}
        >
          <div className="w-1/2 amd:w-full h-auto flex flex-col items-center justify-center p-7 gap-3 ">
            <Image
              width={1000}
              height={1000}
              className="w-14  aspect-square "
              src={favIconSrc}
              alt="fav-icon"
            />
            <h3 className="text-2xl font-medium text-center ">
              {t("LoginPopUp.heading")}
            </h3>
            <p className=" text-lg font-   items-center hidden amd:flex ">
              {t("LoginPopUp.sub_heading")}
            </p>
            <Link
              href="/login"
              className=" w-full round  h-10  flex justify-center items-center gap-2 px-2 py-[6px] bg-secondary transition-all duration-300 ease-in-out  hover:bg-bg hover:text-secondary text-bg text-lg mt-5 mb-3 amd:max-w-xs"
            >
              {t("LoginPopUp.login")}
            </Link>
            <Link
              href="/register"
              className=" w-full round  h-10  flex justify-center items-center gap-2 px-2 py-[6px] bg-bg transition-all duration-300 ease-in-out  hover:bg-secondary hover:text-bg text-secondary text-lg amd:max-w-xs"
            >
              {t("LoginPopUp.Register")}
            </Link>
          </div>
          <div className="w-1/2 amd:w-full amd:pt-7 amd:gap-4 h-auto bg-bg flex justify-between px-7 flex-col items-center ">
            <p className=" text-xl font-medium h-[15%] amd:h-auto  flex items-center amd:hidden">
              {t("LoginPopUp.sub_heading")}
            </p>

            <Image
              width={1000}
              height={1000}
              className="h-[85%] amd:h-auto object-cover amd:max-w-xs"
              src={favoritesIllustration}
              alt="favoritesIllustration"
            />
          </div>
          <FontAwesomeIcon
            onClick={() => dispatchRedux(setShowLoginPopUp(false))}
            className=" absolute left-5 rtl:left-auto rtl:right-5 top-5 cursor-pointer trns active:scale-90 text-3xl "
            icon={faCircleXmark}
          />
        </div>
      </div>
    </section>
  );
}

export default LoginPopUp;

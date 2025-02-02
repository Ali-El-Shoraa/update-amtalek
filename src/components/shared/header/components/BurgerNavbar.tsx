"use client";

import LanguageChanger from "@/components/LanguageChanger";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function BurgerNavbar() {
  const [burgerChecked, setBurgerChecked] = useState(false);
  const { t, i18n } = useTranslation("Pages_LandingPage");
  const pathname = usePathname();
  const isActive = (path: any) => pathname === path;
  function handleBurgerChange(e: any) {
    if (e.target.checked) {
      setBurgerChecked(true);
    } else {
      setBurgerChecked(false);
    }
  }
  return (
    <div className="burger__btn hidden xll:block ">
      <input
        onChange={handleBurgerChange}
        hidden
        className="burger-icon"
        id="burger-icon"
        name="burger-icon"
        type="checkbox"
        checked={burgerChecked}
      />

      <label className="burger-icon-menu" htmlFor="burger-icon">
        <div className="bar bar--1"></div>
        <div className="bar bar--2"></div>
        <div className="bar bar--3"></div>
      </label>

      <div
        // xl:w-[112%] xl:left-[-3%]
        className={`mobile__nav--wrapper w-full xll:w-[110%] xl:w-[125%] clg:w-[139%] md:w-[111%] absolute top-full left-1/2 -translate-x-1/2 bg-custome-blue z-[1000] hidden xll:block h-screen text-white transition-all duration-300 ease-in-out
           ${
             burgerChecked
               ? "opacity-100 pointer-events-auto"
               : "opacity-0 pointer-events-none"
           }
            `}
        // {`mobile__nav--wrapper absolute z-[1000] w-full hidden xll:block bg-custome-blue h-[calc(100vh-88px)] transition-all duration-300 ease-in-out ${
        //   burgerChecked
        //     ? "translate-x-0 opacity-100 pointer-events-auto"
        //     : "translate-x-0 opacity-0 pointer-events-none"
        // }`}
      >
        <div className="mobile__nav absolute z-[1000] inset-0 w-full h-full bg-secondary flex justify-center items-center">
          {" "}
          {/* justify-center */}
          <ul className="mobile__nav--items  flex flex-col items-center text-bg text-lg gap-9 h-full justify-start pt-8">
            <li onClick={() => setBurgerChecked(false)}>
              <Link
                className={`mobile__nav--item ${
                  isActive(`/${i18n.language.startsWith("ar") ? "" : "en"}`)
                    ? "active"
                    : ""
                }`}
                href={`/`}
              >
                {t("Navbar.menu_items.Home")}
              </Link>
            </li>

            {pathname?.includes("careers") ? (
              <>
                <li onClick={() => setBurgerChecked(false)}>
                  <Link
                    className={`mobile__nav--item ${
                      isActive(
                        `/${
                          i18n.language.startsWith("ar") ? "" : "en/"
                        }careers/search`
                      )
                        ? "active"
                        : ""
                    }`}
                    href={`/careers/search`}
                  >
                    {t("Navbar.menu_items.Careers.browse_jobs")}
                  </Link>
                </li>

                <li onClick={() => setBurgerChecked(false)}>
                  <Link
                    className={`mobile__nav--item ${
                      isActive(
                        `/${
                          i18n.language.startsWith("ar") ? "" : "en/"
                        }careersemployers`
                      )
                        ? "active"
                        : ""
                    }`}
                    href={`/careers/employers`}
                  >
                    {t("Navbar.menu_items.Careers.for_employers")}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li onClick={() => setBurgerChecked(false)}>
                  <Link
                    onClick={() => window.sessionStorage.setItem("step", "1")}
                    className={`mobile__nav--item ${
                      isActive(
                        `/${i18n.language.startsWith("ar") ? "" : "en/"}search`
                      )
                        ? "active"
                        : ""
                    }`}
                    href={`/search`}
                  >
                    {t("Navbar.menu_items.Find_Properties.title")}
                  </Link>
                </li>

                <li onClick={() => setBurgerChecked(false)}>
                  <Link
                    className={`mobile__nav--item ${
                      isActive(
                        `/${
                          i18n.language.startsWith("ar") ? "" : "en/"
                        }Agencies`
                      )
                        ? "active"
                        : ""
                    }`}
                    href="/Agencies"
                  >
                    {t("Navbar.menu_items.Brokers")}
                  </Link>
                </li>

                <li onClick={() => setBurgerChecked(false)}>
                  <Link
                    className={`mobile__nav--item ${
                      isActive(
                        `/${
                          i18n.language.startsWith("ar") ? "" : "en/"
                        }projects`
                      )
                        ? "active"
                        : ""
                    }`}
                    href="/projects"
                  >
                    {t("Navbar.menu_items.Projects")}
                  </Link>
                </li>

                <li onClick={() => setBurgerChecked(false)}>
                  {pathname.includes("careers") ? (
                    <Link
                      className={`mobile__nav--item ${
                        isActive(
                          `/${
                            i18n.language.startsWith("ar") ? "" : "en/"
                          }careers`
                        )
                          ? "active"
                          : ""
                      }`}
                      href="/careers"
                    >
                      {t("Navbar.menu_items.Job_Career")}
                    </Link>
                  ) : (
                    <Link
                      className={`mobile__nav--item ${
                        isActive(
                          `/${
                            i18n.language.startsWith("ar") ? "" : "en/"
                          }contact`
                        )
                          ? "active"
                          : ""
                      }`}
                      href="/contact"
                    >
                      {t("Navbar.menu_items.Contact_Us")}
                    </Link>
                  )}
                </li>
              </>
            )}
            {/* <li onClick={() => setBurgerChecked(false)}>
              <Link
                className={`mobile__nav--item ${
                  isActive(`/${i18n.language.startsWith("ar") ? "" : "en/"}careers`) ? "active" : ""
                }`}
                href="/careers"
              >
                {t("Navbar.menu_items.Job_Career")}
              </Link>
            </li> */}

            <li onClick={() => setBurgerChecked(false)}>
              <LanguageChanger />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

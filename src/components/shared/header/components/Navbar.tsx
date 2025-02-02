"use client";
import BurgerNavbar from "./BurgerNavbar";
import LangLink from "@/components/LangLink";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";
import { setFormMenuData } from "@/Store/Features/sendDataFormCareersMenuToSearch";
import { useDispatch } from "react-redux";
import LangNavLink from "@/components/LangNavLink";
import getData from "@/lib/api/getData";

const Navbar = memo(function Navbar() {
  const router = useRouter();

  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const isActive = (path: any) => pathname === path;

  const [categoriesData, setCategoriesData] = useState([]);
  const dispatch = useDispatch();
  async function fetchDataSearch() {
    const data = await getData("job-categories", i18n.language);

    setCategoriesData(() => data?.data);
  }

  useEffect(() => {
    fetchDataSearch();
  }, [i18n?.language]);

  return (
    <>
      <ul className="desktop__nav xll:hidden flex justify-between items-center text-secondary text-lg gap-9 xl:gap-7 ">
        <li>
          <LangNavLink
            className={`desktop__nav--item ${
              isActive(`/${i18n.language.startsWith("ar") ? "" : "en"}`)
                ? "active"
                : ""
            }`}
            homepage
            end
            to={`/`}
          >
            {t("Navbar.menu_items.Home")}
          </LangNavLink>
        </li>

        {pathname.includes("careers") ? (
          <li className="relative h-[88px] flex justify-center items-center group/grand cursor-pointer">
            <LangNavLink
              onClick={() => {
                window.sessionStorage.setItem("step", "1");

                router.refresh();
              }}
              className={`desktop__nav--item group/parent h-fit flex justify-start items-center gap-2 ${
                isActive("/search") ? "active" : ""
              }`}
              to={`/careers/search`}
            >
              {t("Navbar.menu_items.Careers.browse_jobs")}
              {/* {t("Navbar.menu_items.Find_Properties.title")} */}
              <FontAwesomeIcon
                className={`transition-all text-[0.9rem] duration-200 ease-in-out group-hover/grand:rotate-180`}
                icon={faChevronDown}
              />
            </LangNavLink>
            <div className="find__properties--sub--menu--1 shadow-md absolute left-0 rtl:left-auto rtl:right-0 bg-secondary text-white top-[88px] w-[250px] h-auto  opacity-0 pointer-events-none group-hover/grand:opacity-100 group-hover/grand:pointer-events-auto transition-all duration-300 ease-in-out">
              {categoriesData?.map((category: any) => (
                <div
                  key={category?.id}
                  onClick={() => {
                    dispatch(setFormMenuData({ category_id: category?.id }));
                    router.push(`/careers/search`);
                  }}
                  className="sub__menu--for--sale w-full h-10 flex justify-between items-center text-base  px-2 hover:bg-bg hover:text-secondary transition-all duration-300 ease-in-out group/sale cursor-pointer relative"
                >
                  {category?.title}

                  {/* <FontAwesomeIcon
                    className={`text-[0.9rem] -rotate-90 rtl:rotate-90`}
                    icon={faChevronDown}
                  /> */}
                </div>
              ))}
            </div>
          </li>
        ) : (
          <li className="relative h-[88px] flex justify-center items-center group/grand cursor-pointer">
            <LangNavLink
              onClick={() => {
                window.sessionStorage.setItem("step", "1");

                router.refresh();
              }}
              className={`desktop__nav--item group/parent h-fit flex justify-start items-center gap-2 ${
                isActive("/search") ? "active" : ""
              }`}
              to={`/search`}
            >
              {t("Navbar.menu_items.Find_Properties.title")}
              <FontAwesomeIcon
                className={`transition-all text-[0.9rem] duration-200 ease-in-out group-hover/grand:rotate-180`}
                icon={faChevronDown}
              />
            </LangNavLink>
            <div className="find__properties--sub--menu--1 shadow-md absolute left-0 rtl:left-auto rtl:right-0 bg-secondary text-white top-[88px] w-[215px] h-auto  opacity-0 pointer-events-none group-hover/grand:opacity-100 group-hover/grand:pointer-events-auto transition-all duration-300 ease-in-out">
              <div className="sub__menu--for--sale w-full h-10 flex justify-between items-center text-base  px-2 hover:bg-bg hover:text-secondary transition-all duration-300 ease-in-out group/sale cursor-pointer relative">
                {t("Navbar.menu_items.Find_Properties.For_Sale.title")}
                <FontAwesomeIcon
                  className={`text-[0.9rem] -rotate-90 rtl:rotate-90`}
                  icon={faChevronDown}
                />
                <div className="for__sale--sub--menu shadow-md absolute left-full rtl:left-auto rtl:right-full top-0 w-full opacity-0 pointer-events-none group-hover/sale:opacity-100 group-hover/sale:pointer-events-auto">
                  <LangLink
                    to={`/search?purpose=${t(
                      "Navbar.menu_items.Find_Properties.For_Sale.Residential"
                    )}`}
                    className={` w-full bg-secondary h-10 flex justify-between items-center px-2 transition-all duration-300 ease-in-out hover:bg-bg hover:text-secondary text-bg`}
                  >
                    {t(
                      "Navbar.menu_items.Find_Properties.For_Sale.Residential"
                    )}
                  </LangLink>
                  <LangLink
                    to={`/search?purpose=${t(
                      "Navbar.menu_items.Find_Properties.For_Sale.Commercial"
                    )}`}
                    className=" w-full bg-secondary h-10 flex justify-between items-center px-2 hover:bg-bg transition-all duration-300 ease-in-out hover:text-secondary text-bg"
                  >
                    {t("Navbar.menu_items.Find_Properties.For_Sale.Commercial")}
                  </LangLink>
                </div>
              </div>

              <div className="sub__menu--for--rent w-full h-10 flex justify-between items-center text-base  px-2 hover:bg-bg hover:text-secondary transition-all duration-300 ease-in-out group/rent cursor-pointer relative">
                {t("Navbar.menu_items.Find_Properties.For_Rent.title")}
                <FontAwesomeIcon
                  className={`text-[0.9rem] -rotate-90 rtl:rotate-90`}
                  icon={faChevronDown}
                />
                <div className="for__rent--sub--menu shadow-md absolute left-full rtl:left-auto rtl:right-full top-0 w-full opacity-0 pointer-events-none group-hover/rent:opacity-100 group-hover/rent:pointer-events-auto">
                  <LangLink
                    to={`/search?purpose=${t(
                      "Navbar.menu_items.Find_Properties.For_Rent.Residential"
                    )}`}
                    className=" w-full bg-secondary h-10 flex justify-between items-center px-2 transition-all duration-300 ease-in-out hover:bg-bg hover:text-secondary text-bg"
                  >
                    {t(
                      "Navbar.menu_items.Find_Properties.For_Rent.Residential"
                    )}
                  </LangLink>
                  <LangLink
                    to={`/search?purpose=${t(
                      "Navbar.menu_items.Find_Properties.For_Rent.Commercial"
                    )}`}
                    className=" w-full bg-secondary h-10 flex justify-between items-center px-2 hover:bg-bg transition-all duration-300 ease-in-out hover:text-secondary text-bg"
                  >
                    {t("Navbar.menu_items.Find_Properties.For_Rent.Commercial")}
                  </LangLink>
                </div>
              </div>
            </div>
          </li>
        )}

        {pathname?.includes("careers") ? (
          <li>
            <LangNavLink
              className={`desktop__nav--item ${
                isActive(
                  `/${i18n.language.startsWith("ar") ? "" : "en/"}agencies`
                )
                  ? "active"
                  : ""
              }`}
              to="/careers/employers"
            >
              {t("Navbar.menu_items.Careers.for_employers")}
            </LangNavLink>
          </li>
        ) : (
          <li>
            <LangNavLink
              className={`desktop__nav--item ${
                isActive(
                  `/${i18n.language.startsWith("ar") ? "" : "en/"}agencies`
                )
                  ? "active"
                  : ""
              }`}
              to="/agencies"
            >
              {t("Navbar.menu_items.Brokers")}
            </LangNavLink>
          </li>
        )}

        {!pathname?.includes("careers") && (
          <>
            <li>
              <LangNavLink
                className={`desktop__nav--item relative ${
                  isActive(
                    `/${i18n.language.startsWith("ar") ? "" : "en/"}projects`
                  )
                    ? // isActive(`/${i18n.language.startsWith("ar") ? "" : "en/"}projects`)
                      "active"
                    : ""
                }`}
                // to="/projects"
                to="/projects"
              >
                <span className="absolute bg-red-500 -top-5 right-0 flex items-center justify-center font-bold text-[8px] rounded h-5 w-6 text-white">
                  {t("New")}
                </span>
                {t("Navbar.menu_items.Projects")}
              </LangNavLink>
            </li>

            <li>
              {pathname?.includes("careers") ? (
                <LangNavLink
                  className={`desktop__nav--item relative ${
                    isActive(
                      `/${i18n.language.startsWith("ar") ? "" : "en/"}careers`
                    )
                      ? "active"
                      : ""
                  }`}
                  to="/careers"
                >
                  <span className="absolute bg-red-500 -top-5 right-0 flex items-center justify-center font-bold text-[8px] rounded h-5 w-6 text-white">
                    {t("New")}
                  </span>
                  {t("Navbar.menu_items.Job_Career")}
                </LangNavLink>
              ) : (
                <LangNavLink
                  className={`desktop__nav--item ${
                    isActive(
                      `/${i18n.language.startsWith("ar") ? "" : "en/"}contact`
                    )
                      ? "active"
                      : ""
                  }`}
                  to="/contact"
                >
                  {t("Navbar.menu_items.Contact_Us")}
                </LangNavLink>
              )}
            </li>
          </>
        )}
      </ul>

      {/* ************************************************************************* */}
      <BurgerNavbar />
    </>
  );
});
export default Navbar;

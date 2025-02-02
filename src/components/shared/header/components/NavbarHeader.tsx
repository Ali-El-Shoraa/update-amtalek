"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CiClock2 } from "react-icons/ci";
import logoImg from "@/assets/images/navEnLogo.png";
import arlogoImg from "@/assets/images/navArLogo.png";
import Image from "next/image";
import LangLink from "@/components/LangLink";
import Link from "next/link";
import Navbar from "./Navbar";
import {
  faChevronDown,
  faCircleUser,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import favIconSrc from "@/assets/images/fav-icon.png";
import NavDropDownMenu from "./NavDropDownMenu";
import { Dropdown, Badge } from "antd";
import { useSelector } from "react-redux";
import {
  userData,
  userProfileDataOut,
} from "@/Store/Features/AuthenticationSlice";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ButtonNavbar from "./ButtonNavbar";
import { usePathname } from "next/navigation";

const NavbarHeader = function NavbarHeader({ locale }: any) {
  const { t, i18n } = useTranslation("LayoutComponents");
  const pathname = usePathname();
  const userProfile = useSelector(userProfileDataOut);

  const user = useSelector(userData);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unseenCounter, setUnseenCounter] = useState<number>(0);
  const count = !user?.token ? 0 : unseenCounter;

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?.token) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL_GET_DATA}web/my-notifications`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch notifications");
        const data = await response.json();
        setNotifications(data?.data?.notifications || []);
        setUnseenCounter(data?.data?.unseen_counter || 0);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [user?.token]);

  const menuItems = notifications.length
    ? [
        {
          key: "0",
          label: (
            <span className="flex cursor-default hover:bg-none items-center gap-2 bg-slate rounded p-1 text-lg w-full justify-center font-bold text-secondary">
              {i18n.language?.startsWith("ar")
                ? "آخر الإشعارات"
                : "Latest Notifications"}
            </span>
          ),
        },
        ...notifications.map((item: any) => ({
          key: item?.id,
          className: "",
          label: (
            <Link
              href={
                item?.notification_type === "offer"
                  ? "my-received-offers"
                  : "messages"
              }
              className={`w-full flex items-center p-1 gap-5 rounded ${
                item?.seen_status === "no" ? "bg-gray-100" : ""
              }`}
            >
              <Image
                width={100}
                height={100}
                src={
                  item?.sender_data?.image ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                className="w-12 h-12 rounded-full"
                alt="Profile"
              />
              <div className="flex flex-1 flex-col gap-1">
                <h2 className="font-semibold text-slate-600">{item?.title}</h2>
                <span className="text-slate-500">{item?.description}</span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <CiClock2 /> {item?.time}
                </span>
              </div>
            </Link>
          ),
        })),
        {
          key: "1543",
          className: "bg-white",
          label: (
            <Link
              href="/notifications"
              className="flex items-center justify-center !text-white border border-primary hover:bg-white mx-auto hover:!text-primary p-1 gap-5 rounded bg-primary w-[90%]"
            >
              {i18n.language?.startsWith("ar")
                ? "عرض جميع الإشعارات"
                : "Show all Notifications"}
            </Link>
          ),
        },
      ]
    : [
        {
          key: "0",
          className: "!p-0 hover:!p-0 pb-2",
          label: (
            <div className="flex flex-col justify-center text-secondary items-center bg-slate-100 rounded gap-7 cursor-default w-full">
              <FontAwesomeIcon
                className="text-6xl text-secondary"
                icon={faBell}
              />
              <p className="font-bold">
                {i18n.language?.startsWith("ar")
                  ? "لا توجد إشعارات"
                  : "No Notifications"}
              </p>
              <Link
                href="/notifications"
                className="flex items-center justify-center text-white border border-primary hover:bg-transparent hover:text-primary p-1 gap-5 rounded bg-primary w-[90%]"
              >
                {i18n.language?.startsWith("ar")
                  ? "عرض جميع الإشعارات"
                  : "Show all Notifications"}
              </Link>
            </div>
          ),
        },
      ];

  return (
    <header className="w-full h-[88px] bg-bg z-40 relative">
      <nav className="h-[88px] flex justify-between items-center bg-bg relative z-50">
        <LangLink to="/" className="logo w-36 max-w-[144px] min-w-[144px]">
          <Image
            height={757}
            width={2928}
            // onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            src={i18n.language?.startsWith("ar") ? arlogoImg : logoImg}
            alt="Amtalek"
            className="h-full w-full cursor-pointer"
          />
        </LangLink>

        <Navbar />

        {/* gap-10 */}
        <div className="nav__CTAs flex items-center gap-6 ss:ltr:gap-3 ss:rtl:gap-2">
          {user?.data?.actor_type === "user" && (
            <span>
              <Dropdown
                trigger={user?.token ? ["click"] : []}
                menu={{ items: menuItems }}
                placement="bottom"
                overlayClassName="p-0 w-52 max-w-full w-[400px]" // إضافة class إلى <ul>
              >
                <Badge
                  showZero
                  classNames={{
                    indicator: "!text-[14px] rtl:!left-2 !rounded-full !px-1",
                  }}
                  className="cursor-pointer !text-[11px]"
                  size="default"
                  count={count}
                >
                  <FontAwesomeIcon
                    icon={faBell}
                    className="text-secondary text-2xl ss:text-[20px]"
                  />
                </Badge>
              </Dropdown>
            </span>
          )}

          <ButtonNavbar />

          {user?.token ? (
            // user?.data
            <NavDropDownMenu
              user={user?.data}
              userProfile={userProfile}
              ForRealEstate={true}
            />
          ) : (
            <div className="sigin__wrapper group relative ">
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "0", // مفتاح فريد لكل عنصر
                      className: "!p-0", // كلاس للعنصر
                      label: (
                        <div className={`signin__menu  w-72 h-96`}>
                          <div className="flex flex-col justify-center items-center w-full h-full bg-grey p-7 gap-3 shadow-md round">
                            <Image
                              width={1000}
                              height={1000}
                              className="w-14 aspect-square"
                              src={favIconSrc}
                              alt="fav-icon"
                            />

                            <h3
                              className={`text-2xl font-medium text-center text-secondary ${
                                i18n.language.startsWith("ar")
                                  ? "font-cairo"
                                  : "font-poppins"
                              }`}
                            >
                              {t("Navbar.Login_drop_down_menu.heading")}
                            </h3>
                            <p
                              className={`opacity-70 ${
                                i18n.language.startsWith("ar")
                                  ? "font-cairo"
                                  : "font-poppins"
                              }`}
                            >
                              {t("Navbar.Login_drop_down_menu.sub_heading")}
                            </p>
                            <LangLink
                              to="/login"
                              className="w-full round h-10 flex justify-center items-center gap-2 px-2 py-[6px] bg-secondary transition-all duration-300 ease-in-out hover:bg-bg hover:text-secondary text-bg text-lg mt-5 mb-3"
                            >
                              {t("Navbar.Login_drop_down_menu.Login_btn_txt")}
                            </LangLink>
                            <LangLink
                              to="/register"
                              className="w-full round h-10 flex justify-center items-center gap-2 px-2 py-[6px] bg-bg transition-all duration-300 ease-in-out hover:bg-secondary hover:text-bg text-secondary text-lg"
                            >
                              {t(
                                "Navbar.Login_drop_down_menu.Register_btn_txt"
                              )}
                            </LangLink>
                          </div>
                        </div>
                      ),
                    },
                  ],
                }}
                trigger={["click"]}
              >
                <div>
                  <button className="round h-10 flex justify-center items-center gap-2 px-2 py-[6px] bg-secondary text-bg duration-300 ease-in-out transition-all hover:bg-transparent hover:text-secondary border-2 border-secondary ">
                    <FontAwesomeIcon
                      className="font-light text-2xl "
                      icon={faCircleUser}
                    />
                    {pathname.includes("careers") && (
                      <h3 className="text-sm font-bold">
                        <span className="sm:hidden text-sm font-bold">
                          {" "}
                          {t("Navbar.Login_drop_down_menu.jobseeker")}
                        </span>
                      </h3>
                    )}
                    <FontAwesomeIcon
                      className=" text-[0.9rem]"
                      icon={faChevronDown}
                    />
                  </button>
                </div>
              </Dropdown>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavbarHeader;

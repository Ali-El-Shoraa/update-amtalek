"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ButtonNavbar() {
  const { t } = useTranslation("Pages_LandingPage");

  const pathname = usePathname();
  return (
    <div className="flex items-center justify-center gap-10">
      {pathname.includes("careers") ? (
        <Link
          href={`${process.env.NEXT_PUBLIC_DASHBOARD}`}
          className="rounded h-10 flex justify-center items-center gap-2 px-2 sm:px-3 py-[6px] bg-red-500 transition-all duration-300 ease-in-out  hover:bg-transparent hover:text-red-500 text-bg text-md border-2 border-red-500"
        >
          <FontAwesomeIcon icon={faUserTie} size="1x" />
          <span className="sm:hidden text-sm font-bold">
            {t("Navbar.social.employer")}
          </span>
        </Link>
      ) : (
        <Link
          href="/careers"
          className="rounded h-10 flex justify-center items-center gap-2 px-2 sm:px-3 py-[6px] bg-red-500 transition-all duration-300 ease-in-out  hover:bg-transparent hover:text-red-500 text-bg text-md border-2 border-red-500"
        >
          <FontAwesomeIcon icon={faUserTie} size="1x" />
          <span className="sm:hidden text-sm font-bold">
            {t("Navbar.social.title_job")}
          </span>
        </Link>
      )}
    </div>
  );
}

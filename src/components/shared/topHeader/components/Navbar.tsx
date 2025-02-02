import { FaDollarSign, FaPlus, FaHeart, FaUserCircle } from "react-icons/fa";
import LanguageChanger from "@/components/LanguageChanger";
import Link from "next/link";

export default function Navbar({ t }: any) {
  return (
    <ul className="flex items-center justify-center text-xs">
      <li className="px-3 flex items-center justify-center gap-1">
        <Link
          href={`/login`}
          className={`border-r-2  rtl:border-r-0 rtl:border-l-2  border-r-custome-blue rtl:border-l-custome-blue  flex justify-center items-center text-custome-blue px-3 axss:px-1 text-[10px] axss:text-[8px] bgred5  font-bold`}
        >
          <FaUserCircle />
          {t("HeaderTopMenu.login")}
        </Link>
      </li>
      {/* *************************************************************************************************** */}
      <li className="">
        <Link
          href={``}
          className={`border-r-2  rtl:border-r-0 rtl:border-l-2  border-r-custome-blue rtl:border-l-custome-blue  flex justify-center items-center text-custome-blue px-3 axss:px-1 text-[10px] axss:text-[8px] bgred5  font-bold`}
        >
          <FaHeart />
          {t("HeaderTopMenu.Favorites")}
        </Link>
      </li>
      {/* *************************************************************************************************** */}
      <li className="">
        <Link
          href={``}
          className={`border-r-2  rtl:border-r-0 rtl:border-l-2  border-r-custome-blue rtl:border-l-custome-blue  flex justify-center items-center text-custome-blue px-3 axss:px-1 text-[10px] axss:text-[8px] bgred5  font-bold`}
        >
          <FaPlus />
          {t("HeaderTopMenu.Submit_Property")}
        </Link>
      </li>
      {/* *************************************************************************************************** */}
      <li className="">
        <Link
          href={``}
          className={`border-r-2  rtl:border-r-0 rtl:border-l-2  border-r-custome-blue rtl:border-l-custome-blue  flex justify-center items-center text-custome-blue px-3 axss:px-1 text-[10px] axss:text-[8px] bgred5  font-bold`}
        >
          <FaDollarSign />
          {t("HeaderTopMenu.packages")}
        </Link>
      </li>
      {/* *************************************************************************************************** */}
      <li className="border-r-2  rtl:border-r-0 rtl:border-l-2  border-r-custome-blue rtl:border-l-custome-blue  flex justify-center items-center text-custome-blue px-3 axss:px-1 text-[10px] axss:text-[8px] bgred5  font-bold">
        {/* <Link href={``} className={``}> */}
        {/* <ButtonTranslate /> */}
        <LanguageChanger />
        {/* </Link> */}
      </li>
    </ul>
  );
}

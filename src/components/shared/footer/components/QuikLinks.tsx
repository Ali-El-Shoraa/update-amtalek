import initTranslations from "@/app/i18n";
import { getUserDataAction } from "@/lib/actions/user.data.actions";
import Link from "next/link";

export default async function QuikLinks({ locale }: any) {
  // const { t } = useTranslation("LayoutComponents");
  const { t } = await initTranslations(locale, ["LayoutComponents"]);
  // const cookieStore = cookies();

  // const userDatacookies = cookieStore.get("userData");

  // const userDataValue: any = userDatacookies ? userDatacookies.value : null;

  // const user: any = useSelector(userData); //userDataValue ? JSON.parse(userDataValue) : null;
  const user = await getUserDataAction(); //userDataValue ? JSON.parse(userDataValue) : null;

  return (
    // asm:items-center
    <div className="footer-col2 w-full h-full flex flex-col justify-start px-3  ">
      {/* <h2 className="text-xl  mb-9 ss:mb-3">{"Footer.second_column.title"}</h2> */}
      <h2 className="text-xl  mb-9 ss:mb-3">
        {t("Footer.second_column.title")}
      </h2>
      {/* asm:justify-center  */}
      <div className="w-full flex items-start gap-10">
        <ul className="  h-full flex flex-col items-start  justify-start gap-4 ">
          <li>
            <Link
              className="relative group cursor-pointer truncate opacity-80 hover:opacity-100 trns   h-7 flex flex-col justify-start"
              href={t("Footer.second_column.menu_items.Home.link")}
            >
              {t("Footer.second_column.menu_items.Home.title")}
              {/* {"الرئيسية"} */}
              <hr className=" border-[0px] border-bg w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
            </Link>
          </li>
          <li>
            <Link
              className="relative group cursor-pointer truncate opacity-80 hover:opacity-100 trns   h-7 flex flex-col justify-start"
              href={t("Footer.second_column.menu_items.News.link")}
            >
              {t("Footer.second_column.menu_items.News.title")}
              {/* {"الأخبار"} */}
              <hr className=" border-[0px] border-bg w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
            </Link>
          </li>
          <li>
            <Link
              className="relative group cursor-pointer truncate opacity-80 hover:opacity-100 trns   h-7 flex flex-col justify-start"
              href={t("Footer.second_column.menu_items.FAQs.link")}
            >
              {t("Footer.second_column.menu_items.FAQs.title")}
              {/* {"الأسئلة الشائعة"} */}

              <hr className=" border-[0px] border-bg w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
            </Link>
          </li>
          <li>
            <Link
              className="relative group cursor-pointer truncate opacity-80 hover:opacity-100 trns   h-7 flex flex-col justify-start"
              href={t("Footer.second_column.menu_items.Contact.link")}
            >
              {t("Footer.second_column.menu_items.Contact.title")}
              {/* {"اتصل بنا"} */}

              <hr className=" border-[0px] border-bg w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
            </Link>
          </li>
          <li>
            <Link
              className="mobile__nav--item"
              href={t("Footer.second_column.menu_items.Cities.link")}
            >
              {t("Footer.second_column.menu_items.Cities.title")}
              {/* {"المدن"} */}
            </Link>
          </li>

          <li>
            <Link
              className="mobile__nav--item"
              href={t("Footer.second_column.menu_items.Careers.link")}
            >
              {t("Footer.second_column.menu_items.Careers.title")}
              {/* {"المدن"} */}
            </Link>
          </li>

          <li>
            <Link
              className="mobile__nav--item"
              href={t("Footer.second_column.menu_items.Projects.link")}
            >
              {t("Footer.second_column.menu_items.Projects.title")}
              {/* {"المدن"} */}
            </Link>
          </li>
        </ul>

        {/* ************************************************************************************************************************************************ */}

        <ul className="  h-full flex flex-col items-start  justify-start gap-4 ">
          {!user?.token && (
            <li className="w-full flex  items-center">
              <Link
                className="relative group cursor-pointer truncate opacity-80 hover:opacity-100 trns   h-7 flex flex-col justify-start"
                href={t("Footer.second_column.menu_items.login.link")}
              >
                {t("Footer.second_column.menu_items.login.title")}
                {/* {"تسجيل الدخول"} */}
                <hr className=" border-[0px] border-bg w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
              </Link>
            </li>
          )}
          <li className="w-full flex items-center">
            <Link
              className="relative group cursor-pointer truncate opacity-80 hover:opacity-100 trns   h-7 flex flex-col justify-start"
              href={t("Footer.second_column.menu_items.About.link")}
            >
              {t("Footer.second_column.menu_items.About.title")}
              {/* {"إضافة عقار"} */}

              <hr className=" border-[0px] border-bg w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
            </Link>
          </li>

          {user?.token && (
            <li className="w-full flex items-center">
              <Link
                href={`/submit-property`}
                // onClick={() => dispatchRedux(setShowLoginPopUp(true))}
                className="relative group cursor-pointer truncate opacity-80 hover:opacity-100 trns   h-7 flex flex-col justify-start"
              >
                {t("Footer.second_column.menu_items.Submit_Property.title")}
                {/* {"معلومات عنا"} */}

                <hr className=" border-[0px] border-bg w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
              </Link>
            </li>
          )}
          <li className="w-full flex items-center">
            <Link
              className="relative group cursor-pointer truncate opacity-80 hover:opacity-100 trns   h-7 flex flex-col justify-start"
              href={t("Footer.second_column.menu_items.Terms_Conditions.link")}
            >
              {t("Footer.second_column.menu_items.Terms_Conditions.title")}
              {/* {"الأحكام والشروط"} */}

              <hr className=" border-[0px] border-bg w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
            </Link>
          </li>
          <li className="w-full flex items-center">
            <Link
              className="relative group cursor-pointer truncate opacity-80 hover:opacity-100 trns   h-7 flex flex-col justify-start"
              href={t("Footer.second_column.menu_items.Privacy.link")}
            >
              {t("Footer.second_column.menu_items.Privacy.title")}
              {/* {"الخصوصية"} */}

              <hr className=" border-[0px] border-bg w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
            </Link>
          </li>

          <li className="w-full flex items-center">
            <Link
              target="_blank"
              className="relative group cursor-pointer truncate opacity-80 hover:opacity-100 trns   h-7 flex flex-col justify-start"
              href={`/careers/employers`}
              // to={t("Footer.second_column.menu_items.Amtalek_Presentation.link")}
            >
              {locale === "ar" ? "شركات توظيف" : "Employers"}
              {/* {"عرض تقديمي"} */}

              <hr className=" border-[0px] border-bg w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
            </Link>
          </li>

          <li className="w-full flex items-center">
            <Link
              target="_blank"
              className="relative group cursor-pointer truncate opacity-80 hover:opacity-100 trns   h-7 flex flex-col justify-start"
              href={`/pdf/presentation/${
                locale === "ar"
                  ? // "amtalek-presentation-ar.pdf"
                    "amtalek-presentation-ar.pdf"
                  : "amtalek-presentation-en.pdf"
              }`}
              // to={t("Footer.second_column.menu_items.Amtalek_Presentation.link")}
            >
              {locale === "ar" ? "عرض تقديمي" : "Amtalek Presentation"}
              {/* {"عرض تقديمي"} */}

              <hr className=" border-[0px] border-bg w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
            </Link>
          </li>

          <li className="w-full flex items-center">
            <Link
              // target="_blank"
              className="relative group cursor-pointer truncate opacity-80 hover:opacity-100 trns   h-7 flex flex-col justify-start"
              href={`/sitemap`}
              // to={t("Footer.second_column.menu_items.Amtalek_Presentation.link")}
            >
              {locale === "ar" ? "خريطة الموقع" : "Sitemap"}
              {/* {"عرض تقديمي"} */}

              <hr className=" border-[0px] border-bg w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border-[1px]" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

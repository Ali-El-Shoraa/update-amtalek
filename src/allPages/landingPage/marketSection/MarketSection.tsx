import Image from "next/image";
import Link from "next/link";
import arrow from "../../../app/images/arrow.svg";
import { TbSocial } from "react-icons/tb";
import initTranslations from "@/app/i18n";

export default async function MarketSection({ data }: any) {
  const { t } = await initTranslations("Pages_LandingPage");
  return (
    <section>
      <div className="site_container my-20 flex site_container h-[60vh] amd:flex-col amd:items-center amd:h-auto min-h-[550px] round overflow- shadow-2xl shadow-cusbg-custome-blue/40">
        <div className="bg-red-600 text-custome-white w-1/2 h-full min-h-full relative amd:h-fit amd:min-h-fit amd:w-full amd:bg-no-repeat amd:bg-cover px-16 xl:px-9 py-20 flex flex-col justify-center amd:items-center">
          {/* <Image src="" */}
          <div>
            {" "}
            <h3 className="font-bold uppercase border-l-[3px] border-l-bg rtl:border-l-[0px] rtl:border-r-[3px] rtl:border-r-bg  pl-3 rtl:pl-0 rtl:pr-3 text-lg  w-full ">
              | {data?.title}
            </h3>
            <p className="text-4xl xl:text-4xl font-medium mt-6 leading-[55px] text-custome-white bg-clip-text bg-gradient-to-r from-white to-delete clg:text-2xl">
              {data?.sub_title}
            </p>
            <Image
              src={arrow}
              alt="arrow"
              width={1000}
              height={1000}
              className="w-72 h-60 mx-auto"
            />
            {/* <Link href={``}>التواصل الأجتماعي</Link> */}
            <Link
              className={`package__CTA market__CTA rounded-full w-full px-4 py-2 min-h-[48px] !border-2 !border-custome-white hover:!border-custome-white !border-solid font-medium text-lg group/CTA  active:scale-90 trns bg-custome-blue flex items-center justify-center text-custome-blue before:bg-custome-yellow  `}
              href="/coming-soon"
            >
              <span
                className={`group-hover/CTA:text-custome-white flex gap-2 items-center justify-center`}
              >
                <TbSocial />
                {t("MarketSection.Market_btn_text")}
                {/* التواصل الأجتماعي */}
              </span>
            </Link>
          </div>
        </div>
        {/* *************************************************************************** */}

        <div className="overflow-hidden flex-1">
          <Image
            src={data?.image}
            alt={data?.title}
            width={1000}
            height={1000}
            className="h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

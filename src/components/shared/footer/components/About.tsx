import Image from "next/image";
import Link from "next/link";
import appstore from "@/assets/images/appstore.png";
import googleplay from "@/assets/images/googleplay.png";
import CountrySelect from "./CountrySelect";
import arLogo from "@/assets/images/logo-ar.png";
import enLogo from "@/assets/images/logo-en.png";
import Subscribe from "./Subscripe";

export default function About({ data, locale, t }: any) {
  // start get data for countries
  // const countriesData = await getData("web/countries", locale);
  // start get data for countries

  // const allCountries = countriesData.data;
  return (
    <>
      <div className="">
        <div className="h-auto mb-6 flex flex-col gap-4 asm:items-cente px-3 ">
          <Link href="" className="h-[50px w-40 ">
            <Image
              className="h-full w-full"
              src={locale === "ar" ? arLogo : enLogo}
              alt="Amtalek"
            />
          </Link>
          {/* text-center */}
          <p className="text-[16px] text-justify font-sub-headin w-fit opacity-80 ">
            {data?.about?.about}
            {data?.about?.about.length > 230 && "..."}
          </p>
          {/* ************************************************************************** */}
          {/* items-center  */}
          <div className="flex gap-1 items-center whitespace-nowrap">
            <span className="text-sm">{t("SelectCountry")}</span>
            <CountrySelect locale={locale} />
          </div>
          {/* ************************************************************************** */}
          {/*  justify-center */}
          <div className="platforms flex items-center gap-4">
            <Link
              rel="noreferrer"
              target="_blank"
              href={data?.about?.android_app}
            >
              <Image
                className="h-12 w-fit object-contain"
                src={googleplay}
                alt="googleplay"
                width={1000}
                height={1000}
              />
            </Link>
            <Link rel="noreferrer" target="_blank" href={data?.about?.ios_app}>
              <Image
                className="h-12 w-fit object-contain"
                src={appstore}
                alt="appstore"
                width={1000}
                height={1000}
              />
            </Link>
          </div>
        </div>
        <Subscribe t={t} data={data} />
      </div>
    </>
  );
}

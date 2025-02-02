import HeaderTopMenu from "./HeaderTopMenu";

export default function TopHeader({ t, locale }: any) {
  return (
    <>
      <header className="bg-grey">
        <div className="site_container  h-12  flex justify-between gap- items-center clg:justify-center  ">
          <p className="font-medium clg:hidden clg:text-[14px]">
            {t("Layout_header.txt")}
          </p>

          <HeaderTopMenu locale={locale} />
        </div>
      </header>
    </>
  );
}

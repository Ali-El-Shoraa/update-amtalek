import NavbarHeader from "./components/NavbarHeader";

export default function Header({ t, locale }: any) {
  return (
    <>
      <header className="bg-white text-[#005879] sticky top-0 z-50 shadow-md">
        <div className="site_container h-[88px] bg- flex justify-between items-center bg-bg relative z-50 ">
          {/* ********************************************************* */}
          {/* ********************************************************* */}
          <NavbarHeader locale={locale} />
        </div>
      </header>
    </>
  );
}

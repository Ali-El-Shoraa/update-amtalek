import Header from "./components/Header";
import About from "./components/About";
import QuikLinks from "./components/QuikLinks";
import ModernNews from "./components/ModernNews";
import Subscribe from "./components/Subscripe";
import Copyright from "./components/Copyright";
import PopularPlacesFooter from "./components/PopularPlacesFooter";
import getData from "@/lib/api/getData";
import { footerData } from "@/lib/api/api.home.page";
// import useUserProfile from "@/api/useUserProfile";

export default async function Footer({ locale, t }: any) {
  const footerDataFromApi = await footerData();

  const allFooterData = footerDataFromApi?.data;

  const citiesMost = await getData("web/v2/web-home-cities-most-pops", locale);
  const allcitiesMost = citiesMost?.data;

  return (
    <footer className="bg-custome-blue relative text-custome-white pt-32 pb-10 rounded-t-3xl mt-20">
      {/* ********************************************************************************** */}
      <Header data={allFooterData} />
      {/* ********************************************************************************** */}
      <div className="site_container h-full grid grid-cols-4 xl:grid-cols-3 clg:grid-cols-2 asm:grid-cols-1 gap-4 asm:items-cente px-3">
        {/* <div className="footer-col1-log  h-full flex flex-col gap-4 asm:items-cente px-3"> */}
        {/* ********************************************************************************** */}
        <About data={allFooterData} locale={locale} t={t} />
        {/* ********************************************************************************** */}
        {/* t={t} */}
        <QuikLinks locale={locale} />
        {/* ********************************************************************************** */}
        <ModernNews data={allFooterData} locale={locale} t={t} />
        {/* ********************************************************************************** */}
        {/*  */}

        {/* t={t}  */}
        <PopularPlacesFooter data={allcitiesMost} />
        {/* <Subscribe t={t} data={allFooterData} /> */}
      </div>
      {/* </div> */}
      <hr className="border border-custome-white my-10" />
      <Copyright t={t} data={allFooterData} />
    </footer>
  );
}

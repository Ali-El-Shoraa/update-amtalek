import HeaderSection from "@/components/HeaderSection";
import Slider from "./components/Slider";
export default function FeaturedProperties({ data, locale, countrie }: any) {
  return (
    <section className="pt-10">
      <div className="site_container relative">
        {/* <div className=""> */}
        <HeaderSection
          title={data?.title}
          subTitle={data?.sub_title}
          locale={locale}
          countrie={countrie}
        />
        <Slider data={data} locale={locale} countrie={countrie} />{" "}
      </div>
    </section>
  );
}
